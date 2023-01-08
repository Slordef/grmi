// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Entity<T extends { id: number } = any> {
    public constructor(private data: T) {
    }

    get id(): number {
        return this.data.id;
    }

    get(): T {
        return this.data;
    }
}

