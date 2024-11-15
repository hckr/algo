class LRUCache {
    private hashMap = new Map<number, CacheNode>();
    private head: CacheNode | null = null;
    private tail: CacheNode | null = null;

    constructor(private capacity: number) {}

    get(key: number): number {
        const existingNode = this.hashMap.get(key);
        if (!existingNode) {
            return -1;
        }
        this.moveToHead(existingNode);
        return existingNode.value;
    }

    put(key: number, value: number): void {
        const existingNode = this.hashMap.get(key);
        if (existingNode) {
            existingNode.value = value;
            this.moveToHead(existingNode);
            return;
        }

        const newNode: CacheNode = {
            key,
            value,
            prev: null,
            next: this.head,
        };
        if (this.head) {
            this.head.prev = newNode;
        }
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        this.hashMap.set(key, newNode);

        if (this.hashMap.size > this.capacity) {
            this.hashMap.delete(this.tail!.key);
            if (this.tail!.prev) {
                this.tail.prev.next = null;
            }
            this.tail = this.tail!.prev;
        }
    }

    moveToHead(existingNode: CacheNode) {
        if (this.head === existingNode) {
            return;
        }
        if (this.tail === existingNode) {
            this.tail = this.tail.prev;
        }
        if (existingNode.next) {
            existingNode.next.prev = existingNode.prev;
        }
        if (existingNode.prev) {
            existingNode.prev.next = existingNode.next;
        }
        existingNode.prev = null;
        existingNode.next = this.head;
        this.head!.prev = existingNode;
        this.head = existingNode;
    }

    printQueue() {
        let curr = this.head;
        let limit = 10;
        while (curr && --limit > 0) {
            console.log({ key: curr.key, value: curr.value });
            curr = curr.next;
        }
    }

    printHashMap() {
        console.log(
            Array.from(this.hashMap.entries()).map(([k, n]) => ({
                key: n.key,
                value: n.value,
            }))
        );
    }
}

interface CacheNode {
    key: number;
    value: number;
    prev: CacheNode | null;
    next: CacheNode | null;
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
console.log(cache.get(2));
cache.put(4, 4);
console.log(cache.get(3));
console.log(cache.get(4));
console.log(cache.get(2));
cache.put(4, 44);
console.log(cache.get(2));
console.log(cache.get(4));
