export abstract class Database<T> {
    abstract create(value: T): Promise<T>;

    abstract get(id: number): Promise<T>;

    abstract update(value: T): Promise<T>;

    abstract delete(id: number): Promise<boolean>;

    abstract list(): Promise<T[]>;
}