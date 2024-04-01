function stringPlus(str1, str2) {
    try {
        const num1 = validate(str1);
        const num2 = validate(str2);

        let result = '';
        let carry = 0;
        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0 || j >= 0 || carry > 0) {
            const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
            const digit2 = j >= 0 ? parseInt(num2[j]) : 0;

            const sum = digit1 + digit2 + carry;
            result = (sum % 10) + result;
            carry = Math.floor(sum / 10);

            i--;
            j--;
        }

        return console.log(result.toString()); //Convert result back to string.
    } catch (error) {
        console.log(error.message);
    }
}

function stringMinus(str1, str2) {
    try {
        const num1 = validate(str1);
        const num2 = validate(str2);

        if (num2 >= num1) {
            return console.log("Cannot perform subtraction. The first number must be greater than the second one.");
        }
        let result = '';
        let borrow = 0;
        let i = num1.length - 1;
        let j = num2.length - 1;

        while (i >= 0 || j >= 0) {
            const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
            const digit2 = j >= 0 ? parseInt(num2[j]) : 0;

            let diff = digit1 - digit2 - borrow;
            if (diff < 0) {
                diff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }

            result = diff.toString() + result;

            i--;
            j--;
        }

        result = result.replace(/^0+/, '');

        return console.log(result.toString()); //Convert result back to string.
    }
    catch (error) {
        console.log(error.message);
    }
}

function stringDivide(str1, str2) {
    try {
        let num1 = validate(str1);
        let num2 = validate(str2);

        num1 = parseInt(num1);
        num2 = parseInt(num2);

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
        const num1 = validate(str1);
        const num2 = validate(str2);

        if (num1 == "0" || num2 == "0") {
            return console.log("0");
        }


        let result = Array(num1.length + num2.length).fill(0); //Initialize result array filled with zeros

        for (let i = num1.length - 1; i >= 0; i--) {
            for (let j = num2.length - 1; j >= 0; j--) {
                const product = num1[i] * num2[j];
                const sum = product + result[i + j + 1];
                result[i + j] += Math.floor(sum / 10);
                result[i + j + 1] = sum % 10;
            }
        }

        result = result.join('').replace(/^0+/, '');// Convert result array to string

        return console.log(result.toString());
    } catch (error) {
        console.log(error.message);
    }
}

function validate(str) {
    if (/^\d+$/.test(str)) { //Checking if input contains only numeric characters.
        return str; //Input contains only numeric characters.
    } else {
        throw new Error("Cannot perform arithmetic operation. At least one of the inputted characters is not a number.");
    }
}


// Test cases
stringPlus("99999999999999999999999", "99999999999999999999"); //Output: 100099999999999999999998
stringPlus("100099999999999999999998", "10009999999999999999997"); //Output: 110109999999999999999995
stringPlus("y", "3"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringMinus("99999999999999999999999", "99999999999999"); //Output: 99999999900000000000000
stringMinus("100099999999999999999998", "100099999999999999999998"); //Output: "Cannot perform subtraction. The first number must be greater than the second one."
stringMinus("0", "123");  //Output: "Cannot perform subtraction. The first number must be greater than the second one."
stringMinus("2", "oy"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringDivide("999999999999999999999999999", "999999999999999999999999"); //Output: 1000
stringDivide("20", "1"); //Output: 20
stringDivide("100", "0"); //Output: "Cannot perform division. The second number cannot be zero (0)."
stringDivide("3", "33"); //Output: 0
stringDivide("4k5", "3"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."

stringMultiply("99999999900000000000000", "999999999999999999999999"); //Output: 99999999899999999999999900000000100000000000000
stringMultiply("8", "0"); //Output: 0
stringMultiply("0", "34"); //Output: 0
stringMultiply("p222", "5"); //Output: "Cannot perform arithmetic operation. At least one of the inputted characters is not a number."