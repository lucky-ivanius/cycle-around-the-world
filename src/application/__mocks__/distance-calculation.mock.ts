import { DistanceCalculationService } from '../services/distance-calculation.service';

export function getDistanceCalculationServiceMock(
  custom?: Partial<DistanceCalculationService>
): DistanceCalculationService {
  return {
    calculateInKilometers: jest.fn(),
    ...custom,
  };
}
