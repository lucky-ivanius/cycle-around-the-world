import { NextFunction, Request, Response } from 'express';

export abstract class Middleware {
  abstract execute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<unknown>;
}
