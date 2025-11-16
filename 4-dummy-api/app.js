"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Gender Enum
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
})(Gender || (Gender = {}));
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["Moderator"] = "moderator";
    Role["User"] = "user";
})(Role || (Role = {}));
async function loadUsers() {
    const res = await fetch("https://dummyjson.com/users");
    return res.json();
}
async function example() {
    const data = await loadUsers();
    console.log(data);
    const user = data.users[0];
    if (user != undefined) {
        if (user.gender === Gender.Male) {
            console.log("Мужчина:", user.firstName);
        }
        if (user.role === Role.Admin) {
            console.log("Это админ!");
        }
    }
}
console.log(example());
//# sourceMappingURL=app.js.map