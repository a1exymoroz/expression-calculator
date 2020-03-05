function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    let currentStrExpr = expr;
    const regExpBrackets = /\(|\)/g;
    const regExpExprInBrackets = /(\()([\d. +-/*/e]+)(\))/;
    const regExpOperators = [
        /(-)?([\d.]+(e-\d+)?)([ /*/]{1,3})(-)?([\d.]+(e-\d+)?)/,
        /(-)?([\d.]+(e-\d+)?)([[ +-]{1,3})(-)?([\d.]+(e-\d+)?)/
    ];
    const operators = [ '*', '/', '+', '-'];

    
    while (regExpExprInBrackets.test(currentStrExpr)) {
        const coincidence = regExpExprInBrackets.exec(currentStrExpr);
        let strExprInBrackets = coincidence[0].replace(regExpBrackets, '');
        strExprInBrackets = strExprInBrackets.trim();
        const bracketsSum = expressionCalculator(strExprInBrackets);
        currentStrExpr = currentStrExpr.replace(regExpExprInBrackets, bracketsSum);
    }

    if (regExpBrackets.test(currentStrExpr)) {
        throw 'ExpressionError: Brackets must be paired';
    }
    
    regExpOperators.forEach(regExp => {
        while (regExp.test(currentStrExpr)) {
            let [coincidence, firstMinus, first, firstPower, symbol, secondMinus, second, secondPower] = regExp.exec(currentStrExpr);
            if (firstMinus) {
                first = firstMinus + first;
            }
            if (secondMinus) {
                second = secondMinus + second;
            }
            const sum = actionExpr(symbol, first, second);
            currentStrExpr = currentStrExpr.replace(regExp, sum);
        }
    })

    return Number(currentStrExpr);

    function actionExpr(symbol, first, second) {
        first = Number(first);
        second = Number(second);
        symbol = symbol.trim();
        switch (symbol) {
            case operators[0]:
                return first * second;
            case operators[1]:
                const number = first / second;
                if (Math.abs(number) === Infinity) {
                    throw 'TypeError: Division by zero.'
                }
                return number;
            case operators[2]:
                return first + second;
            case operators[3]:
                return first - second;
        }
    }
}

module.exports = {
    expressionCalculator
}