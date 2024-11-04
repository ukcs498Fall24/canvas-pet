export class Queue<T> {
    private data: T[] = [];
    private front: number = 0;
    private end: number = 0;

    public enqueue(item: T): void {
        this.data[this.end] = item;
        this.end++;
    }

    public dequeue(): T | undefined {
        if (this.front === this.end) {
            return undefined;
        }
        const item = this.data[this.front];
        this.front++;
        return item;
    }

    public peek(): T | undefined {
        if (this.front === this.end) {
            return undefined;
        }
        return this.data[this.front];
    }

    public size(): number {
        return this.end - this.front;
    }

    public isEmpty(): boolean {
        return this.size() === 0;
    }

    public clear(): void {
        this.data = [];
        this.front = 0;
        this.end = 0;
    }
}