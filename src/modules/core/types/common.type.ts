export interface IQueryResult<TItem> {
  items: TItem[];
  totalCount: number;
}

export interface PaginationOptions {
  limit: number;
  offset: number;
  search: string;
  sortBy: string;
  category: string;
}