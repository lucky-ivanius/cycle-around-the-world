import { Result } from '../../../../core/common/logic/result';
import { UnexpectedError } from '../../../common/errors/unexpected.error';

export class InvalidCredentialError extends Result<unknown> {
  constructor() {
    super(false, null, `Invalid credential`);
  }
}

export type LoginError = InvalidCredentialError | UnexpectedError;
