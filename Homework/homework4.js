//Task 1:

const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john.doe@example.com"
};

Object.keys(person).forEach(prop => {
    Object.defineProperty(person, prop, {
        value: person[prop],
        writable: false,
        enumerable: true,
        configurable: false
    });
});

person.updateInfo = function (newInfo) {
    try {
        Object.keys(newInfo).forEach(prop => {
            if (this.hasOwnProperty(prop)) {
                throw new Error(`Property '${prop}' is read-only and cannot be updated.`);
            }
        });
        Object.assign(this, newInfo);
    } catch (error) {
        console.log(error.message);
    }
};

Object.defineProperty(person, 'address', {
    value: {},
    writable: true,
    enumerable: false,
    configurable: false
});

//Test Cases:

console.log("Before update:", person); //Output: "person" object.
person.updateInfo({ firstName: "Jane", age: 32 }); //Output: Property 'firstName' is read-only and cannot be updated.
console.log("After update:", person); //Output: "person" object.


//Task 2:

const product = {
    name: "Laptop",
    price: 1000,
    quantity: 5
};

Object.defineProperty(product, 'price', {
    value: product.price,
    writable: false,
    enumerable: false,
    configurable: false
});

Object.defineProperty(product, 'quantity', {
    value: product.quantity,
    writable: false,
    enumerable: false,
    configurable: true
});

function getTotalPrice(product) {
    const priceDescriptor = Object.getOwnPropertyDescriptor(product, 'price');
    const quantityDescriptor = Object.getOwnPropertyDescriptor(product, 'quantity');

    if (!priceDescriptor || !quantityDescriptor) {
        throw new Error("Price or quantity property not found.");
    }

    return priceDescriptor.value * quantityDescriptor.value;
}

function deleteNonConfigurable(obj, propName) {
    try {
        const descriptor = Object.getOwnPropertyDescriptor(obj, propName);
        if (!descriptor) {
            console.log(`Property '${propName}' does not exist.`);
            return;
        }

        if (!descriptor.configurable) {
            throw new Error(`Property '${propName}' is non-configurable and cannot be deleted.`);
        }

        delete obj[propName];
    } catch (error) {
        console.log(error.message);
    }
}

//Test Cases:
console.log("Total price:", getTotalPrice(product)); //Output: "Total price: 5000".
console.log("Product before delete: ", Object.getOwnPropertyDescriptors(product)); //Output: product object.
deleteNonConfigurable(product, 'price'); //Output: "Property 'price' is non-configurable and cannot be deleted."
deleteNonConfigurable(product, 'name');
console.log("Product after deleting 'name':", Object.getOwnPropertyDescriptors(product)); //Output: product object with out "name" property.


//Task 3:

const bankAccount = {
    _balance: 1000,

    get formattedBalance() {
        return `$${this._balance}`;
    },

    set balance(newBalance) {
        this._balance = newBalance;
    },

    transfer(targetAccount, amount) {
        try {
            if (typeof amount !== 'number' || amount <= 0) {
                throw new Error("Invalid amount for transfer.");
            }

            if (this._balance < amount) {
                throw new Error("Insufficient funds for transfer.");
            }

            this._balance -= amount;
            targetAccount.balance += amount;

        } catch (error) {
            console.log(error.message);
        }
    }
};

// Test Cases
const targetAccount = {
    _balance: 500,
    get balance() {
        return this._balance;
    },
    set balance(newBalance) {
        this._balance = newBalance;
    }
};

console.log("Initial balance:", bankAccount.formattedBalance); //Output: Initial balance: $1000
console.log("Initial balance of target account: $", targetAccount.balance); //Output: Initial balance of target account: $500

bankAccount.transfer(targetAccount, 300);

console.log("Balance after transfer:", bankAccount.formattedBalance); //Output: Balance after transfer: $700
console.log("Balance of target account after transfer: $", targetAccount.balance); //Output: Balance of target account after transfer: $800


//Task 4:

function createImmutableObject(obj) {
    const immutableObj = {};

    Object.keys(obj).forEach(prop => {
        if (typeof obj[prop] === 'object' && obj[prop] !== null) {
            immutableObj[prop] = createImmutableObject(obj[prop]);
        } else {
            Object.defineProperty(immutableObj, prop, {
                value: obj[prop],
                writable: false,
                enumerable: true,
                configurable: false
            });
        }
    });
    return immutableObj;
}

//Test Cases:

const immutablePerson = createImmutableObject(person);
console.log(Object.getOwnPropertyDescriptors(immutablePerson)); // Output: inmutablePerson object.
immutablePerson.updateInfo({ firstName: "Jane" }); //Output: Property 'firstName' is read-only and cannot be updated.
immutablePerson.updateInfo({ age: 32 }); //Output: Property 'age' is read-only and cannot be updated.


//Task 5:

function observeObject(obj, callback) {
    return new Proxy(obj, {
        get(target, prop) {
            callback(prop, 'get');
            return target[prop];
        },
        set(target, prop, value) {
            callback(prop, 'set');
            target[prop] = value;
            return true;
        }
    });
}

const proxyPerson = observeObject(person, (prop, action) => {
    console.log(`Property '${prop}' ${action === 'get' ? 'was accessed' : 'was modified'}.`);
});

//Test Cases:

console.log(proxyPerson.firstName); //Output: Property 'firstName' was accessed. (John)
console.log(proxyPerson.lastName); //Output: Property 'lastName' was accessed. (Doe)


//Task 6:

function deepCloneObject(obj, clonedObjects = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (clonedObjects.has(obj)) {
        return clonedObjects.get(obj);
    }

    const clone = Array.isArray(obj) ? [] : {};

    clonedObjects.set(obj, clone);

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clone[key] = deepCloneObject(obj[key], clonedObjects);
        }
    }
    return clone;
}

//Test Cases:

const originalObject = {
    a: 1,
    b: [2, 3, 4],
    c: { d: 5, e: { f: 6 } }
};

originalObject.circularRef = originalObject;

const clonedObject = deepCloneObject(originalObject);

console.log("Original object:", originalObject); //Output: Original object "originalObject"
console.log("Cloned object:", clonedObject); //Output: Cloned object "clonedObject"
console.log("Are they equal?", originalObject === clonedObject); //Output: Are they equal? false
console.log(originalObject.circularRef === clonedObject.circularRef); //Output: false
console.log("Circular reference - Original:", originalObject.circularRef); //Output: originalObject
console.log("Circular reference - Cloned:", clonedObject.circularRef); //Output: clonedObject


//Task 7:

function validateObject(obj, schema) {
    const requiredProps = Object.keys(schema).filter(prop => schema[prop].required);
    if (!requiredProps.every(prop => obj.hasOwnProperty(prop))) {
        return false;
    }

    for (const prop in schema) {
        if (obj.hasOwnProperty(prop)) {
            const { type, validator } = schema[prop];

            if (type && typeof obj[prop] !== type) {
                return false;
            }

            if (validator && !validator(obj[prop])) {
                return false;
            }
        }
    }
    return true;
}

//Test Cases:

const schema = {
    firstName: { type: 'string', required: true },
    age: { type: 'number', validator: value => value >= 18 }
};

const validObject = { firstName: 'John', age: 30 };
const invalidObject = { firstName: 'Jane', age: 15 };

console.log(validateObject(validObject, schema)); //Output: true
console.log(validateObject(invalidObject, schema)); //Output: false