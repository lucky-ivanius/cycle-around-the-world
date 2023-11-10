import { NextFunction, Request, Response } from 'express-serve-static-core';

export type ArgumentName<TProps = object> = {
  [Key in keyof TProps]?: string;
};

export abstract class Validation<T = object> {
  protected readonly argumentNames: Required<ArgumentName<T>>;

  private setArgumentNames(
    argumentNames: ArgumentName<T>
  ): Required<ArgumentName<T>> {
    return argumentNames as Required<ArgumentName<T>>;
  }

  protected constructor(argumentNames: ArgumentName<T>) {
    this.argumentNames = this.setArgumentNames(argumentNames);
  }

  abstract validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown>;
}
