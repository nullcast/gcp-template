import { ServiceDto } from 'domain/service/dto/service.dto';
import 'reflect-metadata';
import { Observable, of } from 'rxjs';
import { ServiceDomainService } from '../../../domain/service/service/service-domain.service';
import { UnauthorizedError } from '../exception/unauthorized.exception';
import { JwtService } from '../service/jwt.service';
import { GetAccessTokenUsecase } from './get-access-token.usecase';

jest.mock('../service/jwt.service');
const JwtServiceMock = JwtService as jest.Mock;

jest.mock('../../../domain/service/service/service-domain.service');
const ServiceDomainServiceMock = ServiceDomainService as jest.Mock;

const now = new Date();
ServiceDomainServiceMock.mockImplementationOnce(() => {
  const selectServiceMock = jest.fn(
    (id: string): Observable<ServiceDto> => {
      if (id === 'hoge') {
        return of({
          id: 'hoge',
          name: 'name',
          secret: 'secret',
          createdAt: now,
          updatedAt: now
        });
      } else {
        return of(undefined);
      }
    }
  );
  return {
    selectService: selectServiceMock
  };
});

describe('GetAccessTokenUsecase', () => {
  const jwtService = new JwtServiceMock();
  const serviceDomainService = new ServiceDomainServiceMock();
  const target = new GetAccessTokenUsecase(serviceDomainService, jwtService);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return response not empty when correct credential', async () => {
    const response = await target.getAccessToken({ serviceId: 'hoge', secret: 'secret' }).toPromise();
    expect(response).toBeTruthy();
    expect(serviceDomainService.selectService).toBeCalledTimes(1);
    expect(serviceDomainService.selectService).toBeCalledWith('hoge');
    expect(jwtService.sign).toBeCalledTimes(1);
    expect(jwtService.sign).toBeCalledWith({ sub: 'hoge', aud: 'name' });
  });

  it('should throw error when incorrect serviceId', async () => {
    await expect(target.getAccessToken({ serviceId: 'a', secret: 'secret' }).toPromise()).rejects.toThrow(UnauthorizedError);
    expect(serviceDomainService.selectService).toBeCalledTimes(1);
    expect(serviceDomainService.selectService).toBeCalledWith('a');
    expect(jwtService.sign).toBeCalledTimes(0);
  });

  it('should throw error when incorrect secret', async () => {
    await expect(target.getAccessToken({ serviceId: 'hoge', secret: 'a' }).toPromise()).rejects.toThrow(UnauthorizedError);
    expect(serviceDomainService.selectService).toBeCalledTimes(1);
    expect(serviceDomainService.selectService).toBeCalledWith('hoge');
    expect(jwtService.sign).toBeCalledTimes(0);
  });
});
