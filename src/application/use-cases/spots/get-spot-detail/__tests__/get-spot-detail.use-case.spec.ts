import { getSpotsRepositoryMock } from '../../../../../core/__mocks__/spots.repository.mock';
import { getTripsRepositoryMock } from '../../../../../core/__mocks__/trips.repository.mock';
import { UniqueId } from '../../../../../core/common/domain/unique-id';
import { Geolocation } from '../../../../../core/entities/spot/geolocation';
import { Name } from '../../../../../core/entities/spot/name';
import { Spot } from '../../../../../core/entities/spot/spot';
import { DayHours } from '../../../../../core/entities/trip/day-hours';
import { Distance } from '../../../../../core/entities/trip/distance';
import { Speed } from '../../../../../core/entities/trip/speed';
import { Trip } from '../../../../../core/entities/trip/trip';
import { NotFoundError } from '../../../../common/errors/not-found.error';
import {
  GetSpotDetailRequest,
  GetSpotDetailResponseDto,
} from '../get-spot-detail.dto';
import { GetSpotDetailUseCase } from '../get-spot-detail.use-case';

describe('GetSpotDetailUseCase', () => {
  let getSpotDetailRequest: GetSpotDetailRequest;
  let spot: Spot;
  let trip: Trip;

  describe('execute', () => {
    beforeEach(() => {
      getSpotDetailRequest = {
        userId: '1234',
        spotNameSlug: 'spot-name',
      };
      spot = Spot.create({
        name: Name.create({ value: 'name', slug: 'slug' }).getData(),
        geolocation: Geolocation.create({
          longitude: 0,
          latitude: 0,
        }).getData(),
        cyclingAccessibility: true,
      }).getData();
      trip = Trip.create({
        userId: new UniqueId(),
        spotId: new UniqueId(),
        cyclingSpeed: Speed.create({ value: 1 }).getData(),
        dailyCyclingHours: DayHours.create({ value: 1 }).getData(),
        distanceInKilometers: Distance.create({ value: 1 }).getData(),
      }).getData();
    });

    it('should return given spot detail', async () => {
      const useCaseResult: GetSpotDetailResponseDto = {
        id: spot.id.toString(),
        name: spot.name.value,
        slug: spot.name.slug,
        longitude: spot.geolocation.longitude,
        latitude: spot.geolocation.latitude,
        cyclingAccessibility: spot.cyclingAccessibility,
        distanceInKilometers: trip.distanceInKilometers?.value,
      };

      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue(spot),
      });
      const tripsRepository = getTripsRepositoryMock({
        getTripToSpotByUserId: jest.fn().mockResolvedValue(trip),
      });

      const useCase = new GetSpotDetailUseCase(
        spotsRepository,
        tripsRepository
      );

      const result = await useCase.execute(getSpotDetailRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });

    it("should fail if spot wasn't found", async () => {
      const spotsRepository = getSpotsRepositoryMock({
        getSpotByNameSlug: jest.fn().mockResolvedValue(null),
      });
      const tripsRepository = getTripsRepositoryMock();

      const useCase = new GetSpotDetailUseCase(
        spotsRepository,
        tripsRepository
      );

      const result = await useCase.execute(getSpotDetailRequest);

      expect(spotsRepository.getSpotByNameSlug).toHaveBeenCalledTimes(1);
      expect(tripsRepository.getTripToSpotByUserId).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(NotFoundError);
      expect(result.success).toBeFalsy();
    });
  });
});
