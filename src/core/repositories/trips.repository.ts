import { UniqueId } from '../common/domain/unique-id';
import { Distance } from '../entities/trip/distance';
import { Trip } from '../entities/trip/trip';

export interface TripsRepository {
  getTripToSpotByUserId(userId: UniqueId, spotId: UniqueId): Promise<Trip>;
  save(trip: Trip): Promise<void>;
  setDistance(tripId: UniqueId, distance: Distance): Promise<void>;
}
