export interface IValidateError {
  message: 'Validation failed';
  details: { [name: string]: unknown };
}
