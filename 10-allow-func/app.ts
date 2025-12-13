class User {
  @allowFunc((a: number) => a > 0)
  age: number = 30;
}

function allowFunc<T>(validator: (value: T) => boolean) {
  const storageKey = Symbol();
  return function (
    target: Object,
    propertyKey: string | symbol,
  ) {
    Object.defineProperty(target, propertyKey, {
      get() {
        return this[storageKey];
      },
      set(newValue: T) {
        if (validator(newValue)) {
          this[storageKey] = newValue;
        }
      },
      enumerable: true,
      configurable: true,
    });
  };
}

const person = new User();
console.log(person.age); // 30

person.age = 0;
console.log(person.age); // 30

person.age = 20;
console.log(person.age); // 20

