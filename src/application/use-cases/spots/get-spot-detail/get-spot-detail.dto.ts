import { Result } from '../../../../core/common/logic/result';
import { GetSpotDetailError } from './get-spot-detail.error';

export interface GetSpotDetailRequestDto {
  userId: string;
  spotNameSlug: string;
}

export interface GetSpotDetailResponseDto {
  id: string;
  name: string;
  slug: string;
  longitude: number;
  latitude: number;
  cyclingAccessibility: boolean;
  distanceInKilometers?: number;
}

export type GetSpotDetailRequest = GetSpotDetailRequestDto;
export type GetSpotDetailResponse =
  | GetSpotDetailError
  | Result<GetSpotDetailResponseDto>;
