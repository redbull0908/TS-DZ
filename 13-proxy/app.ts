// api.ts — реальный сервис
class API {
  async fetchProduct(id: number): Promise<any> {
    const url = `https://dummyjson.com/products/${id}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка при запросе продукта с id ${id}`);
    }

    return response.json();
  }
}

// proxy.ts — прокси
class ProductProxy {
  private api = new API();

  async getProduct(id: number): Promise<any> {
    if (id >= 10) {
      throw new Error("Доступ к продукту с id >= 10 запрещён");
    }

    return this.api.fetchProduct(id);
  }
}

// Пример использования
(async () => {
  const proxy = new ProductProxy();

  try {
    const product = await proxy.getProduct(1); // ID < 10 — успешно
    console.log("Продукт:", product);
  } catch (err) {
    console.error(err);
  }

  try {
    const product = await proxy.getProduct(15); // ID >= 10 — ошибка
    console.log("Продукт:", product);
  } catch (err) {
    console.error(err);
  }
})();
