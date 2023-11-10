import { NextFunction, Request, Response } from 'express-serve-static-core';

export abstract class Middleware {
  abstract execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown>;
}
