import { PrismaClient } from '@prisma/client';
import { createClient } from '@redis/client';
import { LoginUseCase } from '../../application/use-cases/auth/login/login.use-case';
import { CalculateCyclingTripUseCase } from '../../application/use-cases/spots/calculate-cycling-trip/calculate-cycling-trip.use-case';
import { GetCyclingEstimatedTimeUseCase } from '../../application/use-cases/spots/get-cycling-estimated-time/get-cycling-estimated-time.use-case';
import { GetSpotDetailUseCase } from '../../application/use-cases/spots/get-spot-detail/get-spot-detail.use-case';
import { GetSpotsUseCase } from '../../application/use-cases/spots/get-spots/get-spots.use-case';
import { JwtTokenService } from '../auth/jwt-token.service';
import { PrismaAuthService } from '../auth/prisma-auth.service';
import { RedisSessionService } from '../auth/redis-session.service';
import { HarversineDistanceCalculation } from '../calculation/harversine-distance-calculation.service';
import { jwtConfig } from '../config/jwt.config';
import { redisConfig } from '../config/redis.config';
import { PrismaSpotsRepository } from '../database/repositories/prisma-spots.repository';
import { PrismaTripsRepository } from '../database/repositories/prisma-trips.repository';
import { PrismaUsersRepository } from '../database/repositories/prisma-users.repository';
import { BcryptHashingService } from '../hashing/bcrypt-hashing.service';
import { LoginController } from '../http/controllers/auth/login.controller';
import { CalculateCyclingTripController } from '../http/controllers/spots/calculate-cycling-trip.controller';
import { GetCyclingEstimatedTimeController } from '../http/controllers/spots/get-cycling-estimated-time';
import { GetSpotDetailController } from '../http/controllers/spots/get-spot-detail.controller';
import { GetSpotsController } from '../http/controllers/spots/get-spots.controller';
import { AuthMiddleware } from '../http/middlewares/auth.middleware';
import { CalculateCyclingTripValidation } from '../http/validations/spots/calculate-cycling-trip.validation';

// External
export const prismaClient = new PrismaClient();
export const redisClient = createClient({
  url: redisConfig.url,
});

redisClient.connect();

// Repositories
export const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
export const prismaSpotsRepository = new PrismaSpotsRepository(prismaClient);
export const prismaTripsRepository = new PrismaTripsRepository(prismaClient);

// Services
export const bcryptHashingService = new BcryptHashingService();
export const prismaAuthService = new PrismaAuthService(
  prismaClient,
  bcryptHashingService
);
export const jwtTokenService = new JwtTokenService(jwtConfig.secretKey);
export const redisSessionService = new RedisSessionService(
  redisClient,
  jwtTokenService
);
export const harversineDistanceCalculation =
  new HarversineDistanceCalculation();

// Use Cases
export const loginUseCase = new LoginUseCase(
  prismaAuthService,
  redisSessionService
);
export const getSpotDetailUseCase = new GetSpotDetailUseCase(
  prismaSpotsRepository,
  prismaTripsRepository
);
export const getSpotsUseCase = new GetSpotsUseCase(prismaSpotsRepository);
export const calculateCyclingTripUseCase = new CalculateCyclingTripUseCase(
  prismaTripsRepository,
  prismaSpotsRepository,
  harversineDistanceCalculation
);
export const getCyclingEstimatedTimeUseCase =
  new GetCyclingEstimatedTimeUseCase(
    prismaTripsRepository,
    prismaSpotsRepository
  );

// Middlewares
export const authMiddleware = new AuthMiddleware(redisSessionService);

// Validations
export const calculateCyclingTripValidation =
  new CalculateCyclingTripValidation();

// Controllers
export const loginController = new LoginController(loginUseCase);
export const getSpotDetailController = new GetSpotDetailController(
  getSpotDetailUseCase
);
export const getSpotsController = new GetSpotsController(getSpotsUseCase);
export const calculateCyclingTripController =
  new CalculateCyclingTripController(calculateCyclingTripUseCase);
export const getCyclingEstimatedTimeController =
  new GetCyclingEstimatedTimeController(getCyclingEstimatedTimeUseCase);
