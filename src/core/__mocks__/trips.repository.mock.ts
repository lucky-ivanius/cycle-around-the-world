import { TripsRepository } from '../repositories/trips.repository';

export function getTripsRepositoryMock(
  custom?: Partial<TripsRepository>
): TripsRepository {
  return {
    getTripToSpotByUserId: jest.fn(),
    save: jest.fn(),
    setDistance: jest.fn(),
    ...custom,
  };
}
