import { IdValueObject } from './id-value-object.model';

export interface Entity {
  id: IdValueObject;
  equals(value: Entity): boolean;
}
