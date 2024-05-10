//Task 1:

function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;
    let firstError = null;

    promises.forEach((promise, index) => {
      promise.then((value) => {
        results[index] = value;
        completedCount++;

        if (completedCount === promises.length) {
          resolve(results);
        }
      }).catch((error) => {
        if (!firstError) {
          firstError = error;
          reject(firstError);
        }
      });
    });
  });
}


//Test Cases:

const promises1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

promiseAll(promises1)
  .then(results => {
    console.log("All promises resolved:", results); //Output: [1, 2, 3]
  })
  .catch(error => {
    console.error("At least one promise rejected:", error);
  });


function delay(ms) { //Function to simulate a promise that resolves after a specified time
  return new Promise(resolve => setTimeout(resolve, ms));
}

const promisesWithFailure = [
  Promise.resolve(1),
  Promise.reject("An error occurred!"),
  delay(1000).then(() => 3) //A delayed promise that resolves after 1 second
];

promiseAll(promisesWithFailure)
  .then(results => {
    console.log("All promises resolved:", results);
  })
  .catch(error => {
    console.error("At least one promise rejected:", error); //Output: "At least one promise rejected: An error occurred!p"
  });


//Task 2:

function promiseAllSettled(promises) {
  return new Promise((resolve) => {
    const settledResults = [];
    let settledCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          settledResults[index] = { status: 'fulfilled', value };
        })
        .catch((reason) => {
          settledResults[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(settledResults);
          }
        });
    });
  });
}



//Test Case:

const promises2 = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3)
];

promiseAllSettled(promises2)
  .then(results => {
    console.log("All promises settled:", results);
  });

/*
Output:
[{ status: 'fulfilled', value: 1 },
{ status: 'rejected', reason: 'Error occurred' },
{ status: 'fulfilled', value: 3 }]
*/


//Task 3:

function chainPromises(functions) {
  let promiseChain = Promise.resolve();

  for (const func of functions) {
    promiseChain = promiseChain.then(func);
  }

  return promiseChain;
}


//Test Cases:

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

function asyncFunction4(data) {
  return Promise.reject("Error occurred in asyncFunction4"); //Simulating a rejected promise.
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

chainPromises(functionsArray)
  .then(result => {
    console.log("Chained promise result:", result);
    //Output: "Chained promise result: Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch(error => {
    console.error("Chained promise error:", error);
  });

const functionsArrayWithError = [asyncFunction1, asyncFunction2, asyncFunction4];

chainPromises(functionsArrayWithError)
  .then(result => {
    console.log("Chained promise result:", result);
  })
  .catch(error => {
    console.error("Chained promise error:", error); //Output: "Chained promise error: Error occurred in asyncFunction4"
  });



//Task 4:

function promisify(callbackStyleFunction) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      callbackStyleFunction(...args, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
}


//Test Cases:

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

const promisedFunction1 = promisify(callbackStyleFunction);
const promisedFunction2 = promisify(callbackStyleFunction);

promisedFunction1(3)
  .then(result => {
    console.log("Promised function result:", result); //Output: "Promised function result: 6"
  })
  .catch(error => {
    console.error("Promised function error:", error);
  });

promisedFunction2(-1)
  .then(result => {
    console.log("Promised function result:", result);
  })
  .catch(error => {
    console.error("Promised function error:", error); //Output: "Promised function error: Invalid value"
  });
