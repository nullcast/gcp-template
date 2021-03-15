import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinService {
  url = 'https://httpbin.org';

  constructor(private httpClient: HttpClient) {}

  getStatus(status: number) {
    return this.httpClient.get(`${this.url}/status/${status}`);
  }
}
