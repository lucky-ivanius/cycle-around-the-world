import { Result } from '../../../../core/common/logic/result';
import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';

export class InaccessibleForCyclingError extends Result<unknown> {
  constructor(name: string) {
    super(false, null, `${name} is not accessible for cycling`);
  }
}

export type CalculateCyclingTripError =
  | InaccessibleForCyclingError
  | NotFoundError
  | UnexpectedError;
