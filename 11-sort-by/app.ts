import sortBy = require("sort-by");

interface User {
    name: string;
    age: number;
}

const users: User[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 20 },
];

users.sort(sortBy<User>("name"));       // сортировка по имени
users.sort(sortBy<User>("-age"));       // сортировка по возрасту по убыванию
users.sort(sortBy<User>("name", "age")); // сортировка по имени, затем по возрасту
