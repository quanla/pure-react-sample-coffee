const {MathUtil} = require("./math-util");

let translate = MathUtil.linearTranslate(1.5, 2.5, 1, 0.9);

console.log(translate(-2));
console.log(translate(0));
console.log(translate(1.5));
console.log(translate(2));
console.log(translate(2.5));
console.log(translate(3));