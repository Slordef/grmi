export class Endpoint<R, B> {
    constructor(
        public timestamp: number,
        public url: string,
        public method: string,
        public body: B,
        public request: R
    ) {
    }
}