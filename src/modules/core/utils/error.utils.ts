export default class ErrorUtils {
  static getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;

    return 'An error occurred';
  }
}
