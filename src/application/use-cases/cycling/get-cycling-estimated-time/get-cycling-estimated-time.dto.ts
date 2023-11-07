import { Result } from '../../../../core/common/logic/result';
import { GetCyclingEstimatedTimeError } from './get-cycling-estimated-time.error';

export interface GetCyclingEstimatedTimeRequestDto {
  userId: string;
  spotNameSlug: string;
  fromTimestamp: number;
}

export interface GetCyclingEstimatedTimeResponseDto {
  estimatedArrivalTimestamp: number;
}

export type GetCyclingEstimatedTimeRequest = GetCyclingEstimatedTimeRequestDto;
export type GetCyclingEstimatedTimeResponse =
  | GetCyclingEstimatedTimeError
  | Result<GetCyclingEstimatedTimeResponseDto>;
