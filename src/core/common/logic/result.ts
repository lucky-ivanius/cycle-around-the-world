export class Result<TData> {
  protected constructor(
    public readonly success: boolean,
    private readonly data?: TData,
    private readonly error?: string
  ) {
    Object.freeze(this);
  }

  public getData(): TData {
    return this.data as TData;
  }

  public getError(): string {
    return this.error as string;
  }

  public static ok<TData>(data?: TData): Result<TData> {
    return new Result<TData>(true, data);
  }

  public static fail<TData>(error?: string): Result<TData> {
    return new Result<TData>(false, undefined, error);
  }

  public static combine(...results: Result<unknown>[]): Result<unknown> {
    const failedResult = results.find((result) => !result.success);
    if (failedResult) return Result.fail(failedResult.error);

    return Result.ok();
  }
}
