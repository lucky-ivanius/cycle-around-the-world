import { Result } from '../../../core/common/logic/result';

export class UnexpectedError extends Result<unknown> {
  constructor(err: unknown) {
    super(false, err, 'An unexpected error occured');
  }
}
