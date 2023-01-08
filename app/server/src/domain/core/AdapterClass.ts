import { Adapter } from './Adapter';

export abstract class AdapterClass {
    public abstract execute(...args: Parameters<Adapter[keyof Adapter]>): ReturnType<Adapter[keyof Adapter]>;
}