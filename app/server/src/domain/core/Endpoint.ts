import { IncomingMessage } from 'http';

export class Endpoint<B, R = IncomingMessage> {
    constructor(
        public timestamp: number,
        public url: string,
        public method: string,
        public body: B,
        public request: R
    ) {
    }
}