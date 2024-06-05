function myJSONParse(jsonString, reviver) {
  const tokens = tokenize(jsonString);  //Tokenization

  let result = parseTokens(tokens);  //Parsing

  if (typeof reviver === 'function') {
    result = applyReviver({ '': result }, '', reviver);
  }

  return result;
}

function tokenize(jsonString) {
  const tokenPatterns = [
    { type: 'whitespace', pattern: /\s+/y },
    { type: 'number', pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y },
    { type: 'string', pattern: /"(?:\\["\\/bfnrt]|\\u[0-9a-fA-F]{4}|[^"\\])*"/y },
    { type: 'boolean', pattern: /true|false/y },
    { type: 'null', pattern: /null/y },
    { type: 'comma', pattern: /,/y },
    { type: 'colon', pattern: /:/y },
    { type: 'braceOpen', pattern: /{/y },
    { type: 'braceClose', pattern: /}/y },
    { type: 'bracketOpen', pattern: /\[/y },
    { type: 'bracketClose', pattern: /\]/y }
  ];

  const tokens = [];
  let pos = 0;

  while (pos < jsonString.length) {
    let match = null;

    for (const { type, pattern } of tokenPatterns) {
      pattern.lastIndex = pos;
      const result = pattern.exec(jsonString);
      if (result) {
        if (type !== 'whitespace') {
          tokens.push({ type, value: result[0] });
        }
        pos = pattern.lastIndex;
        match = true;
        break;
      }
    }

    if (!match) {
      throw new SyntaxError(`Unexpected token at position ${pos}: "${jsonString[pos]}"`);
    }
  }

  return tokens;
}

function parseTokens(tokens) {
  let index = 0;

  function parseValue() {
    if (index >= tokens.length) {
      throw new SyntaxError("Unexpected end of input");
    }

    const token = tokens[index];

    switch (token.type) {
      case 'number':
        index++;
        return parseFloat(token.value);
      case 'string':
        index++;
        return parseString(token.value);
      case 'boolean':
        index++;
        return token.value === 'true';
      case 'null':
        index++;
        return null;
      case 'braceOpen':
        return parseObject();
      case 'bracketOpen':
        return parseArray();
      default:
        throw new SyntaxError(`Unexpected token ${token.type} at position ${index}`);
    }
  }

  function parseObject() {
    const obj = {};
    index++; //Skip the opening brace

    while (tokens[index].type !== 'braceClose') {
      if (index >= tokens.length) {
        throw new SyntaxError("Unexpected end of input while parsing object");
      }

      const key = parseValue();

      if (typeof key !== 'string') {
        throw new SyntaxError(`Expected string key in object at position ${index}`);
      }

      if (tokens[index].type !== 'colon') {
        throw new SyntaxError(`Expected colon after key in object at position ${index}`);
      }
      index++; //Skip the colon

      const value = parseValue();
      obj[key] = value;

      if (tokens[index].type === 'comma') {
        index++; //Skip the comma
      } else if (tokens[index].type !== 'braceClose') {
        throw new SyntaxError(`Expected comma or closing brace in object at position ${index}`);
      }
    }

    index++; //Skip the closing brace
    return obj;
  }

  function parseArray() {
    const arr = [];
    index++; //Skip the opening bracket

    while (tokens[index].type !== 'bracketClose') {
      if (index >= tokens.length) {
        throw new SyntaxError("Unexpected end of input while parsing array");
      }

      const value = parseValue();
      arr.push(value);

      if (tokens[index].type === 'comma') {
        index++; //Skip the comma
      } else if (tokens[index].type !== 'bracketClose') {
        throw new SyntaxError(`Expected comma or closing bracket in array at position ${index}`);
      }
    }

    index++; //Skip the closing bracket
    return arr;
  }

  function parseString(string) {
    return string.slice(1, -1).replace(/\\u([\dA-Fa-f]{4})/g, (match, code) => {
      return String.fromCharCode(parseInt(code, 16));
    }).replace(/\\(["\\/bfnrt])/g, (match, char) => {
      switch (char) {
        case 'b': return '\b';
        case 'f': return '\f';
        case 'n': return '\n';
        case 'r': return '\r';
        case 't': return '\t';
        default: return char;
      }
    });
  }

  return parseValue();
}

function applyReviver(holder, key, reviver) {
  const value = holder[key];
  if (value && typeof value === 'object') {
    for (const k in value) {
      if (Object.prototype.hasOwnProperty.call(value, k)) {
        const v = applyReviver(value, k, reviver);
        if (v === undefined) {
          delete value[k];
        } else {
          value[k] = v;
        }
      }
    }
  }
  return reviver.call(holder, key, value);
}

//Test Cases:

const testCases = [
  '{"name":"John","age":30,"isStudent":false}',
  '[1, 2, 3, 4]',
  'true',
  'false',
  'null',
  '"Hello, world!"',
  '{"nested": {"key": "value"}, "array": [1, 2, 3]}',
  '{"unicode": "\\u0041"}',
  '{"escaped": "A\\tB\\nC\\rD\\"E\\fF\\bG"}'
];

testCases.forEach(testCase => {
  try {
    const result = myJSONParse(testCase, (key, value) => {
      return typeof value === 'string' ? value.toUpperCase() : value;
    });
    console.log(`Input: ${testCase}`);
    console.log('Parsed:', result);
  } catch (error) {
    console.error(`Error parsing ${testCase}:`, error.message);
  }
});


/*
Output:

Input: {"name":"John","age":30,"isStudent":false}
Parsed: { name: 'JOHN', age: 30, isStudent: false }     
Input: [1, 2, 3, 4]
Parsed: [ 1, 2, 3, 4 ]
Input: true
Parsed: true
Input: false
Parsed: false
Input: null
Parsed: null
Input: "Hello, world!"
Parsed: HELLO, WORLD!
Input: {"nested": {"key": "value"}, "array": [1, 2, 3]} 
Parsed: { nested: { key: 'VALUE' }, array: [ 1, 2, 3 ] }
Input: {"unicode": "\u0041"}
Parsed: { unicode: 'A' }
Input: {"escaped": "A\tB\nC\rD\"E\fF\bG"}
Parsed: { escaped: 'A\tB\nC\rD"E\fF\bG' }

*/





/*
Implement a simplified version of the `JSON.parse` function in JavaScript using regular expressions.

Create a JavaScript function called `myJSONParse` that takes a JSON-formatted string as input and returns the corresponding JavaScript object. You should use regular expressions to tokenize and parse the input string.
Implement tokenization by using regular expressions to identify JSON elements (objects, arrays, strings, numbers, booleans, null, etc.) in the input string.
Implement a parsing algorithm that processes the tokens generated in the previous step and constructs the corresponding JavaScript object.
Ensure the implementation handles common JSON syntax errors gracefully and provides informative error messages when parsing fails.
Test `myJSONParse` function with various JSON strings to ensure it can correctly parse them into JavaScript objects.

### **Part 3: Documentation and Reflection**

Provide clear comments and documentation in your code to explain how your `myJSONParse` function works and how you used regular expressions.
Write a brief reflection on your experience implementing a JSON parser with regular expressions.
Discuss any challenges you encountered and how you addressed them.


### **Bonus Challenge**

extend `myJSONParse` function to handle additional JSON features,
such as Unicode escapes, handling of special characters in strings, and custom revivers similar to the native `JSON.parse` function.
*/