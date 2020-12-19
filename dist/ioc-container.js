"use strict";
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.inject = void 0;
class Injector {
    constructor() {
        this.map = new Map();
    }
    static getInstance() {
        if (!Injector.instance) {
            Injector.instance = new Injector();
        }
        return Injector.instance;
    }
    register(interfaceName, className) {
        this.map.set(interfaceName, className);
    }
    create(interfaceName, args) {
        const Object = this.map.get(interfaceName);
        return new Object(args);
    }
}
exports.default = Injector;
function inject(...injectables) {
    return function (constructor) {
        return class extends constructor {
            constructor(...args) {
                super(...args);
                injectables.forEach(inj => {
                    Object.defineProperty(this, inj.name, {
                        value: Injector.getInstance().create(inj.type),
                        enumerable: true,
                    });
                });
            }
        };
    };
}
exports.inject = inject;
//# sourceMappingURL=ioc-container.js.map