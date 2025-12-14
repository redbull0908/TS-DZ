"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RequestBuilder {
    constructor() {
        this.config = {
            headers: {},
        };
    }
    // Устанавливаем метод запроса
    setMethod(method) {
        this.config.method = method;
        return this; // chainable
    }
    // Добавляем тело запроса
    setBody(body) {
        this.config.body = body;
        return this; // chainable
    }
    // Добавляем заголовок
    addHeader(key, value) {
        this.config.headers = {
            ...this.config.headers,
            [key]: value,
        };
        return this; // chainable
    }
    // Устанавливаем URL
    setUrl(url) {
        this.config.url = url;
        return this; // chainable
    }
    // Выполняем запрос
    async exec() {
        if (!this.config.url) {
            throw new Error("URL не задан");
        }
        const response = await fetch(this.config.url, {
            method: this.config.method,
            headers: this.config.headers,
            body: this.config.body && this.config.method !== "GET"
                ? JSON.stringify(this.config.body)
                : undefined,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        }
        else {
            return response.text();
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
    }
    catch (err) {
        console.error(err);
    }
})();
