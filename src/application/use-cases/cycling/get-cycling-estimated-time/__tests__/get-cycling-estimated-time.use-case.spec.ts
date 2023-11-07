import { getSpotsRepositoryMock } from '../../../../../core/__mocks__/spots.repository.mock';
import { getTripsRepositoryMock } from '../../../../../core/__mocks__/trips.repository.mock';
import { UniqueId } from '../../../../../core/common/domain/unique-id';
import { NotFoundError } from '../../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../../common/errors/unexpected.error';
import { GetCyclingEstimatedTimeRequest } from '../get-cycling-estimated-time.dto';
import { NotCalculatedError } from '../get-cycling-estimated-time.error';
import { GetCyclingEstimatedTimeUseCase } from '../get-cycling-estimated-time.use-case';

describe('GetCyclingEstimatedTimeUseCase', () => {
  let getCyclingEstimatedTimeRequest: GetCyclingEstimatedTimeRequest;

  describe('execute', () => {
    beforeEach(() => {
      getCyclingEstimatedTimeRequest = {
        userId: '1234',
        spotNameSlug: 'spot-name',
        fromTimestamp: +new Date(),
      };
    });

    it('should calculate the estimated arrival time correctly when dailyCyclingHours are sufficient', async () => {
      const cyclingSpeed = 50;
      const dailyCyclingHours = 20;
      const distanceInKilometers = 10;

      const timeInHours = distanceInKilometers / cyclingSpeed;
      const timeInMs = timeInHours * 60 * 60 * 1000;

      const useCaseResult = {
        estimatedArrivalTimestamp:
          getCyclingEstimatedTimeRequest.fromTimestamp + timeInMs,
      };

      const tripsRepository = getTripsRepositoryMock({
        getTripToSpotByUserId: jest.fn().mockResolvedValue({
          cyclingSpeed: {
            value: cyclingSpeed,
          },
          dailyCyclingHours: {
            value: dailyCyclingHours,
          },
          distanceInKilometers: {
            value: distanceInKilometers,
          },
        }),
      });
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
        }),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });

    it('should calculate the estimated arrival time correctly when dailyCyclingHours are not sufficient', async () => {
      const cyclingSpeed = 10;
      const dailyCyclingHours = 2;
      const distanceInKilometers = 100;

      const timeInDays =
        distanceInKilometers / cyclingSpeed / dailyCyclingHours;
      const timeInMs = timeInDays * 24 * 60 * 60 * 1000;

      const useCaseResult = {
        estimatedArrivalTimestamp:
          getCyclingEstimatedTimeRequest.fromTimestamp + timeInMs,
      };

      const tripsRepository = getTripsRepositoryMock({
        getTripToSpotByUserId: jest.fn().mockResolvedValue({
          cyclingSpeed: {
            value: cyclingSpeed,
          },
          dailyCyclingHours: {
            value: dailyCyclingHours,
          },
          distanceInKilometers: {
            value: distanceInKilometers,
          },
        }),
      });
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
        }),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });

    it("should fail if spot didn't found", async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue(null),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(NotFoundError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if trip is not calculated', async () => {
      const tripsRepository = getTripsRepositoryMock({
        getTripToSpotByUserId: jest.fn().mockResolvedValue(null),
      });
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          name: {
            value: 'Spot name',
          },
          cyclingAccessibility: false,
        }),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).toHaveBeenCalledTimes(1);

      expect(result).toBeInstanceOf(NotCalculatedError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if get spot detail was failed', async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockRejectedValue(null),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(UnexpectedError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if get trip detail was failed', async () => {
      const tripsRepository = getTripsRepositoryMock({
        getTripToSpotByUserId: jest.fn().mockRejectedValue(null),
      });
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          cyclingAccessibility: true,
        }),
      });

      const useCase = new GetCyclingEstimatedTimeUseCase(
        tripsRepository,
        spotsRepository
      );

      const result = await useCase.execute(getCyclingEstimatedTimeRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).toHaveBeenCalledTimes(1);

      expect(result).toBeInstanceOf(UnexpectedError);
      expect(result.success).toBeFalsy();
    });
  });
});
