import { getSpotsRepositoryMock } from '../../../../../core/__mocks__/spots.repository.mock';
import { getTripsRepositoryMock } from '../../../../../core/__mocks__/trips.repository.mock';
import { UniqueId } from '../../../../../core/common/domain/unique-id';
import { getDistanceCalculationServiceMock } from '../../../../__mocks__/distance-calculation.mock';
import { NotFoundError } from '../../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../../common/errors/unexpected.error';
import { CalculateCyclingTripRequest } from '../calculate-cycling-trip.dto';
import { InaccessibleForCyclingError } from '../calculate-cycling-trip.error';
import { CalculateCyclingTripUseCase } from '../calculate-cycling-trip.use-case';

describe('CalculateCyclingTripUseCase', () => {
  let calculateCyclingTripRequest: CalculateCyclingTripRequest;

  describe('execute', () => {
    beforeEach(() => {
      calculateCyclingTripRequest = {
        userId: '1234',
        spotNameSlug: 'spot-name',
        cyclingSpeed: 10,
        dailyCyclingHours: 1,
        latitude: 0,
        longitude: 0,
      };
    });

    it('should calculate sucessfully for a valid trip', async () => {
      const useCaseResult = {
        distance: 0,
      };

      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          cyclingAccessibility: true,
        }),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock({
        calculateInKilometers: jest.fn().mockResolvedValue({
          value: useCaseResult.distance,
        }),
      });

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).toHaveBeenCalledTimes(1);
      expect(tripsRepository.save).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });

    it("should fail if spot didn't found", async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue(null),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock();

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).not.toHaveBeenCalled();
      expect(tripsRepository.save).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(NotFoundError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if spot is not accessible by cycling', async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          name: {
            value: 'Spot name',
          },
          cyclingAccessibility: false,
        }),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock();

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).not.toHaveBeenCalled();
      expect(tripsRepository.save).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(InaccessibleForCyclingError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if get spot detail was failed', async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockRejectedValue(null),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock();

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).not.toHaveBeenCalled();
      expect(tripsRepository.save).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(UnexpectedError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if distance calculation was failed', async () => {
      const tripsRepository = getTripsRepositoryMock();
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          cyclingAccessibility: true,
        }),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock({
        calculateInKilometers: jest.fn().mockRejectedValue(null),
      });

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).toHaveBeenCalledTimes(1);
      expect(tripsRepository.save).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(UnexpectedError);
      expect(result.success).toBeFalsy();
    });

    it('should fail if save trip was failed', async () => {
      const tripsRepository = getTripsRepositoryMock({
        save: jest.fn().mockRejectedValue(null),
      });
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          cyclingAccessibility: true,
        }),
      });
      const distanceCalculationService = getDistanceCalculationServiceMock({
        calculateInKilometers: jest.fn().mockResolvedValue({
          value: 0,
        }),
      });

      const useCase = new CalculateCyclingTripUseCase(
        tripsRepository,
        spotsRepository,
        distanceCalculationService
      );

      const result = await useCase.execute(calculateCyclingTripRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(
        distanceCalculationService.calculateInKilometers
      ).toHaveBeenCalledTimes(1);
      expect(tripsRepository.save).toHaveBeenCalledTimes(1);

      expect(result).toBeInstanceOf(UnexpectedError);
      expect(result.success).toBeFalsy();
    });
  });
});
