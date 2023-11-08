import { Router } from 'express';
import {
  authMiddleware,
  calculateCyclingTripController,
  calculateCyclingTripValidation,
  getCyclingEstimatedTimeController,
  getSpotDetailController,
  getSpotsController,
} from '../../../infrastructure/di/container';

const spotsRouter = Router();

spotsRouter.get(
  '/',
  async (req, res, next) => authMiddleware.execute(req, res, next),
  async (req, res) => getSpotsController.execute(req, res)
);

spotsRouter.get(
  '/:spotNameSlug',
  async (req, res, next) => authMiddleware.execute(req, res, next),
  async (req, res) => getSpotDetailController.execute(req, res)
);

spotsRouter.post(
  '/:spotNameSlug/calculate',
  async (req, res, next) => authMiddleware.execute(req, res, next),
  async (req, res, next) =>
    calculateCyclingTripValidation.validate(req, res, next),
  async (req, res) => calculateCyclingTripController.execute(req, res)
);

spotsRouter.post(
  '/:spotNameSlug/estimate',
  async (req, res, next) => authMiddleware.execute(req, res, next),
  async (req, res) => getCyclingEstimatedTimeController.execute(req, res)
);

export { spotsRouter };
