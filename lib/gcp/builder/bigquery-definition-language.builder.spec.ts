import { BigQueryDefinitionLanguageBuilder } from './bigquery-definition-language.builder';

import { Entity } from '../../../utility/model/entity.model';
import { IdValueObject } from '../../../utility/model/id-value-object.model';

class NewTable implements Entity {
  id: IdValueObject;
  name: string;
  createdAt: string;
  updatedAt: string;
  equals(value: Entity): boolean {
    throw new Error('Method not implemented.');
  }
}

describe('BigQueryDefinitionLanguageBuilder', () => {
  const tableName = 'testProjectName.testDatasetName.testTable';
  let query = '';
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  it('shouldnt return empty string', () => {
    query = new BigQueryDefinitionLanguageBuilder<NewTable>(tableName)
      .create()
      .columns([
        {
          name: 'id',
          type: 'BOOL',
          nullable: false
        }
      ])
      .build();

    // check if query is empty
    expect(query).not.toBeFalsy();
  });

  it('should create an correct query string - without IF EXISTS (1)', () => {
    query = new BigQueryDefinitionLanguageBuilder<NewTable>(tableName)
      .create()
      .columns([
        {
          name: 'id',
          type: 'BOOL',
          nullable: false
        }
      ])
      .build();

    const trueQuery = [`CREATE TABLE ${tableName}`, '(', 'id BOOL not null', ')'].join('\n');

    expect(query).toEqual(trueQuery);
  });

  it('should create an correct query string - with IF EXISTS', () => {
    query = new BigQueryDefinitionLanguageBuilder<NewTable>(tableName)
      .create()
      .withIfNotExists()
      .columns([
        {
          name: 'id',
          type: 'BOOL',
          nullable: false
        }
      ])
      .build();

    const trueQuery = [`CREATE TABLE ${tableName} IF NOT EXISTS`, '(', 'id BOOL not null', ')'].join('\n');

    expect(query).toEqual(trueQuery);
  });

  it('should create an correct query string - with multiple columns', () => {
    query = new BigQueryDefinitionLanguageBuilder<NewTable>(tableName)
      .create()
      .withIfNotExists()
      .columns([
        {
          name: 'id',
          type: 'INT64',
          nullable: false
        },
        {
          name: 'name',
          type: 'STRING',
          nullable: true
        },
        {
          name: 'createdAt',
          type: 'DATETIME',
          nullable: false
        },
        {
          name: 'updatedAt',
          type: 'DATETIME',
          nullable: true
        }
      ])
      .build();

    const trueQuery = [
      `CREATE TABLE ${tableName} IF NOT EXISTS`,
      '(',
      'id INT64 not null, name STRING, createdAt DATETIME not null, updatedAt DATETIME',
      ')'
    ].join('\n');

    expect(query).toEqual(trueQuery);
  });
});
