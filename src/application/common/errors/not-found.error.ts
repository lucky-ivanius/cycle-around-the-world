import { Result } from '../../../core/common/logic/result';

export class NotFoundError extends Result<unknown> {
  constructor(model: string, arg?: unknown) {
    super(
      false,
      null,
      !!arg ? `${model} (${arg}) was not found` : `${model} was not found`
    );
  }
}
