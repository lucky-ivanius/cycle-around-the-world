import { Result } from '../../../../core/common/logic/result';
import { UnexpectedError } from '../../../common/errors/unexpected.error';
import { UseCase } from '../../../common/use-case/use-case';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { Claims } from '../../../services/token.service';
import { LoginRequest, LoginResponse } from './login.dto';
import { InvalidCredentialError } from './login.error';

export class LoginUseCase implements UseCase<LoginRequest, LoginResponse> {
  private readonly sessionExpiryHours = 24;

  public constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService
  ) {}

  async execute(data: LoginRequest): Promise<LoginResponse> {
    try {
      const user = await this.authService.authenticate({
        username: data.username,
        password: data.password,
      });

      if (!user) return new InvalidCredentialError();

      const claims: Claims = {
        sub: user.id.toString(),
        username: user.username.value,
      };

      const token = await this.sessionService.createSession(
        claims,
        this.sessionExpiryHours
      );

      return Result.ok({
        accessToken: token,
      });
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
