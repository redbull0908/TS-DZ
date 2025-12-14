type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  url?: string;
}

class RequestBuilder {
  private config: RequestConfig = {
    headers: {},
  };

  // Устанавливаем метод запроса
  setMethod(method: HttpMethod) {
    this.config.method = method;
    return this; // chainable
  }

  // Добавляем тело запроса
  setBody(body: any) {
    this.config.body = body;
    return this; // chainable
  }

  // Добавляем заголовок
  addHeader(key: string, value: string) {
    this.config.headers = {
      ...this.config.headers,
      [key]: value,
    };
    return this; // chainable
  }

  // Устанавливаем URL
  setUrl(url: string) {
    this.config.url = url;
    return this; // chainable
  }

  // Выполняем запрос
  async exec<T = any>(): Promise<T> {
    if (!this.config.url) {
      throw new Error("URL не задан");
    }

    const response = await fetch(this.config.url, {
      method: this.config.method,
      headers: this.config.headers,
      body:
        this.config.body && this.config.method !== "GET"
          ? JSON.stringify(this.config.body)
          : undefined,
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json() as Promise<T>;
    } else {
      return response.text() as unknown as T;
    }
  }
}


(async () => {
  const builder = new RequestBuilder();

  try {
    const data = await builder
      .setMethod("POST")
      .setUrl("https://jsonplaceholder.typicode.com/posts")
      .addHeader("Content-Type", "application/json")
      .setBody({ title: "Hello", body: "World", userId: 1 })
      .exec();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
})();
