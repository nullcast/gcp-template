import { AbstractValueObject } from './abstract-value-object.model';

interface ValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends ValueObjectProps> extends AbstractValueObject<T> {}
