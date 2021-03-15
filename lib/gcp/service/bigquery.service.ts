import { Observable } from 'rxjs';
import { IBigQueryQueryBuilder } from '../builder/bigquery-query.builder';

export abstract class IBigQueryService {
  abstract query(builder: IBigQueryQueryBuilder): Observable<any | void>;

  abstract generateId(): string;
}
