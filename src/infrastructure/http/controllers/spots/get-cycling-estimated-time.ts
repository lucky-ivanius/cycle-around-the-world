import { Request, Response } from 'express-serve-static-core';
import { NotFoundError } from '../../../../application/common/errors/not-found.error';
import { UnexpectedError } from '../../../../application/common/errors/unexpected.error';
import { NotCalculatedError } from '../../../../application/use-cases/spots/get-cycling-estimated-time/get-cycling-estimated-time.error';
import { GetCyclingEstimatedTimeUseCase } from '../../../../application/use-cases/spots/get-cycling-estimated-time/get-cycling-estimated-time.use-case';
import { Controller } from '../../common/controller';

export class GetCyclingEstimatedTimeController extends Controller {
  public constructor(
    private readonly getCyclingEstimatedTimeUseCase: GetCyclingEstimatedTimeUseCase
  ) {
    super();
  }

  async execute(req: Request, res: Response): Promise<unknown> {
    try {
      const now = new Date();

      const result = await this.getCyclingEstimatedTimeUseCase.execute({
        userId: req.auth!.userId,
        spotNameSlug: req.params.spotNameSlug,
        fromTimestamp: now.getTime(),
      });

      if (result instanceof NotFoundError)
        return Controller.notFound(res, result.getError());
      if (result instanceof NotCalculatedError)
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
