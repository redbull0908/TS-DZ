function pickObjectKeys<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  
  return result;
}

const user = {
  name: "Vasiliy",
  age: 8,
  skills: ['typescript', 'javascript']
};

const res = pickObjectKeys(user, ['age', 'skills']);
console.log(res);

