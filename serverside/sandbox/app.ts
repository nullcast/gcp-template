// src/app.ts
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NextFunction, Request as ExRequest, Response as ExResponse } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { NotFoundError } from './exception/notfound.exception';
import { UnauthorizedError } from './exception/unauthorized.exception';
import { RegisterRoutes } from './routes';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./swagger.json')));
});

RegisterRoutes(app);

app.use(function errorHandler(err: unknown, req: ExRequest, res: ExResponse, next: NextFunction): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: err.message || 'Validation Failed',
      details: err?.fields
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({
      message: err.message || 'Unauthorized Error'
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message || 'Not Found Error'
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: err.message || 'Internal Server Error'
    });
  }

  next();
});
