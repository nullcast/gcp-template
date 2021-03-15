// tslint:disable: variable-name
import { Entity } from 'utility/model/entity.model';

type WhereFilterOp = '<' | '<=' | '==' | '!=' | '>=' | '>' | 'array-contains' | 'in' | 'array-contains-any' | 'not-in';

type OrderByDirection = 'desc' | 'asc';

interface WhereOp<T extends Entity> {
  field: keyof T;
  operator: WhereFilterOp;
  value: any;
}

interface OrderByOp<T extends Entity> {
  field: keyof T;
  direction: OrderByDirection;
}

export class FirestoreQueryBuilder<T extends Entity> {
  private _startAfter?: string;
  private _limit = 10;
  private _where: WhereOp<T>[] = [];
  private _orderBy: OrderByOp<T> = {
    field: 'id',
    direction: 'asc'
  };

  orderBy(field: keyof T, direction: OrderByDirection) {
    this._orderBy = {
      field,
      direction
    };
    return this;
  }

  startAfter(value: string) {
    this._startAfter = value;
    return this;
  }

  limit(value: number) {
    this._limit = value;
    return this;
  }

  equalWhere(field: keyof T, value: any) {
    this._where.push({ field, operator: '==', value });
    return this;
  }

  build(query: any): any {
    query = query.orderBy(this._orderBy.field as string, this._orderBy.direction);
    if (this._startAfter) {
      query = query.startAfter(this._startAfter);
    }
    if (this._limit) {
      query = query.limit(this._limit);
    }
    this._where.forEach(where => (query = query.where(where.field as string, where.operator, where.value)));
    return query;
  }
}
