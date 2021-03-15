import { Observable, of } from 'rxjs';
import { AccessTokenResponse } from '../api/model/access-token.response.model';
import { CredentialRequest } from '../api/model/credential.request.model';
import { GetAccessTokenUsecase } from '../usecase/get-access-token.usecase';
import { AuthController } from './auth.controller';

jest.mock('../usecase/get-access-token.usecase');
const GetAccessTokenUsecaseMock = GetAccessTokenUsecase as jest.Mock;

GetAccessTokenUsecaseMock.mockImplementation(() => {
  const getAccessTokenMock = jest.fn(
    (credencial: CredentialRequest): Observable<AccessTokenResponse> => {
      return of({ token: 'hoge', createdAt: new Date() });
    }
  );
  return {
    getAccessToken: getAccessTokenMock
  };
});

describe('AuthController', () => {
  const getAccessTokenUsecaseMock = new GetAccessTokenUsecaseMock();
  const target = new AuthController(getAccessTokenUsecaseMock);

  afterEach(() => jest.clearAllMocks());

  it('should call getAccessToken only once', () => {
    const credential = { serviceId: 'hoge', secret: 'fuga' };
    target.getAccessToken(credential);

    expect(getAccessTokenUsecaseMock.getAccessToken).toBeCalledTimes(1);
    expect(getAccessTokenUsecaseMock.getAccessToken).toBeCalledWith(credential);
  });
});
