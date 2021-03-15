import { inject } from 'inversify';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceDomainService } from '../../../domain/service/service/service-domain.service';
import { AccessTokenResponse } from '../api/model/access-token.response.model';
import { CredentialRequest } from '../api/model/credential.request.model';
import { UnauthorizedError } from '../exception/unauthorized.exception';
import { JwtService } from '../service/jwt.service';
import { provideSingleton } from '../util/provide-singleton';

@provideSingleton(GetAccessTokenUsecase)
export class GetAccessTokenUsecase {
  constructor(
    @inject(ServiceDomainService) private readonly serviceDomainService: ServiceDomainService,
    @inject(JwtService) private readonly jwtService: JwtService
  ) {}
  getAccessToken(credencial: CredentialRequest): Observable<AccessTokenResponse> {
    return this.serviceDomainService.selectService(credencial.serviceId).pipe(
      map(service => {
        if (service && service.secret === credencial.secret) {
          return { token: this.jwtService.sign({ sub: service.id, aud: service.name }), createdAt: new Date() };
        } else {
          throw new UnauthorizedError('Service id or secret is not correct.');
        }
      })
    );
  }
}
