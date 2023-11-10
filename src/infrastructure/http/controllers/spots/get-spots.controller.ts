import { Request, Response } from 'express-serve-static-core';
import { UnexpectedError } from '../../../../application/common/errors/unexpected.error';
import { GetSpotsUseCase } from '../../../../application/use-cases/spots/get-spots/get-spots.use-case';
import { Controller } from '../../common/controller';

export class GetSpotsController extends Controller {
  public constructor(private readonly getSpotsUseCase: GetSpotsUseCase) {
    super();
  }

  async execute(_: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.getSpotsUseCase.execute();

      if (result instanceof UnexpectedError)
        return Controller.unexpectedError(res);

      if (!result.success) return Controller.badRequest(res, result.getError());

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
