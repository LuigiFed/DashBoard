import { Request } from './request.model';

export class Result<T> {
  code!: string;
  descr?: string;
  elements!: T[];
  request?: Request<T>;
  parameter?: string;
}
