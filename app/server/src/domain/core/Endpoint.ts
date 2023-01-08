export class Endpoint<B> {
    constructor(
        public timestamp: number,
        public url: string,
        public method: string,
        public body: B
    ) {
    }
}