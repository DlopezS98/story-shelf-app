export default interface SfApiQueryResult<T> {
  totalCount: number;
  items: T[];
}
