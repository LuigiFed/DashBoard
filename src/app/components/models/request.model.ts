export class Request<T> {
    name!: string;
    version = '2.16.3';
    elements!: T[];
    userName!: string;
    parameter!: string;
    detail!: boolean;
    constructor() {}

}
