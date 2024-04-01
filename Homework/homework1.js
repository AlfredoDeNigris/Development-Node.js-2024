function stringPlus(str1, str2) {
    try {
        let num1 = validate(str1);
        let num2 = validate(str2);

        let result = num1 + num2;

        return console.log(result.toString()); //Convert result back to string.
    } catch (error) {
        console.log(error.message);
    }
}

function stringMinus(str1, str2) {
    try {
        let num1 = validate(str1);
        let num2 = validate(str2);

        if (num2 >= num1) {
            return console.log("Cannot perform subtraction. The first number must be greater than the second one.");
        }

        let result = num1 - num2;

        return console.log(result.toString()); //Convert result back to string.
    } catch (error) {
        console.log(error.message);
    }
}

function stringDivide(str1, str2) {
    try {
        let num1 = validate(str1);
        let num2 = validate(str2);

        if (num2 == 0) {
            return console.log("Cannot perform division. The second number cannot be zero (0).");
        }

        let result = 0;
        while (num1 >= num2) {
            num1 -= num2;
            result++;
        }

        return console.log(result.toString()); //Convert result back to string.
    } catch (error) {
        console.log(error.message);
    }
}

function stringMultiply(str1, str2) {
    try {
        let num1 = validate(str1);
        let num2 = validate(str2);

        let result = num1 * num2;

        return console.log(result.toString()); //Convert result back to string.
    } catch (error) {
        console.log(error.message);
    }
}

function validate(str) {
    if (/^\d+$/.test(str)) { //Checking if input contains only numeric characters.
        return parseInt(str); //Input contains only numeric characters.
    } else {
        throw new Error("Cannot perform arithmetic operation. At least one of the inputted characters is not a number.");
    }
}

// Test cases
stringPlus("100", "55"); //Output: 155
stringPlus("7", "7"); //Output: 14
stringPlus("0", "0"); //Output: 0
stringPlus("900h", "98"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringMinus("130", "125"); //Output: 5
stringMinus("123", "123"); //Output: "Cannot perform subtraction. The first number must be greater than the second one."
stringMinus("0", "123");  //Output: "Cannot perform subtraction. The first number must be greater than the second one."
stringMinus("ddd", "2"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringDivide("100", "10"); //Output: 10
stringDivide("100", "0"); //Output: "Cannot perform division. The second number cannot be zero (0)."
stringDivide("100", "3"); //Output: 33
stringDivide("4k5", "3"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringMultiply("10", "9"); //Output: 90
stringMultiply("8", "0"); //Output: 0
stringMultiply("0", "34"); //Output: 0
stringMultiply("p222", "5"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."