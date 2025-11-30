"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Работает для значений типа string | number | symbol
function swapKeysAndValues(obj) {
    const entries = Object.entries(obj);
    const result = {};
    for (const [key, value] of entries) {
        // в объекте ключи всегда строки — явно приводим к string
        result[String(value)] = key;
    }
    return result;
}
/* Пример */
const obj = { a: 1, b: 2 };
console.log(obj);
const res = swapKeysAndValues(obj);
console.log(res);
//# sourceMappingURL=app.js.map