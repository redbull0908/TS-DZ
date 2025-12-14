// Тип объекта
interface Item {
  id: number;
  date: string;
  title: string;
}

// Интерфейс итератора
interface Iterator<T> {
  hasNext(): boolean;
  next(): T | null;
}

// Коллекция с двумя видами итерации
class ItemCollection {
  private items: Item[] = [];

  constructor(items: Item[]) {
    this.items = items;
  }

  // Итератор по id (по возрастанию)
getIdIterator(): Iterator<Item> {
  const sorted = [...this.items].sort((a, b) => a.id - b.id);
  let index = 0;

  return {
    hasNext(): boolean {
      return index < sorted.length;
    },
    next(): Item | null {
      if (!this.hasNext()) return null;
      const item = sorted[index++];
      return item !== undefined ? item : null;
    },
  };
}

getDateIterator(): Iterator<Item> {
  const sorted = [...this.items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  let index = 0;

  return {
    hasNext(): boolean {
      return index < sorted.length;
    },
    next(): Item | null {
      if (!this.hasNext()) return null;
      const item = sorted[index++];
      return item !== undefined ? item : null;
    },
  };
}

}

// Пример использования
const items: Item[] = [
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
