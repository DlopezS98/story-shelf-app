export default class Result<TValue> {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly value: TValue | null,
  ) {}

  static success<TValue>(value: TValue): Result<TValue> {
    return new Result<TValue>(true, '', value);
  }

  static fail<TValue>(message: string): Result<TValue> {
    return new Result<TValue>(false, message, null);
  }
}
