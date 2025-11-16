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
    try {
        const data = await loadUsers();
        if (data != undefined) {
            if (data.users != undefined && data.users != null)
                data.users.forEach(x => {
                    if (x != undefined) {
                        console.log(x);
                    }
                    else
                        console.error();
                });
            throw new Error('Пользователей нет');
        }
        throw new Error('данные не получили');
    }
    catch {
        throw console.error();
    }
}
(async () => { await example().catch(error => console.error('произошла ошибка', error)); })();
//# sourceMappingURL=app.js.map