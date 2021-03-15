import { Entity } from 'utility/model/entity.model';
import { Limit } from './value/limit.value';

type WhereFilterOp = '<' | '<=' | '=' | '!=' | '>=' | '>';

interface WhereOp<T extends Entity> {
  field: keyof T;
  operator: WhereFilterOp;
  value: any;
}

interface SetOp<T extends Entity> {
  field: keyof T;
  value: any;
}

export abstract class IBigQueryQueryBuilder {
  constructor(protected readonly from: string) {}
  abstract build(): string;
}
export class BigQueryQueryBuilder<T extends Entity> {
  constructor(private readonly from: string) {}

  private static BigQuerySelectQueryBuilder = class<T extends Entity> extends IBigQueryQueryBuilder {
    private _select: (keyof T)[] = [];
    private _where: WhereOp<T>[] = [];
    private _limit = Limit.create(100);

    field(value: (keyof T)[]) {
      value.forEach(item => this._select.push(item));
      return this;
    }

    where(wheres: WhereOp<T>[]) {
      wheres.forEach(({ field, operator, value }) => this._where.push({ field, operator, value }));
      return this;
    }

    limit(value: number) {
      this._limit = Limit.create(value);
      return this;
    }

    build(): string {
      return [
        `SELECT ${this._select.join(', ')}`,
        `FROM \`${this.from}\``,
        `WHERE ${this._where.map(where => `\`${where.field}\` ${where.operator} ${where.value}`).join(' AND ')}`,
        `LIMIT ${this._limit.value}`
      ].join('\n');
    }
  };

  private static BigQueryInsertQueryBuilder = class<T extends Entity> extends IBigQueryQueryBuilder {
    private _insert: (keyof T)[] = [];
    private _value: any[][] = [];

    field(value: (keyof T)[]) {
      value.forEach(item => this._insert.push(item));
      return this;
    }

    value(values: any[][]) {
      values.forEach(value => this._value.push(value));
      return this;
    }

    build(): string {
      return [
        `INSERT \`${this.from}\` (${this._insert.map(item => `\`${item}\``).join(', ')})`,
        `VALUES ${this._value.map(value => `(${value.join(', ')})`).join(',\n')}`
      ].join('\n');
    }
  };

  private static BigQueryUpdateQueryBuilder = class<T extends Entity> extends IBigQueryQueryBuilder {
    private _set: SetOp<T>[] = [];
    private _where: WhereOp<T>[] = [];

    set(sets: SetOp<T>[]) {
      sets.forEach(({ field, value }) => this._set.push({ field, value }));
      return this;
    }

    where(wheres: WhereOp<T>[]) {
      wheres.forEach(({ field, operator, value }) => this._where.push({ field, operator, value }));
      return this;
    }

    build(): string {
      return [
        `UPDATE \`${this.from}\``,
        `SET ${this._set.map(set => `${set.field}=${set.value}`)}`,
        `WHERE ${this._where.map(where => `${where.field} ${where.operator} ${where.value}`).join(' AND ')}`
      ].join('\n');
    }
  };

  private static BigQueryDeleteQueryBuilder = class<T extends Entity> extends IBigQueryQueryBuilder {
    private _where: WhereOp<T>[] = [];

    where(wheres: WhereOp<T>[]) {
      wheres.forEach(({ field, operator, value }) => this._where.push({ field, operator, value }));
      return this;
    }

    build(): string {
      return [
        `DELETE`,
        `FROM \`${this.from}\``,
        `WHERE ${this._where.map(where => `${where.field} ${where.operator} ${where.value}`).join(' AND ')}`
      ].join('\n');
    }
  };

  select() {
    return new BigQueryQueryBuilder.BigQuerySelectQueryBuilder<T>(this.from);
  }

  insert() {
    return new BigQueryQueryBuilder.BigQueryInsertQueryBuilder<T>(this.from);
  }

  update() {
    return new BigQueryQueryBuilder.BigQueryUpdateQueryBuilder<T>(this.from);
  }

  delete() {
    return new BigQueryQueryBuilder.BigQueryDeleteQueryBuilder<T>(this.from);
  }
}
