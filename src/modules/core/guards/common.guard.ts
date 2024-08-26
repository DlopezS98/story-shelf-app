export default class Guard {
  static isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }
}
