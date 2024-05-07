//Task 1:

const translations = {
    en: {
        greet: "Hello",
        intro: "Welcome to our website"
    },
    fr: {
        greet: "Bonjour",
        intro: "Bienvenue sur notre site web"
    },
    es: { //Added spanish as an option since is my mother tongue.
        greet: "Hola",
        intro: "Bienvenido a nuestro sitio web"
    }
};

function localize(strings, ...keys) {
    const template = strings.join('');

    const language = "fr"; //Change to "en" for English or "es" for Spanish.
    const languageTranslations = translations[language];

    const localizedString = keys.map(key => languageTranslations[key]).join('');

    return localizedString;
}

const greeting = "greet";
const introduction = "intro";

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

//Test Cases:

console.log(localizedGreeting); //Output: "Bonjour" (for language "fr"), "Hello" (for language "en") and "Hola" (for language "es").
console.log(localizedIntroduction); //Output: "Bienvenue sur notre site web" (for language "fr"), "Welcome to our website" (for language "en") and "Bienvenido a nuestro sitio web" (for language "es").


//Task 2:

function highlightKeywords(template, keywords) {
    const replacedTemplate = template.replace(/\${(\d+)}/g, (_, index) => {
        const keywordIndex = parseInt(index);
        if (keywordIndex >= 0 && keywordIndex < keywords.length) {
            return keywords[keywordIndex];
        }
        return '';
    });

    const caseInsensitiveKeywords = keywords.map(keyword => new RegExp(keyword, 'gi'));
    const highlightedTemplate = caseInsensitiveKeywords.reduce((accTemplate, keywordRegex) => {
        return accTemplate.replace(keywordRegex, match => `<span class='highlight'>${match}</span>`);
    }, replacedTemplate);

    return highlightedTemplate;
}

const keywords = ["JavaScript", "template", "tagged"];
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation.";

const highlighted = highlightKeywords(template, keywords);

//Test Case:

console.log(highlighted);
//Output: "Learn <span class='highlight'>JavaScript</span> <span class='highlight'>tagged</span> <span class='highlight'>template</span>s to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."


//Task 3:

function multiline(strings, ...values) {
    const template = strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');

    const lines = template.split('\n');

    let lineNumber = 0;
    const numberedLines = lines.map((line) => {
        const indentation = line.match(/^\s*/)[0];
        const trimmedLine = line.trim();
        const numberedLine = trimmedLine ? `${lineNumber} ${trimmedLine}` : '';
        lineNumber++;
        return numberedLine ? `${indentation}${numberedLine}` : '';
    });

    return numberedLines.join('\n').trim();
}

const code = multiline`
function add(a, b) {
    return a + b;
}
`;

//Test Case:

console.log(code);
/*
1 function add(a, b) {
    2 return a + b;
3 }
*/

//Task 4:

function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function debouncedSearch(query) {
    console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 300);

//Test Case:

const simulateInputEvents = () => {
    const queries = ["apple", "banana", "orange"];

    queries.forEach((query, index) => {
        setTimeout(() => {
            debouncedSearchHandler(query);
        }, index * 200); //Simulating user input with staggered delays
    });
};

simulateInputEvents(); //Simulating input events to test debounce function


//Task 5:

function throttle(func, interval) {
    let lastExecution = 0;
    let timeoutId;

    return function (...args) {
        const now = Date.now();
        const timeSinceLastExecution = now - lastExecution;

        if (timeSinceLastExecution >= interval) {
            func.apply(this, args);
            lastExecution = now;
        } else {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecution = Date.now();
            }, interval - timeSinceLastExecution);
        }
    };
}

function onScroll(event) {//In order to simulate scroll event.
    console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

//Test Case:

const simulateScrollEvents = () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            throttledScrollHandler({});
        }, i * 500); //Simulating scroll events with staggered delays
    }
};

simulateScrollEvents();


//Task 6:

function curry(func, arity) {
    return function curried(...args) {
        const actualArgs = args.filter(arg => arg !== curry.placeholder);
        if (actualArgs.length >= arity) {
            return func(...args.map(arg => arg === curry.placeholder ? undefined : arg));
        } else {
            return function (...nextArgs) {
                const combinedArgs = [];
                let argIndex = 0;
                for (const arg of args) {
                    combinedArgs.push(arg === curry.placeholder ? nextArgs[argIndex++] : arg);
                }
                return curried(...combinedArgs, ...nextArgs.slice(argIndex));
            };
        }
    };
}

curry.placeholder = Symbol('_');

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

//Test Case:

const step1 = curriedMultiply(2);
const step2 = step1(3);
const result = step2(4);

console.log("Final result:", result); //Output: 24