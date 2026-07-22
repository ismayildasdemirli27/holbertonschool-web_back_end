import guardrail from './9-try_catch.js';
import divideFunction from './8-try.js';

console.log(guardrail(() => divideFunction(10, 2)));
console.log(guardrail(() => divideFunction(10, 0)));
