import { UniqueId } from '../common/domain/unique-id';
import { Spot } from '../entities/spot/spot';

export interface SpotsRepository {
  getSpotById(spotId: UniqueId): Promise<Spot>;
  getSpotByNameSlug(nameSlug: string): Promise<Spot>;
  getSpots(): Promise<Spot[]>;
}
