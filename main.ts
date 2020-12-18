interface IProcessor {
  process(order: IOrder): void
}

interface IValidator {
  validate(order: IOrder): boolean
}

interface IShipper {
  ship(order: IOrder): boolean
}

interface IOrder {
  id: string
}

// ------------------------------------------

class Order implements IOrder {
  public id: string;

  constructor(id: string) {
    this.id = id;
  }
}

class Validator implements IValidator {
  public validate(order: IOrder) {
    console.log('validate order: ', order.id)
    return !!order.id;
  }
}

class Shipper implements IShipper {
  public ship(order: IOrder) {
    console.log('ship order: ', order.id)
    return order.id !== null;
  }
}

// ------------------------------------------

class Injector {
  private static instance: Injector;

  private map = new Map();

  private constructor() { }

  static getInstance(): Injector {
    if (!Injector.instance) {
      Injector.instance = new Injector();
    }
    return Injector.instance;
  }

  public register(interfaceName: string, className: any) {
    this.map.set(interfaceName, className);
  }

  public create(interfaceName: string, args?: []) {
    const Object = this.map.get(interfaceName);
    return new Object(args);
  }
}

function inject(...injectables: any[]): any {
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

// ------------------------------------------

@inject(
  { name: 'validator', type: 'IValidator' },
  { name: 'shipper', type: 'IShipper' },
)
class Processor implements IProcessor {
  private validator!: IValidator;
  private shipper!: IShipper;
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public process(order: IOrder): void {
    if (this.validator.validate(order)) {
      this.shipper.ship(order);
    }
  }
}

// ------------------------------------------

const injector = Injector.getInstance();

injector.register('IShipper', Shipper);
injector.register('IValidator', Validator);

// ------------------------------------------

const myProcessor = new Processor('test');

console.log('myProcessor', myProcessor)

const myOrder = new Order('1');

myProcessor.process(myOrder);
