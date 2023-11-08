import { NextFunction, Request, Response } from 'express';
import { SessionService } from '../../../application/services/session.service';
import { Controller } from '../common/controller';
import { Middleware } from '../common/middleware';

export interface AuthContext {
  userId: string;
}

declare module 'express' {
  interface Request {
    auth?: AuthContext;
  }
}

export class AuthMiddleware extends Middleware {
  constructor(private readonly sessionService: SessionService) {
    super();
  }

  async execute(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.substring(7) ?? '';

      const userId = await this.sessionService.getSessionUserId(token);

      if (!userId) return Controller.unauthorized(res);

      req.auth = {
        userId,
      };

      next();
    } catch (error) {
      console.log(error);
      return Controller.unexpectedError(res, error);
    }
  }
}
