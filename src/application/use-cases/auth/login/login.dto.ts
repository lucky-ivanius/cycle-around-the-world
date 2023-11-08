import { Result } from '../../../../core/common/logic/result';
import { LoginError } from './login.error';

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: number;
}

export type LoginRequest = LoginRequestDto;
export type LoginResponse = LoginError | Result<LoginResponseDto>;
