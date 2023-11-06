import { Result } from './result';

export interface GuardOption<T = unknown> {
  arg: string;
  value: T;
  errorMessage?: string;
}

export interface GuardContainsOption<T> extends GuardOption<T> {
  validValues: Readonly<T[]>;
}

export interface GuardLengthOption extends GuardOption<string> {
  length: number;
}

export interface GuardNumberOption extends GuardOption<number> {
  compareTo: number;
}

export interface GuardRegexOption extends GuardOption<string> {
  regex: RegExp;
}

export class Guard {
  private static isValid(value: unknown): boolean {
    if (value === null || value === undefined || value === '') return false;

    return true;
  }

  public static required<T>(option: GuardOption<T>): Result<T> {
    if (!this.isValid(option.value))
      return Result.fail(option.errorMessage ?? `${option.arg} is required`);

    return Result.ok<T>(option.value as T);
  }

  public static contains<T>(option: GuardContainsOption<T>): Result<T> {
    if (
      this.isValid(option.value) &&
      !option.validValues.includes(option.value)
    )
      return Result.fail(option.errorMessage ?? `Invalid ${option.arg}`);

    return Result.ok(option.value);
  }

  public static match(option: GuardRegexOption): Result<string> {
    if (this.isValid(option.value) && !option.regex.test(option.value))
      return Result.fail(option.errorMessage ?? `Invalid ${option.arg}`);

    return Result.ok(option.value);
  }

  public static minLength(option: GuardLengthOption): Result<string> {
    if (this.isValid(option.value) && option.value.length < option.length)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be at least ${option.length} characters`
      );

    return Result.ok(option.value);
  }

  public static maxLength(option: GuardLengthOption): Result<string> {
    if (this.isValid(option.value) && option.value.length > option.length)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must not exceed ${option.length} characters`
      );

    return Result.ok(option.value);
  }

  public static equal(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value !== option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be equal to ${option.compareTo}`
      );

    return Result.ok(option.value);
  }

  public static notEqual(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value === option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must not be equal to ${option.compareTo}`
      );

    return Result.ok(option.value);
  }

  public static greaterThan(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value <= option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be greater than ${option.compareTo}`
      );

    return Result.ok(option.value);
  }

  public static greaterThanOrEqual(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value < option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be greater than or equal to ${option.compareTo}`
      );

    return Result.ok(option.value);
  }

  public static lessThan(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value >= option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be less than ${option.compareTo}`
      );

    return Result.ok(option.value);
  }

  public static lessThanOrEqual(option: GuardNumberOption): Result<number> {
    if (this.isValid(option.value) && option.value > option.compareTo)
      return Result.fail(
        option.errorMessage ??
          `${option.arg} must be less than or equal to ${option.compareTo}`
      );

    return Result.ok(option.value);
  }
}
