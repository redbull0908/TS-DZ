"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Коллекция с двумя видами итерации
class ItemCollection {
    constructor(items) {
        this.items = [];
        this.items = items;
    }
    // Итератор по id (по возрастанию)
    getIdIterator() {
        const sorted = [...this.items].sort((a, b) => a.id - b.id);
        let index = 0;
        return {
            hasNext() {
                return index < sorted.length;
            },
            next() {
                if (!this.hasNext())
                    return null;
                const item = sorted[index++];
                return item !== undefined ? item : null;
            },
        };
    }
    getDateIterator() {
        const sorted = [...this.items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        let index = 0;
        return {
            hasNext() {
                return index < sorted.length;
            },
            next() {
                if (!this.hasNext())
                    return null;
                const item = sorted[index++];
                return item !== undefined ? item : null;
            },
        };
    }
}
// Пример использования
const items = [
    { id: 3, date: "03-01-2023", title: "Третий" },
    { id: 1, date: "01-01-2023", title: "Первый" },
    { id: 2, date: "02-01-2023", title: "Второй" },
];
const collection = new ItemCollection(items);
console.log("Итерация по ID:");
const idIterator = collection.getIdIterator();
while (idIterator.hasNext()) {
    console.log(idIterator.next());
}
console.log("\nИтерация по дате:");
const dateIterator = collection.getDateIterator();
while (dateIterator.hasNext()) {
    console.log(dateIterator.next());
}
