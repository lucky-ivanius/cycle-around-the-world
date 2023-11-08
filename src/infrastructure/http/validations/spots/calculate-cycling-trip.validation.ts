import { NextFunction, Request, Response } from 'express';
import { CalculateCyclingTripRequest } from '../../../../application/use-cases/cycling/calculate-cycling-trip/calculate-cycling-trip.dto';
import { Guard } from '../../../../core/common/logic/guard';
import { Result } from '../../../../core/common/logic/result';
import { Controller } from '../../common/controller';
import { Validation } from '../../common/validation';

export class CalculateCyclingTripValidation extends Validation<CalculateCyclingTripRequest> {
  public constructor() {
    super({
      latitude: 'Current latitude',
      longitude: 'Current longitude',
      cyclingSpeed: 'Cycling speed (km/h)',
      dailyCyclingHours: 'Daily cycling hours',
    });
  }

  public async validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown> {
    const requiredGuards = [
      Guard.required({
        arg: this.argumentNames.longitude,
        value: req.body.longitude,
      }),
      Guard.required({
        arg: this.argumentNames.latitude,
        value: req.body.latitude,
      }),
      Guard.required({
        arg: this.argumentNames.cyclingSpeed,
        value: req.body.cyclingSpeed,
      }),
      Guard.required({
        arg: this.argumentNames.dailyCyclingHours,
        value: req.body.dailyCyclingHours,
      }),
    ];

    const typingGuards = [
      Guard.isNumber({
        arg: this.argumentNames.longitude,
        value: req.body.longitude,
      }),
      Guard.isNumber({
        arg: this.argumentNames.latitude,
        value: req.body.latitude,
      }),
      Guard.isNumber({
        arg: this.argumentNames.cyclingSpeed,
        value: req.body.cyclingSpeed,
      }),
      Guard.isNumber({
        arg: this.argumentNames.dailyCyclingHours,
        value: req.body.dailyCyclingHours,
      }),
    ];

    const result = Result.combine(...requiredGuards, ...typingGuards);

    if (!result.success) return Controller.badRequest(res, result.getError());

    next();
  }
}
