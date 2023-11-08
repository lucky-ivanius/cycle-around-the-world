import { getSpotsRepositoryMock } from '../../../../../core/__mocks__/spots.repository.mock';
import { GetSpotsResponseDto } from '../get-spots.dto';
import { GetSpotsUseCase } from '../get-spots.use-case';

describe('GetSpotsUseCase', () => {
  describe('execute', () => {
    it('should return spots list', async () => {
      const spots = [];

      const useCaseResult: GetSpotsResponseDto = {
        spots,
      };

      const spotsRepository = getSpotsRepositoryMock({
        getSpots: jest.fn().mockResolvedValue(spots),
      });

      const useCase = new GetSpotsUseCase(spotsRepository);

      const result = await useCase.execute();

      expect(spotsRepository.getSpots).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });
  });
});
