import { Request, Response } from 'express-serve-static-core';
import { NotFoundError } from '../../../../application/common/errors/not-found.error';
import { UnexpectedError } from '../../../../application/common/errors/unexpected.error';
import {
  InaccessibleForCyclingError,
  InvalidGeolocationError,
} from '../../../../application/use-cases/spots/calculate-cycling-trip/calculate-cycling-trip.error';
import { CalculateCyclingTripUseCase } from '../../../../application/use-cases/spots/calculate-cycling-trip/calculate-cycling-trip.use-case';
import { Controller } from '../../common/controller';

export class CalculateCyclingTripController extends Controller {
  public constructor(
    private readonly calculateCyclingTripUseCase: CalculateCyclingTripUseCase
  ) {
    super();
  }

  async execute(req: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.calculateCyclingTripUseCase.execute({
        userId: req.auth!.userId,
        spotNameSlug: req.params.spotNameSlug,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        cyclingSpeed: req.body.cyclingSpeed,
        dailyCyclingHours: req.body.dailyCyclingHours,
      });

      if (result instanceof NotFoundError)
        return Controller.notFound(res, result.getError());
      if (result instanceof InaccessibleForCyclingError)
        return Controller.badRequest(res, result.getError());
      if (result instanceof InvalidGeolocationError)
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
