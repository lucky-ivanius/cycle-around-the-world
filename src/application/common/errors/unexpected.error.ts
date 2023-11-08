import { Result } from '../../../core/common/logic/result';

export class UnexpectedError extends Result<unknown> {
  constructor(err: unknown) {
    console.error(err);
    super(false, err, 'An unexpected error occured');
  }
}
