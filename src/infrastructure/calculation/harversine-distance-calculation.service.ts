import { DistanceCalculationService } from '../../application/services/distance-calculation.service';
import { Geolocation } from '../../core/entities/spot/geolocation';
import { Distance } from '../../core/entities/trip/distance';

export class HarversineDistanceCalculation
  implements DistanceCalculationService
{
  private readonly earthRadiusInKilometers = 6371;

  private degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  async calculateInKilometers(
    from: Geolocation,
    to: Geolocation
  ): Promise<Distance> {
    const latitudeDelta = this.degreesToRadians(to.latitude - from.latitude);
    const longitudeDelta = this.degreesToRadians(to.longitude - from.longitude);

    const a =
      Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
      Math.cos(this.degreesToRadians(from.latitude)) *
        Math.cos(this.degreesToRadians(to.latitude)) *
        Math.sin(longitudeDelta / 2) *
        Math.sin(longitudeDelta / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKilometers = this.earthRadiusInKilometers * c;

    const distance = Distance.create({
      value: distanceInKilometers,
    }).getData();

    return distance;
  }
}
