import { Controller } from '../controller/controller';

export interface ApiServer {
	start(): Promise<void>;

	route(controller: Controller): void;
}