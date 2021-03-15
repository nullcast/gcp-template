import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { BatchStore } from './batch.store';

@Injectable({ providedIn: 'root' })
export class BatchService {
  constructor(private batchStore: BatchStore, private http: HttpClient) {}
}
