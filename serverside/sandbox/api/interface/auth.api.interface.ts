import { AccessTokenResponse } from '../model/access-token.response.model';
import { CredentialRequest } from '../model/credential.request.model';

export interface IAuthApi {
  getAccessToken(credential: CredentialRequest): Promise<AccessTokenResponse>;
}
