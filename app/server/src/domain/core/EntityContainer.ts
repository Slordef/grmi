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

    public fetch<T extends typeof Entity<any>>(entity: T): InstanceType<T>[] {
        return this.entities.filter(e => e instanceof entity) as InstanceType<T>[];
    }

    public find<T extends typeof Entity<any>>(entity: T, id: number): InstanceType<T> | undefined {
        return this.fetch(entity).find(e => e.id === id);
    }
}