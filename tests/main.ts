import Injector, { inject } from '../src/ioc-container';
import assert from 'assert';

interface IProcessor {
  process(order: IOrder): string
}

interface IValidator {
  validate(order: IOrder): boolean
}

interface IShipper {
  ship(order: IOrder): string
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
    return order.id;
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

  public process(order: IOrder): string {
    if (this.validator.validate(order)) {
      return this.shipper.ship(order);
    }
  }
}

// ------------------------------------------

const injector = Injector.getInstance();

injector.register('IShipper', Shipper);
injector.register('IValidator', Validator);

// ------------------------------------------

const myProcessor = new Processor('test');

const myOrder = new Order('1');

const orderOutput = myProcessor.process(myOrder);

assert.strictEqual(orderOutput, '1');