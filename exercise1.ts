function SearchingChallenge(str) {
    let openBracketCount = 0;
    let closeBracketCount = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (char === ")") {
            openBracketCount++;
        }
        if (char === "(") {
            closeBracketCount++;
        }
    }

    if (openBracketCount === closeBracketCount) {
        return 1;
    }

    return 0;
}

// keep this function call here 
// console.log(SearchingChallenge(readline()));

const testCases = [
    "hello()",
    "hello()())",
    "the color re(d)) ()(()",
    "hello))) ())))"
];