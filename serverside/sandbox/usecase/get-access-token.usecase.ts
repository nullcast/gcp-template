import { inject } from 'inversify';
import { Observable, of } from 'rxjs';
import { AccessTokenResponse } from '../api/model/access-token.response.model';
import { CredentialRequest } from '../api/model/credential.request.model';
import { JwtService } from '../service/jwt.service';
import { provideSingleton } from '../util/provide-singleton';

@provideSingleton(GetAccessTokenUsecase)
export class GetAccessTokenUsecase {
  constructor(@inject(JwtService) private readonly jwtService: JwtService) {}
  getAccessToken(credencial: CredentialRequest): Observable<AccessTokenResponse> {
    return of({ token: this.jwtService.sign({ sub: credencial.appId, aud: 'aud' }), createdAt: new Date() });
  }
}
