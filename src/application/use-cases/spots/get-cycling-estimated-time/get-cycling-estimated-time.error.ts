import { Result } from '../../../../core/common/logic/result';
import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';

export class NotCalculatedError extends Result<unknown> {
  constructor(name: string) {
    super(
      false,
      null,
      `The distance for the trip to ${name} hasn't been calculated.`
    );
  }
}

export type GetCyclingEstimatedTimeError =
  | NotCalculatedError
  | NotFoundError
  | UnexpectedError;
