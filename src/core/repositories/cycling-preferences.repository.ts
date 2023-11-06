import { UniqueId } from '../common/domain/unique-id';
import { CyclingPreference } from '../entities/cycling-preference/cycling-preference';
import { Distance } from '../entities/cycling-preference/distance';

export interface CyclingPreferencesRepository {
  getSpotDistanceByUserId(
    spotId: UniqueId,
    userId: UniqueId
  ): Promise<CyclingPreference>;
  setDistance(preferenceId: UniqueId, distance: Distance): Promise<void>;
  setEstimatedHoursArrived(
    preferenceId: UniqueId,
    estimatedHours: number
  ): Promise<void>;
}
