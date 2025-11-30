// Работает для значений типа string | number | symbol
function swapKeysAndValues<K extends string, V extends string | number | symbol>(
  obj: Record<K, V>
): Record<string, K> {
  const entries = Object.entries(obj) as [K, V][];
  const result: Record<string, K> = {};

  for (const [key, value] of entries) {
    result[String(value)] = key;
  }

  return result;
}

/* Пример */
const obj = { a: 1, b: 2 };
console.log(obj);
const res = swapKeysAndValues(obj);
console.log(res);
