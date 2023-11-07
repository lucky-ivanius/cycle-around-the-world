import { Geolocation } from '../../core/entities/spot/geolocation';
import { Distance } from '../../core/entities/trip/distance';

export interface DistanceCalculationService {
  calculateInKilometers(from: Geolocation, to: Geolocation): Promise<Distance>;
}
