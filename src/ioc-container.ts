/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export default class Injector {
  private static instance: Injector;

  private map: Map<any, any>;

  private constructor() {
    this.map = new Map();
  }

  static getInstance(): Injector {
    if (!Injector.instance) {
      Injector.instance = new Injector();
    }
    return Injector.instance;
  }

  public register(interfaceName: string, className: any) {
    this.map.set(interfaceName, className);
  }

  public create(interfaceName: string, args?: []): any {
    const Object = this.map.get(interfaceName);
    return new Object(args);
  }
}

export function inject(...injectables: any[]): any {
  return function (constructor: any) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        injectables.forEach(inj => {
          Object.defineProperty(this, inj.name, {
            value: Injector.getInstance().create(inj.type),
            enumerable: true,
          });
        });
      }
    };
  }
}
