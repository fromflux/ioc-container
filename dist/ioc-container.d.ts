export default class Injector {
    private static instance;
    private map;
    private constructor();
    static getInstance(): Injector;
    register(interfaceName: string, className: any): void;
    create(interfaceName: string, args?: []): any;
}
export declare function inject(...injectables: any[]): any;
