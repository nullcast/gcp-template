import { Entity } from '../../../utility/model/entity.model';

type ColumnTypeOp = 'BOOL' | 'INT64' | 'FLOAT64' | 'STRING' | 'BYTES' | 'STRUCT' | 'ARRAY' | 'TIMESTAMP' | 'DATE' | 'TIME' | 'DATETIME';

interface Column<T extends Entity> {
  name: keyof T;
  type: ColumnTypeOp;
  nullable: boolean;
}

export abstract class IBigQueryTableBuilder {
  constructor(protected readonly tableName: string) {}
  abstract build(): string;
}

export class BigQueryDefinitionLanguageBuilder<T extends Entity> {
  constructor(private readonly tableName: string) {}

  private static BigQueryTableCreateQueryBuilder = class<T extends Entity> extends IBigQueryTableBuilder {
    private _columns: Column<T>[] = [];
    private _ifNotExists = false;

    withIfNotExists() {
      this._ifNotExists = true;

      return this;
    }

    columns(columns: Column<T>[]) {
      columns.forEach(item => this._columns.push(item));

      return this;
    }

    build(): string {
      const fieldList = this._columns.map(column => `${column.name} ${column.type}${column.nullable ? '' : ' not null'}`).join(', ');

      return [`CREATE TABLE ${this.tableName}${this._ifNotExists ? ' IF NOT EXISTS' : ''}`, '(', fieldList, ')'].join('\n');
    }
  };

  private static BigQueryTableDropQueryBuilder = class extends IBigQueryTableBuilder {
    build(): string {
      return `DROP TABLE IF EXISTS ${this.tableName}`;
    }
  };

  create() {
    return new BigQueryDefinitionLanguageBuilder.BigQueryTableCreateQueryBuilder<T>(this.tableName);
  }

  alter() {}

  delete() {
    return new BigQueryDefinitionLanguageBuilder.BigQueryTableDropQueryBuilder(this.tableName);
  }
}
