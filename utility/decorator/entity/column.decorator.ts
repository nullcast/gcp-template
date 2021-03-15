import 'reflect-metadata';
import { entityColumnMetakey } from '../metadata.key';

export function Column(): (target: object, propertyKey: string) => void {
  return registerProperty;
}

function registerProperty(target: object, propertyKey: string): void {
  const EntityColumnMetakey = entityColumnMetakey(target.constructor.name);
  let properties: string[] = Reflect.getMetadata(EntityColumnMetakey, target);

  if (properties) {
    properties.push(propertyKey);
  } else {
    properties = [propertyKey];
    Reflect.defineMetadata(EntityColumnMetakey, properties, target);
  }
}

// tslint:disable-next-line: ban-types
export function getColumns<T extends Object>(origin: T) {
  const EntityColumnMetakey = entityColumnMetakey(origin.constructor.name);
  return Reflect.getMetadata(EntityColumnMetakey, origin) as (keyof T)[];
}
