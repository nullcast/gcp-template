import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable({
  providedIn: 'root'
})
export class SentryService implements ErrorHandler {
  constructor() {}

  handleError(error: any) {
    console.error('ErrorHandler', error);
    Sentry.captureException(error.error || error.message || error.originalError || error);
  }
}
