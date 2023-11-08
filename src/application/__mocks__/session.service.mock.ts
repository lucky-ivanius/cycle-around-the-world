import { SessionService } from '../services/session.service';

export function getSessionServiceMock(
  custom?: Partial<SessionService>
): SessionService {
  return {
    isSessionActive: jest.fn(),
    getSessionUserId: jest.fn(),
    clearAllSession: jest.fn(),
    createSession: jest.fn(),
    removeSession: jest.fn(),
    ...custom,
  };
}
