"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fnv1aHash(str) {
    const prime = 0x811C9DC5;
    let hash = prime;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}
class MapTS {
    buckets = [];
    /** Добавить значение */
    add(key, value) {
        let hashTemp = fnv1aHash(key);
        let index = this.buckets.findIndex(x => x.hash == hashTemp);
        if (index == -1) {
            this.buckets.push({
                hash: hashTemp,
                key: key,
                value: value,
                next: null
            });
        }
        else if (this.buckets[index] != undefined) {
            let whTemp = this.buckets[index];
            while (true) {
                if (whTemp.next == null) {
                    whTemp.next = {
                        hash: this.buckets[index].hash,
                        key: key,
                        value: value,
                        next: null
                    };
                    break;
                }
                whTemp = whTemp.next;
            }
        }
    }
    /** Получить значение по ключу */
    get(key) {
        let res = -1;
        this.buckets.forEach(element => {
            let whTemp = element;
            while (true) {
                if (whTemp.key === key) {
                    res = whTemp.value;
                }
                whTemp = whTemp == null ? null : whTemp.next;
                if (whTemp == null) {
                    break;
                }
            }
        });
        return res;
    }
    /** Обновить значение */
    set(key, value) {
        this.buckets.forEach(element => {
            let whTemp = element;
            while (true) {
                if (whTemp.key === key) {
                    whTemp.value = value;
                }
                whTemp = whTemp == null ? null : whTemp.next;
                if (whTemp == null) {
                    break;
                }
            }
        });
    }
    /** Удалить ключ */
    delete(key) {
        this.buckets.forEach(element => {
            if (element.key == key && element.next == null) {
                this.buckets.splice(this.buckets.findIndex(x => x.key == key && x.next == null), 1);
            }
            else {
                let whTemp = element;
                let prev = element;
                while (true) {
                    if (whTemp.key === key) {
                        prev.next = whTemp.next;
                    }
                    prev = whTemp;
                    whTemp = whTemp == null ? null : whTemp.next;
                    if (whTemp == null) {
                        break;
                    }
                }
            }
        });
    }
    /** Очистить мапу */
    clear() {
        this.buckets = [];
    }
}
let primer = new MapTS();
primer.add('London', 20);
primer.add('Париж', 30);
primer.add('Минск', 40);
primer.add('Гомель', 50);
primer.add('Москва', 60);
primer.add('Берлин', 70);
primer.add('ОАЭ', 80);
console.log(primer.get('Москва'));
primer.set('Москва', 100);
console.log(primer.get('Москва'));
primer.delete('Москва');
console.log(primer.get('Москва'));
//# sourceMappingURL=app.js.map