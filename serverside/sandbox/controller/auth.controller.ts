import { inject } from 'inversify';
import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { IAuthApi } from '../api/interface/auth.api.interface';
import { AccessTokenResponse } from '../api/model/access-token.response.model';
import { CredentialRequest } from '../api/model/credential.request.model';
import { IValidateError } from '../api/model/validation-error.model';
import { GetAccessTokenUsecase } from '../usecase/get-access-token.usecase';
import { provideSingleton } from '../util/provide-singleton';

@Tags('Auth')
@Route('v1/user/auth')
@provideSingleton(AuthController)
export class AuthController extends Controller implements IAuthApi {
  constructor(@inject(GetAccessTokenUsecase) private readonly getAccessTokenUsecase: GetAccessTokenUsecase) {
    super();
  }

  @Post('/')
  @SuccessResponse('201', 'Created')
  @Response<IValidateError>(422, 'Validation Failed')
  getAccessToken(@Body() credential: CredentialRequest): Promise<AccessTokenResponse> {
    return this.getAccessTokenUsecase.getAccessToken(credential).toPromise();
  }
}
