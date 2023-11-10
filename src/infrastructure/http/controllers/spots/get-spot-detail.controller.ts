import { Request, Response } from 'express-serve-static-core';
import { NotFoundError } from '../../../../application/common/errors/not-found.error';
import { UnexpectedError } from '../../../../application/common/errors/unexpected.error';
import { GetSpotDetailUseCase } from '../../../../application/use-cases/spots/get-spot-detail/get-spot-detail.use-case';
import { Controller } from '../../common/controller';

export class GetSpotDetailController extends Controller {
  public constructor(
    private readonly getSpotDetailUseCase: GetSpotDetailUseCase
  ) {
    super();
  }

  async execute(req: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.getSpotDetailUseCase.execute({
        userId: req.auth!.userId,
        spotNameSlug: req.params.spotNameSlug,
      });

      if (result instanceof NotFoundError)
        return Controller.notFound(res, result.getError());
      if (result instanceof UnexpectedError)
        return Controller.unexpectedError(res);

      if (!result.success) return Controller.badRequest(res, result.getError());

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
