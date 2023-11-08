import { UniqueId } from '../../../../core/common/domain/unique-id';
import { Result } from '../../../../core/common/logic/result';
import { Spot } from '../../../../core/entities/spot/spot';
import { SpotsRepository } from '../../../../core/repositories/spots.repository';
import { TripsRepository } from '../../../../core/repositories/trips.repository';
import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';
import { UseCase } from '../../../common/use-case/use-case';
import {
  GetCyclingEstimatedTimeRequest,
  GetCyclingEstimatedTimeRequestDto,
  GetCyclingEstimatedTimeResponse,
} from './get-cycling-estimated-time.dto';
import { NotCalculatedError } from './get-cycling-estimated-time.error';

export class GetCyclingEstimatedTimeUseCase
  implements
    UseCase<GetCyclingEstimatedTimeRequest, GetCyclingEstimatedTimeResponse>
{
  public constructor(
    private readonly tripsRepository: TripsRepository,
    private readonly spotsRepository: SpotsRepository
  ) {}

  async execute(
    data: GetCyclingEstimatedTimeRequestDto
  ): Promise<GetCyclingEstimatedTimeResponse> {
    try {
      const spot = await this.spotsRepository.getSpotByNameSlug(
        data.spotNameSlug
      );
      if (!spot) return new NotFoundError(Spot.name);

      const userId = new UniqueId(data.userId);
      const trip = await this.tripsRepository.getTripToSpotByUserId(
        userId,
        spot.id
      );

      if (!trip || !trip.distanceInKilometers)
        return new NotCalculatedError(spot.name.value);

      const estimatedHours =
        trip.distanceInKilometers.value / trip.cyclingSpeed.value;

      if (trip.dailyCyclingHours.value >= estimatedHours) {
        const estimatedArrival = estimatedHours * 60 * 60 * 1000;
        const estimatedArrivalTimestamp = new Date(
          data.fromTimestamp + estimatedArrival
        ).getTime();

        return Result.ok({
          estimatedArrivalHours: estimatedArrival / 1000 / 60 / 60,
          estimatedArrivalTimestamp,
        });
      }

      const estimatedArrival =
        (estimatedHours / trip.dailyCyclingHours.value) * 24 * 60 * 60 * 1000;
      const estimatedArrivalTimestamp = new Date(
        data.fromTimestamp + estimatedArrival
      ).getTime();

      return Result.ok({
        estimatedArrivalHours: estimatedArrival / 1000 / 60 / 60,
        estimatedArrivalTimestamp,
      });
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
