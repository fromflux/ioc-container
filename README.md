# fromflux/ioc-container

The simplest IoC container

## Installation

```
npm install
```

## Usage
See example usage in `/tests` directory for more details.

### Create an injector and register injectables
```
import Injector, { inject } from '../src/ioc-container';

...

const injector = Injector.getInstance();

injector.register('IShipper', Shipper);
injector.register('IValidator', Validator);
```
### Inject registered types into your Class definition
```
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
```

## Run test example
```
npm run test
```

## License

UNLICENSED