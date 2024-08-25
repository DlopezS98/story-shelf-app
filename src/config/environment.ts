export default class Environment {
  private static instance: Environment;

  private constructor() {}

  static get envName(): string {
    return process.env.NODE_ENV || 'development';
  }

  static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  get isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  get isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  }

  get baseApiUrl(): string {
    return process.env.REACT_APP_BASE_API_URL || 'http://localhost:8080';
  }

  get booksEndpoint(): string {
    return process.env.REACT_APP_BOOKS_ENDPOINT || '';
  }

  get wishListEndpoint(): string {
    return process.env.REACT_APP_WISH_LIST_ENDPOINT || '';
  }
}
