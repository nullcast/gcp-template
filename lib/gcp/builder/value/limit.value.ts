import { ArgumentNullException } from '../../../../utility/exception/argument-null.exception';
import { ArgumentException } from '../../../../utility/exception/argument.exception';
import { PrimitiveValueObject } from '../../../../utility/model/primitive-value-object.model';

export class Limit extends PrimitiveValueObject<number> {
  static create(value: number): Limit {
    if (value === null) {
      throw new ArgumentNullException();
    }
    if (value < 0) {
      throw new ArgumentException();
    }

    return new Limit(value);
  }
}
