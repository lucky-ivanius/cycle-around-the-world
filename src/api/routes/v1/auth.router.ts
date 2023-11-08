import { Router } from 'express';
import { loginController } from '../../../infrastructure/di/container';

const authRouter = Router();

authRouter.post('/login', async (req, res) =>
  loginController.execute(req, res)
);

export { authRouter };
