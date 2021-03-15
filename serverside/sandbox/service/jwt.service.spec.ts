import 'reflect-metadata';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  const target = new JwtService();
  const payload = { sub: 'hoge', fuga: 'fuga', exp: Math.floor(Date.now() / 1000) + 10000 };
  const token = target.sign(payload);

  beforeEach(() => {});

  it('should return string not empty', () => {
    expect(token).toBeTruthy();
  });

  it('should return correct string', () => {
    const decoded = target.decode(token);
    expect(decoded).toEqual(payload);
  });

  it('should verify correct token', () => {
    const verify = target.verify(token);
    expect(verify).toEqual(payload);
  });

  it('should throw error when verify incorrent string', () => {
    expect(() => target.verify('incerrect.string')).toThrow();
  });

  it('should throw error when already expired token', () => {
    const expiredPayload = Object.assign(payload, { exp: Math.floor(Date.now() / 1000) - 1 });
    const expiredToken = target.sign(expiredPayload);
    expect(() => target.verify(expiredToken)).toThrow();
  });
});
