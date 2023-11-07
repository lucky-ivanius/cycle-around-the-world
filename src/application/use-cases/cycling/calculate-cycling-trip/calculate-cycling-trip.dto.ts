import { Result } from '../../../../core/common/logic/result';
import { CalculateCyclingTripError } from './calculate-cycling-trip.error';

export interface CalculateCyclingTripRequestDto {
  userId: string;
  longitude: number;
  latitude: number;
  spotNameSlug: string;
  cyclingSpeed: number;
  dailyCyclingHours: number;
}

export interface CalculateCyclingTripResponseDto {
  distance: number;
}

export type CalculateCyclingTripRequest = CalculateCyclingTripRequestDto;
export type CalculateCyclingTripResponse =
  | CalculateCyclingTripError
  | Result<CalculateCyclingTripResponseDto>;
