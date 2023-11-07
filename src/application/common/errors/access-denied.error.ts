import { Result } from '../../../core/common/logic/result';

export class AccessDeniedError extends Result<unknown> {
  constructor() {
    super(false, null, `Access denied`);
  }
}
