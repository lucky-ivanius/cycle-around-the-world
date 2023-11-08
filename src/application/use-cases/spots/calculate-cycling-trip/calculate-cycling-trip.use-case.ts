import { UniqueId } from '../../../../core/common/domain/unique-id';
import { Result } from '../../../../core/common/logic/result';
import { Geolocation } from '../../../../core/entities/spot/geolocation';
import { Spot } from '../../../../core/entities/spot/spot';
import { DayHours } from '../../../../core/entities/trip/day-hours';
import { Speed } from '../../../../core/entities/trip/speed';
import { Trip } from '../../../../core/entities/trip/trip';
import { SpotsRepository } from '../../../../core/repositories/spots.repository';
import { TripsRepository } from '../../../../core/repositories/trips.repository';
import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';
import { UseCase } from '../../../common/use-case/use-case';
import { DistanceCalculationService } from '../../../services/distance-calculation.service';
import {
  CalculateCyclingTripRequest,
  CalculateCyclingTripResponse,
} from './calculate-cycling-trip.dto';
import { InaccessibleForCyclingError } from './calculate-cycling-trip.error';

export class CalculateCyclingTripUseCase
  implements UseCase<CalculateCyclingTripRequest, CalculateCyclingTripResponse>
{
  public constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly spotsRepository: SpotsRepository,
    private readonly distanceCalculationService: DistanceCalculationService
  ) {}

  async execute(
    data: CalculateCyclingTripRequest
  ): Promise<CalculateCyclingTripResponse> {
    const userGeolocationResult = Geolocation.create({
      longitude: data.longitude,
      latitude: data.latitude,
    });
    const cyclingSpeedResult = Speed.create({ value: data.cyclingSpeed });
    const dailyCyclingHoursResult = DayHours.create({
      value: data.dailyCyclingHours,
    });

    const dtoResult = Result.combine(
      userGeolocationResult,
      cyclingSpeedResult,
      dailyCyclingHoursResult
    );
    if (!dtoResult.success) return dtoResult;

    try {
      const spot = await this.spotsRepository.getSpotByNameSlug(
        data.spotNameSlug
      );
      if (!spot) return new NotFoundError(Spot.name);

      if (!spot.cyclingAccessibility)
        return new InaccessibleForCyclingError(spot.name.value);

      const distanceInKilometers =
        await this.distanceCalculationService.calculateInKilometers(
          userGeolocationResult.getData(),
          spot.geolocation
        );

      const userId = new UniqueId(data.userId);

      const tripResult = Trip.create({
        userId,
        spotId: spot.id,
        cyclingSpeed: cyclingSpeedResult.getData(),
        dailyCyclingHours: dailyCyclingHoursResult.getData(),
        distanceInKilometers,
      });

      if (!tripResult.success) return tripResult;

      await this.tripsRepository.save(tripResult.getData());

      return Result.ok({
        distance: distanceInKilometers.value,
      });
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
