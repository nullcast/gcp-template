import { ArgumentNullException } from '../exception/argument-null.exception';
import { ArgumentException } from '../exception/argument.exception';
import { PrimitiveValueObject } from './primitive-value-object.model';
export class Timestamp extends PrimitiveValueObject<Date> {
  static createByDate(value: Date): Timestamp {
    if (value === undefined || value === null) {
      throw new ArgumentNullException();
    }
    return new Timestamp(value);
  }
  static createByMillsec(value: number): Timestamp {
    if (value < 0) {
      throw new ArgumentException();
    }
    return new Timestamp(new Date(value));
  }
}
