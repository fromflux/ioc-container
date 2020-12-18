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
  private map = new Map();

  register(interfaceName: string, className: any) {
    this.map.set(interfaceName, className);
  }

  create(interfaceName: string, args?: []) {
    const Object = this.map.get(interfaceName);
    return new Object(args);
  }
}

// ------------------------------------------

class Processor implements IProcessor {
  private validator: IValidator;
  private shipper: IShipper;

  constructor() {
    this.validator = injector.create('IValidator');
    this.shipper = injector.create('IShipper');
  }

  public process(order: IOrder): void {
    if (this.validator.validate(order)) {
      this.shipper.ship(order);
    }
  }
}

// ------------------------------------------

const injector = new Injector();
injector.register('IShipper', Shipper);
injector.register('IValidator', Validator);

const myProcessor = new Processor();

myProcessor.process(new Order('1'));
