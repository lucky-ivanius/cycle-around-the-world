import { UniqueId } from '../../../../core/common/domain/unique-id';
import { Result } from '../../../../core/common/logic/result';
import { Spot } from '../../../../core/entities/spot/spot';
import { SpotsRepository } from '../../../../core/repositories/spots.repository';
import { TripsRepository } from '../../../../core/repositories/trips.repository';
import { NotFoundError } from '../../../common/errors/not-found.error';
import { UnexpectedError } from '../../../common/errors/unexpected.error';
import { UseCase } from '../../../common/use-case/use-case';
import {
  GetSpotDetailRequest,
  GetSpotDetailResponse,
} from './get-spot-detail.dto';

export class GetSpotDetailUseCase
  implements UseCase<GetSpotDetailRequest, GetSpotDetailResponse>
{
  public constructor(
    private readonly spotsRepository: SpotsRepository,
    private readonly tripsRepository: TripsRepository
  ) {}

  async execute(data: GetSpotDetailRequest): Promise<GetSpotDetailResponse> {
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

      return Result.ok({
        id: spot.id.toString(),
        name: spot.name.value,
        slug: spot.name.slug,
        longitude: spot.geolocation.longitude,
        latitude: spot.geolocation.latitude,
        cyclingAccessibility: spot.cyclingAccessibility,
        distanceInKilometers: trip?.distanceInKilometers?.value,
      });
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
