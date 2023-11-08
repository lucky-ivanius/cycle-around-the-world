import { Request, Response } from 'express';
import { GetCyclingEstimatedTimeUseCase } from '../../../../application/use-cases/cycling/get-cycling-estimated-time/get-cycling-estimated-time.use-case';
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

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
