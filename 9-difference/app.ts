interface IA {
  a: number;
  b: string;
}

interface IB {
  a: number;
  c: boolean;
}

let a: IA = { a: 5, b: '' };
let b: IB = { a: 10, c: true };

interface IDifference {
  b: string;
}



let v0: IDifference = difference(a, b);

function difference<T extends object, U extends object>(objA: T, objB: U): Omit<T, keyof U> {
  const result = {} as Omit<T, keyof U>;

  (Object.keys(objA) as (keyof T)[]).forEach(key => {
    if (!(key in objB)) {
      (result as typeof objA)[key] = objA[key];
    }
  });

  return result;
}
