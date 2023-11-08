import { UniqueId } from '../../../../../core/common/domain/unique-id';
import { getAuthServiceMock } from '../../../../__mocks__/auth.service.mock';
import { getSessionServiceMock } from '../../../../__mocks__/session.service.mock';
import { LoginRequest } from '../login.dto';
import { InvalidCredentialError } from '../login.error';
import { LoginUseCase } from '../login.use-case';

describe('LoginUseCase', () => {
  let loginRequest: LoginRequest;

  describe('execute', () => {
    beforeEach(() => {
      loginRequest = {
        username: 'username',
        password: 'password',
      };
    });

    it('should login and provide access token successfully', async () => {
      const useCaseResult = {
        accessToken: 'token',
      };

      const authService = getAuthServiceMock({
        authenticate: jest.fn().mockResolvedValue({
          id: new UniqueId(),
          username: 'username',
        }),
      });
      const sessionService = getSessionServiceMock({
        createSession: jest.fn().mockResolvedValue('token'),
      });

      const useCase = new LoginUseCase(authService, sessionService);

      const result = await useCase.execute(loginRequest);

      expect(authService.authenticate).toHaveBeenCalledTimes(1);
      expect(sessionService.createSession).toHaveBeenCalledTimes(1);

      expect(result.success).toBeTruthy();
      expect(result.getData()).toEqual(useCaseResult);
    });

    it('should fail for invalid credential', async () => {
      const authService = getAuthServiceMock();
      const sessionService = getSessionServiceMock();

      const useCase = new LoginUseCase(authService, sessionService);

      const result = await useCase.execute(loginRequest);

      expect(authService.authenticate).toHaveBeenCalledTimes(1);
      expect(sessionService.createSession).not.toHaveBeenCalled();

      expect(result).toBeInstanceOf(InvalidCredentialError);
      expect(result.success).toBeFalsy();
    });
  });
});
