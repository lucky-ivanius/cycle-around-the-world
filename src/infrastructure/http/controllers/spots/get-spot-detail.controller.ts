import { Request, Response } from 'express';
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

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
