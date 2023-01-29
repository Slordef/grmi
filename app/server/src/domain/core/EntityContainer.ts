import { Entity } from './Entity';

export type GetEntityT<C extends Entity> = C extends Entity<infer T> ? T : never;

export class EntityContainer {

    private entities: Entity[] = [];

    public get length(): number {
        return this.entities.length;
    }

    public get isEmpty(): boolean {
        return this.entities.length === 0;
    }

    public add(entity: Entity): void {
        this.entities.push(entity);
    }

    public remove(entity: Entity): void {
        this.entities = this.entities.filter(e => e !== entity);
    }

    public clear(): void {
        this.entities = [];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public fetch<T extends Entity>(entity: (new (...args: any[]) => T) | string): T[] {
        if (typeof entity === 'string') {
            return this.entities.filter(e => e.constructor.name == entity) as T[];
        }
        return this.entities.filter(e => e instanceof entity) as T[];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public find<T extends Entity>(entity: new (...args: any[]) => T, id: number): T | undefined {
        return this.fetch<T>(entity).find(e => e.id === id);
    }
}