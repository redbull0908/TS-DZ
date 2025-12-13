// sort-by.d.ts
declare module "sort-by" {
    /**
     * Возвращает функцию-компаратор для использования в Array.prototype.sort
     * @param args Имена свойств (с "-" для обратного порядка) или функции-компараторы
     */
    function sortBy<T>(...args: Array<keyof T | ((a: T, b: T) => number) | string>): (a: T, b: T) => number;

    export = sortBy;
}
