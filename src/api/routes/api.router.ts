import { Router } from 'express';
import { authRouter } from './v1/auth.router';
import { spotsRouter } from './v1/spots.router';

const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/spots', spotsRouter);

export { v1Router };
