import { Request, Response } from 'express';
import { UnexpectedError } from '../../../../application/common/errors/unexpected.error';
import { InvalidCredentialError } from '../../../../application/use-cases/auth/login/login.error';
import { LoginUseCase } from '../../../../application/use-cases/auth/login/login.use-case';
import { Controller } from '../../common/controller';

export class LoginController extends Controller {
  public constructor(private readonly loginUseCase: LoginUseCase) {
    super();
  }

  async execute(req: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.loginUseCase.execute({
        username: req.body.username,
        password: req.body.password,
      });

      if (result instanceof InvalidCredentialError)
        return Controller.badRequest(res, result.getError());
      if (result instanceof UnexpectedError)
        return Controller.unexpectedError(res);

      if (!result.success) return Controller.badRequest(res, result.getError());

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
