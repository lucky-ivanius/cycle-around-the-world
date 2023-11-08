import { Request, Response } from 'express';
import { CalculateCyclingTripUseCase } from '../../../../application/use-cases/cycling/calculate-cycling-trip/calculate-cycling-trip.use-case';
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

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
