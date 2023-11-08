import { Request, Response } from 'express';
import { GetSpotsUseCase } from '../../../../application/use-cases/spots/get-spots/get-spots.use-case';
import { Controller } from '../../common/controller';

export class GetSpotsController extends Controller {
  public constructor(private readonly getSpotsUseCase: GetSpotsUseCase) {
    super();
  }

  async execute(_: Request, res: Response): Promise<unknown> {
    try {
      const result = await this.getSpotsUseCase.execute();

      return Controller.ok(res, result.getData());
    } catch (error) {
      return Controller.unexpectedError(res, error);
    }
  }
}
