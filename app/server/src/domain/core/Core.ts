import { Gateway } from './Gateway';
import { Adapter } from './Adapter';
import { CorePlugin } from './CorePlugin';
import { EventController } from './EventController';
import { Controllers } from './Controllers';
import { EntityContainer } from './EntityContainer';
import { AdapterClass } from './AdapterClass';

export type AdapterInstance = { [K in keyof Adapter]: (...args: Parameters<Adapter[K]>) => (ReturnType<Adapter[K]>[]) };
export type AdapterUseCases = { [K in keyof Adapter]?: (Adapter[K] | AdapterClass)[] }
export type AdapterParameters = Parameters<Adapter[keyof Adapter]>;

export class Core {
    public adapter: AdapterInstance;
    public gateway: Gateway;
    public entityContainer: EntityContainer;
    private plugins: CorePlugin[];
    private useCase: AdapterUseCases = {};
    private controllers: Controllers;

    constructor(...args: (new () => CorePlugin)[]) {
        const useCase = this.useCase;
        this.adapter = new Proxy<any>({}, {
            get(target, prop) {
                return (...args: AdapterParameters) => {
                    const uses = useCase[prop as keyof Adapter];
                    if (uses) {
                        return uses.map(use => {
                            if (use instanceof AdapterClass) {
                                return use.execute(...args);
                            }
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            return use(...args);
                        });
                    }
                    throw new Error('Method not implemented.');
                };
            }
        });
        this.gateway = new Gateway(this);
        this.plugins = args.map(plugin => new plugin());
        this.entityContainer = new EntityContainer();
        this.controllers = new Controllers(this);
    }

    async start() {
        await this.initPlugins();
        console.log('Starting server...');
        this.receiveEvent('EventInitialization');
    }

    async initPlugins() {
        for (const plugin of this.plugins) {
            await plugin.install({
                register: this.registerUseCase.bind(this),
                gateway: this.gateway
            });
        }
    }

    receiveEvent(event: EventController | string) {
        this.controllers.trigger(event);
    }

    private registerUseCase<T extends keyof Adapter>(useCase: T, method: Adapter[T] | AdapterClass) {
        if (!this.useCase[useCase]) {
            this.useCase[useCase] = [];
        }
        this.useCase[useCase]?.push(method);
    }
}

export type PluginRegister = { register: Core['registerUseCase'], gateway: Gateway };