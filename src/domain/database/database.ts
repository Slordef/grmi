export interface Database<T> {
	create(value: T): Promise<T>;

	get(id: number): Promise<T>;

	update(value: T): Promise<T>;

	delete(id: number): Promise<boolean>;

	list(): Promise<T[]>;
}