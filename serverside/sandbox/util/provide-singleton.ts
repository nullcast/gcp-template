import { interfaces } from 'inversify';
import { provide } from 'inversify-binding-decorators';

export const provideSingleton = <T>(identifier: interfaces.ServiceIdentifier<T>) => {
  return provide(identifier);
};
