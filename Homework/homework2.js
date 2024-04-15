const homework2 = {}; //library declaration.


homework2.addValues = function (arg1, arg2) {
    try {
        if (typeof arg1 === 'number' && typeof arg2 === 'number') { //Check if both values are numbers.
            return arg1 + arg2;
        }

        if (typeof arg1 === 'string' && typeof arg2 === 'string') {//Check if any value is a string.
            return arg1 + arg2;
        }

        throw new Error("Addition not possible for the given types.");
    } catch (error) {
        console.log(error.message);
    }

};

homework2.stringifyValue = function (arg) {
    try {
        if (arg === undefined || arg === null) {
            return String(arg);
        }

        if (Array.isArray(arg) || typeof arg === 'object') {
            return JSON.stringify(arg);
        }

        if (Number.isNaN(arg)) {
            return 'NaN';
        }

        if (!Number.isFinite(arg)) {
            return arg.toString();
        }

        return String(arg);
    } catch (error) {
        console.error(error.message);
    }
};

homework2.invertBoolean = function (arg) {
    try {
        if (typeof arg === 'boolean') {
            return !arg;
        }
        throw new Error("Argument is not a boolean.");
    } catch (error) {
        console.log(error.message);
    }
};

homework2.convertToNumber = function (arg) {
    try {
        if (typeof arg === 'string') {
            const parsedFloat = parseFloat(arg);
            const parsedInt = parseInt(arg);

            if (!isNaN(parsedFloat) || !isNaN(parsedInt)) {
                return !isNaN(parsedFloat) ? parsedFloat : parsedInt;
            } else {
                throw new Error('Conversion to number not possible for the given type.');
            }
        } else if (typeof arg === 'number') {
            return arg;
        } else {
            throw new Error('Conversion to number not possible for the given type.');
        }
    } catch (error) {
        console.error(error.message);
    }
};

homework2.coerceToType = function (value, type) {
    try {
        switch (type) {
            case 'number':
                return homework2.convertToNumber(value);
            case 'string':
                return homework2.stringifyValue(value);
            case 'boolean':
                if (typeof value === 'string') {
                    if (value.toLowerCase() === 'true') {
                        return true;
                    } else if (value.toLowerCase() === 'false') {
                        return false;
                    }
                }
                return Boolean(value);
            default:
                throw new Error(`Coercion to type '${type}' is not supported.`);
        }
    } catch (error) {
        throw error;
    }
};


console.log(homework2.addValues(5, 3)); //Output: 8.
console.log(homework2.addValues('5dsds', '3')); //Output: 5dsds3.
console.log(homework2.addValues('5', 3)); //Output: Addition not possible for the given types.
console.log(homework2.addValues(true, 3)); //Output: Addition not possible for the given types.

console.log(homework2.stringifyValue(5)); // Output: "5".
console.log(homework2.stringifyValue('hello')); // Output: "hello".
console.log(homework2.stringifyValue({ name: 'John', age: 30 })); // Output: "{"name":"John","age":30}".
console.log(homework2.stringifyValue([1, 2, 3])); // Output: "[1,2,3]".
console.log(homework2.stringifyValue()); // Output: "undefined".*/

console.log(homework2.invertBoolean('true')); //Output: Argument is not a boolean.
console.log(homework2.invertBoolean(true)); //Output: false.
console.log(homework2.invertBoolean(false)); //Output: true.

console.log(homework2.convertToNumber('42')); //Output:42.
console.log(homework2.convertToNumber('3.14')); //Output:3.14.
console.log(homework2.convertToNumber(42)); //Output:42.
console.log(homework2.convertToNumber('test')); //Output:Conversion to number not possible for the given type.

console.log(homework2.coerceToType('42', 'number')); //Output: 42.
console.log(homework2.coerceToType(42, 'string')); //Output: "42".
console.log(homework2.coerceToType('true', 'boolean')); //Output: true.
console.log(homework2.coerceToType('hello', 'number')); //Output: Conversion to number not possible for the given type.

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') { //Exporting library.
    module.exports = homework2;
}
