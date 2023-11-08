import { Result } from '../../../../core/common/logic/result';
import { SpotsRepository } from '../../../../core/repositories/spots.repository';
import { UnexpectedError } from '../../../common/errors/unexpected.error';
import { UseCase } from '../../../common/use-case/use-case';
import { GetSpotsRequest, GetSpotsResponse, SpotDto } from './get-spots.dto';

export class GetSpotsUseCase
  implements UseCase<GetSpotsRequest, GetSpotsResponse>
{
  public constructor(private readonly spotsRepository: SpotsRepository) {}

  async execute(): Promise<GetSpotsResponse> {
    try {
      const spots = await this.spotsRepository.getSpots();

      const formattedSpots: SpotDto[] = spots.map((spot) => ({
        id: spot.id.toString(),
        name: spot.name.value,
        slug: spot.name.slug,
        cyclingAccessibility: spot.cyclingAccessibility,
      }));

      return Result.ok({
        spots: formattedSpots,
      });
    } catch (error) {
      return new UnexpectedError(error);
    }
  }
}
