import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import { Algorithm, DecodeOptions, VerifyOptions } from 'jsonwebtoken';
import * as path from 'path';
import { provideSingleton } from '../util/provide-singleton';

const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, '..', '.keys', 'jwt-secret.rsa'));
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, '..', '.keys', 'jwt-secret.rsa.pub'));

interface Payload {
  sub: string;
  aud?: string;
  exp?: number;
  nbf?: string;
  jti?: string;
  typ?: string;
  [key: string]: any;
}

@provideSingleton(JwtService)
export class JwtService {
  readonly iss = 'collector.api.delightful-labs.com';
  readonly algorithm: Algorithm = 'RS256';
  sign(payload: Payload) {
    payload.iat = Math.floor(Date.now() / 1000);
    return jwt.sign(payload, PRIVATE_KEY, { algorithm: this.algorithm });
  }

  verify(token: string, option?: VerifyOptions) {
    return jwt.verify(token, PUBLIC_KEY, Object.assign({ algorithms: [this.algorithm] }, option));
  }

  decode(token: string, option?: DecodeOptions): Payload {
    return jwt.decode(token, option) as Payload;
  }
}
