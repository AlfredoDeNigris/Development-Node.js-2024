//Task 1:

function calculateDiscountedPrice(products, discountPercentage) {
    return products.map(product => {
        const discountedPrice = product.price * (1 - discountPercentage / 100);
        return {
            name: product.name,
            price: parseFloat(discountedPrice.toFixed(2)) // Rounding to 2 decimal places
        };
    });
}

function calculateTotalPrice(products) {
    return products.reduce((total, product) => total + product.price, 0);
}


//Test Cases:

const products = [
    { name: "Product A", price: 10.99 },
    { name: "Product B", price: 20.49 },
    { name: "Product C", price: 15.75 },
    { name: "Product D", price: 8.00 }
];

console.log(calculateDiscountedPrice(products, 10)); //Applying 10% discount.
/*Output:
[
    { name: 'Product A', price: 9.89 },
    { name: 'Product B', price: 18.44 },
    { name: 'Product C', price: 14.18 },
    { name: 'Product D', price: 7.2 }
]*/

console.log(products); //The array remains the same even after the function is done.

console.log(calculateTotalPrice(products)); //Output: 55.23

console.log(products); //The array remains the same even after the function is done.



//Task 2:

const getFullName = person => `${person.firstName} ${person.lastName}`;

const filterUniqueWords = text => [...new Set(text.split(/\s+/))].sort();

const getAverageGrade = students => {
    const grades = students.flatMap(student => student.grades);
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return total / grades.length;
};

//Test Cases:

// Test cases for getFullName function
const person1 = { firstName: "John", lastName: "Doe" };
console.log(getFullName(person1)); //Output: "John Doe"

const person2 = { firstName: "Jane", lastName: "Smith" };
console.log(getFullName(person2)); //Output: "Jane Smith"

// Test cases for filterUniqueWords function
const text1 = "apple banana apple orange banana";
console.log(filterUniqueWords(text1)); //Output: ["apple", "banana", "orange"]

const text2 = "hello world hello world hello world";
console.log(filterUniqueWords(text2)); //Output: ["hello", "world"]

// Test cases for getAverageGrade function
const students = [
    { name: "John", grades: [80, 90, 85] },
    { name: "Jane", grades: [70, 75, 80] },
    { name: "Alice", grades: [90, 95, 95] }
];
console.log(getAverageGrade(students)); //Output: 84.44444444444444


//Task 3:

function createCounter() {
    let count = 0;
    return function counter() {
        return ++count;
    };
}

function repeatFunction(func, times) {
    if (times >= 0) {
        return function () {
            for (let i = 0; i < times; i++) {
                func();
            }
        };
    } else {
        return function () {
            while (true) {
                func();
            }
        };
    }
}

//Test Cases:

//Creating two independent counters
const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); //Output: 1
console.log(counter1()); //Output: 2

console.log(counter2()); // Output: 1
console.log(counter2()); // Output: 2
console.log(counter2()); // Output: 3


const greet = () => console.log("Hello!");

const repeatTwice = repeatFunction(greet, 2);
repeatTwice();
/*Output:
Hello!
Hello!
*/

//Lines 129 and 130 are commented to facilitate evaluation, since they are ment to keep printing "Hello!" indefinitely until stopped manually.
/*const repeatIndefinitely = repeatFunction(greet, -1);
repeatIndefinitely();*/


//Task 4:

function calculateFactorial(n, accumulator = 1) {
    try {
        if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
            throw new Error("Factorial is defined only for non-negative integers.");
        }
        if (n === 0) {
            return accumulator;
        } else {
            return calculateFactorial(n - 1, n * accumulator);
        }
    } catch (error) {
        console.log(error.message);
    }
}


function power(base, exponent) {
    try {
        if ((typeof base !== 'number') || typeof exponent !== 'number') {
            throw new Error("Both inputs must be numeric values.");
        }
        if (exponent === 0) {
            return 1;
        } else if (exponent > 0) {
            return base * power(base, exponent - 1);
        } else {
            return 1 / power(base, -exponent);
        }
    } catch (error) {
        console.log(error.message);
    }
}

//Test Cases:

console.log(calculateFactorial(0)); //Output: 1
console.log(calculateFactorial(5)); //Output: 120
console.log(calculateFactorial(10)); //Output: 3628800
console.log(calculateFactorial(20)); //Output: 2432902008176640000

console.log(power(2, 3)); //Output: 8
console.log(power(5, 2)); //Output: 25
console.log(power(10, -2)); //Output: 0.01


//Task 5:

function lazyMap(array, mappingFunction) {
    let index = 0;
    return {
        next: function () {
            if (index < array.length) {
                return { value: mappingFunction(array[index++]), done: false };
            } else {
                return { done: true };
            }
        }
    };
}


function fibonacciGenerator() {
    let prev = 0;
    let curr = 1;
    return {
        next: function () {
            const value = curr;
            const next = prev + curr;
            prev = curr;
            curr = next;
            return { value, done: false };
        }
    };
}


//Test Cases:

const array = [1, 2, 3, 4, 5];
const mappedLazyGenerator = lazyMap(array, x => x * 2);


console.log(mappedLazyGenerator.next().value); //Output: 2
console.log(mappedLazyGenerator.next().value); //Output: 4
console.log(mappedLazyGenerator.next().value); //Output: 6


const fibonacciSequence = fibonacciGenerator();

console.log(fibonacciSequence.next().value); //Output: 1
console.log(fibonacciSequence.next().value); //Output: 1
console.log(fibonacciSequence.next().value); //Output: 2
console.log(fibonacciSequence.next().value); //Output: 3
console.log(fibonacciSequence.next().value); //Output: 5
console.log(fibonacciSequence.next().value); //Output: 8