import BooksService from "./books.service";
import BookModel from "../../books/models/book.model";
import { PaginationOptions } from "../types/common.type";

export default class BooksPaginationService {
  private books: BookModel[] = [];
  private currentPage = 0;
  private totalPages = 0;
  private isLoading = false;
  private currentSearch = '';
  private currentCategory = 'All';
  private currentSortBy = 'Relevance';
  private totalCount = 0;
  
  get hasMore(): boolean {
    return this.currentPage !== this.totalPages;
  };

  constructor(
    private readonly booksService: BooksService,
    private readonly limit: number
  ) {
    this.reset = this.reset.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  static getInstance(limit: number = 30): BooksPaginationService {
    const booksService = new BooksService();
    return new BooksPaginationService(booksService, limit);
  }

  private async paginate(options: PaginationOptions): Promise<BookModel[]> {
    const query = await this.booksService.search(options);
    const books = query.items.map(BookModel.fromEntity);
    this.totalPages = Math.ceil(query.totalCount / this.limit);
    this.totalCount = query.totalCount;
    return books;
  }

  public async loadNextPage(): Promise<void> {
    if (!this.canLoadNextPage()) return;

    this.isLoading = true;
    const options: PaginationOptions = {
      limit: this.limit,
      offset: this.currentPage * this.limit,
      category: this.currentCategory,
      search: this.currentSearch,
      sortBy: this.currentSortBy
    };

    const books = await this.paginate(options);
    this.books.push(...books);
    this.currentPage++;
    this.isLoading = false;
  }

  public canLoadNextPage(): boolean {
    return !this.isLoading && (this.hasMore || this.currentPage === 0);
  }

  public getBooks(): BookModel[] {
    return this.books;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public getTotalPages(): number {
    return this.totalPages;
  }

  public isLoadingBooks(): boolean {
    return this.isLoading;
  }

  public hasMoreBooks(): boolean {
    return this.hasMore;
  }

  public setSearch(search: string): void {
    this.currentSearch = search;
    this.currentPage = 0;
    this.loadNextPage();
  }

  public setCategory(category: string): void {
    this.currentCategory = category;
    this.currentPage = 0;
    this.loadNextPage();
  }

  public setSortBy(sortBy: string): void {
    this.currentSortBy = sortBy;
    this.currentPage = 0;
    this.loadNextPage();
  }

  public reset(): void {
    this.books = [];
    this.currentPage = 0;
    this.totalPages = 0;
    this.isLoading = false;
    this.currentSearch = '';
    this.currentCategory = 'All';
    this.currentSortBy = 'Relevance';
    this.totalCount = 0;
  }
}