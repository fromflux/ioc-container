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

class Order implements IOrder {
  public id: string;

  constructor(id) {
    this.id = id;
  }
}

class Validator implements IValidator {
  public validate(order: IOrder) {
    return !!order.id;
  }
}

class Shipper implements IShipper {
  public ship(order: IOrder) {
    return order.id !== null;
  }
}

class Processor implements IProcessor {
  private validator: IValidator;
  private shipper: IShipper;

  constructor(validator: IValidator, shipper: IShipper) {
    this.validator = validator;
    this.shipper = shipper;
  }

  public process(order: IOrder): void {
    if (this.validator.validate(order)) {
      this.shipper.ship(order);
    }
  }
}

const myProcessor = new Processor(new Validator(), new Shipper());

myProcessor.process(new Order('1'));