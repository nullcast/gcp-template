import { BigQuery } from '@google-cloud/bigquery';
import { injectable } from 'inversify';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { IBigQueryQueryBuilder } from '../../../../lib/gcp/builder/bigquery-query.builder';
import { IBigQueryService } from '../../../../lib/gcp/service/bigquery.service';

@injectable()
export class BigQueryService implements IBigQueryService {
  constructor(private bigQuery: BigQuery) {}

  query(builder: IBigQueryQueryBuilder): Observable<any> {
    return from(this.bigQuery.createQueryJob({ query: builder.build() })).pipe(
      map(jobResponse => jobResponse[0]),
      mergeMap(job => job.getQueryResults(job)),
      map(pageResponse => pageResponse[0]),
      mergeMap(rows => rows)
    );
  }

  generateId(): string {
    return '';
  }
}
