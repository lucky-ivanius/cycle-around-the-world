import { SpotsRepository } from '../repositories/spots.repository';

export function getSpotsRepositoryMock(
  custom?: Partial<SpotsRepository>
): SpotsRepository {
  return {
    getSpotById: jest.fn(),
    getSpotByNameSlug: jest.fn(),
    getSpots: jest.fn(),
    ...custom,
  };
}
