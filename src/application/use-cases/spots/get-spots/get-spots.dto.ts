import { Result } from '../../../../core/common/logic/result';
import { GetSpotsError } from './get-spots.error';

export interface SpotDto {
  id: string;
  name: string;
  slug: string;
  cyclingAccessibility: boolean;
}

export interface GetSpotsResponseDto {
  spots: SpotDto[];
}

export type GetSpotsRequest = null;
export type GetSpotsResponse = GetSpotsError | Result<GetSpotsResponseDto>;
