//Task 1:

function customFilterUnique(array, callback) {
    const uniqueValues = [];
    const uniqueKeys = new Set();

    array.forEach(item => {
        const key = callback(item);
        const normalizedKey = (typeof key === 'string') ? key.toLowerCase() : key;

        if (!uniqueKeys.has(normalizedKey)) {
            uniqueKeys.add(normalizedKey);
            uniqueValues.push(item);
        }
    });

    return uniqueValues;
}

//Test Cases:

const data1 = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'john' },
    { id: 4, name: 'Doe' },
    { id: 5, name: 'dOe' },
    { id: 6, name: 'DoE' },
    { id: 7, name: 'jANe' }
];


console.log(customFilterUnique(data1, item => item.name));
/*
Output:
[
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 4, name: 'Doe' }  
]
*/

console.log(customFilterUnique(data1, item => item.id));
/*
Output:
[
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'john' },
  { id: 4, name: 'Doe' },
  { id: 5, name: 'dOe' },
  { id: 6, name: 'DoE' },
  { id: 7, name: 'jANe' }
]
*/


//Task 2:

function chunkArray(array, chunkSize) {
    const chunkedArray = [];
    let index = 0;

    while (index < array.length) {
        chunkedArray.push(array.slice(index, index + chunkSize));
        index += chunkSize;
    }

    return chunkedArray;
}

//Test Cases:
const data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

console.log(chunkArray(data2, 2)); //Output: [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ], [ 11, 12 ] ]
console.log(chunkArray(data2, 3)); //Output: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ], [ 10, 11, 12 ] ]
console.log(chunkArray(data2, 4)); //Output: [ [ 1, 2, 3, 4 ], [ 5, 6, 7, 8 ], [ 9, 10, 11, 12 ] ]
console.log(chunkArray(data2, 6)); //Output: [ [ 1, 2, 3, 4, 5, 6 ], [ 7, 8, 9, 10, 11, 12 ] ]


//Task 3:

function customShuffle(array) {
    const shuffledArray = [...array]; //Creating a copy of the original array, to avoid modifying the original array directly.

    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }

    return shuffledArray;
}

//Test Cases:
const data3 = [1, 2, 3, 4, 5];

console.log(customShuffle(data3)); //Output: data3 array shuffled
console.log(customShuffle(data3)); //Output: data3 array shuffled
console.log(customShuffle(data3)); //Output: data3 array shuffled


//Task 4:

function getArrayIntersection(arr1, arr2) {
    const intersection = [];

    for (const element of arr1) {
        if (arr2.includes(element)) {
            intersection.push(element);
        }
    }

    return intersection;
}

function getArrayUnion(arr1, arr2) {
    const unionSet = new Set([...arr1, ...arr2]);
    const unionArray = Array.from(unionSet);
    return unionArray;
}


//Test Cases:
const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];
const array3 = [1, 2, 3];
const array4 = [3, 4, 5];


console.log(getArrayIntersection(array1, array2)); // Output: [3, 4, 5]
console.log(getArrayUnion(array3, array4)); // Output: [1, 2, 3, 4, 5]


//Task 5:

function measureArrayPerformance(func, array) {
    const startTime = process.hrtime();

    func(array);

    const endTime = process.hrtime(startTime);

    const executionTimeInMs = endTime[0] * 1000 + endTime[1] / 1000000;

    return executionTimeInMs;
}

//Test Cases:

const array = Array.from({ length: 1000000 }, (_, index) => index);

const mapTime = measureArrayPerformance(arr => arr.map(item => item * 2), array);
const filterTime = measureArrayPerformance(arr => arr.filter(item => item % 2 === 0), array);
const reduceTime = measureArrayPerformance(arr => arr.reduce((acc, curr) => acc + curr, 0), array);

console.log('Map time:', mapTime, 'ms');
console.log('Filter time:', filterTime, 'ms');
console.log('Reduce time:', reduceTime, 'ms');


const customChunkTime = measureArrayPerformance(() => chunkArray(array, 10));
const customShuffleTime = measureArrayPerformance(customShuffle, array);


console.log('Custom chunk time:', customChunkTime, 'ms');
console.log('Custom shuffle time:', customShuffleTime, 'ms');