import RecommendedBooks from "./books.json";
import Categories from "./base-categories.json";
import SfApiBookDto from "../dtos/sfapi-book.dto";
import ICategory from "../entities/category.entity";
import Environment from "../../../config/environment";
import SfApiQueryResult from "../dtos/sfapi-query-result.dto";
import BookDto, { ImageLinks } from "../dtos/google-book.dto";
import IBook, { IBookImageLinks } from "../entities/book.entity";
import GoogleApisResponseDto from "../dtos/google-apis-response.dto";
import { IQueryResult, PaginationOptions } from "../types/common.type";

export default class BooksService {
  private readonly environment = Environment.getInstance();
  // private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';

  constructor() {
    this.getCategories = this.getCategories.bind(this);
    this.getRecommendBooks = this.getRecommendBooks.bind(this);
    this.search = this.search.bind(this);
    this.mapBook = this.mapBook.bind(this);
    this.mapImageLinks = this.mapImageLinks.bind(this);
  }
  
  getRecommendBooks(): Promise<IBook[]> {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(() => {
        resolve(RecommendedBooks);
      }, 2000);
    });
    // return Promise.resolve(RecommendedBooks);
    return promise;
  }
  
  async getCategories(): Promise<ICategory[]> {
    const category: ICategory = { id: "0", name: "All", books: 0, description: "" };
    const categories = Categories.map((category) => ({ ...category, books: 0, description: '' } as ICategory));
    const mergedCategories = [category, ...categories];
    // Sort categories by name
    return mergedCategories.sort((a, b) => a.name.localeCompare(b.name));
    
    // const normalizeCategory = (name: string) => name.toLowerCase().replace(/ /g, '+');
    // const categoryMap = async (category: ICategory) => {
    //   const categoryName = normalizeCategory(category.name);
    //   const url = `${this.baseUrl}?q=+subject:${categoryName}&maxResults=1`;
    //   const response = await fetch(url);
    //   const json = await response.json() as GoogleApisResponseDto<BookDto>;
    //   return { category, response: json };
    // };
    
    // const promises = categories.map(categoryMap);
    // const values = await Promise.all(promises);//.then((p) => p.map(({ category, response }) => this.mapCategory(category, response)));
    // const mappedCategories = values.map(({ category, response }) => this.mapCategory(category, response));
    // mappedCategories.unshift(category);
    // return mappedCategories;
  }
  
  private mapCategory(category: ICategory, response: GoogleApisResponseDto<BookDto>): ICategory {
    return {
      ...category,
      books: response.totalItems,
      description: ""
    };
  }

  // async search(options: PaginationOptions): Promise<IQueryResult<IBook>> {
  //   const query = options.search;
  //   const category = options.category;
  //   const sortBy = options.sortBy;
  //   const limit = options.limit;
  //   const offset = options.offset;

  //   const url = `${this.baseUrl}?q=${query}+subject:${category}&orderBy=${sortBy}&maxResults=${limit}&startIndex=${offset}`;
  //   const response = await fetch(url);
  //   const json = await response.json() as GoogleApisResponseDto<BookDto>;
  //   const queryResult: IQueryResult<IBook> = {
  //     items: json.items.map(this.mapBook),
  //     totalCount: json.totalItems
  //   };

  //   return queryResult;
  // }  
  
  async search(options: PaginationOptions): Promise<IQueryResult<IBook>> {
    const query = options.search;
    const category = options.category;
    const limit = options.limit;
    const offset = options.offset;

    const baseUrl = this.environment.baseApiUrl;
    const booksUrl = this.environment.booksEndpoint;
    const url = `${baseUrl}/${booksUrl}?search=${query}&category=${category}&offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    const json = await response.json() as SfApiQueryResult<SfApiBookDto>;
    const queryResult: IQueryResult<IBook> = {
      items: json.items.map(this.fromSfApiBook),
      totalCount: json.totalCount
    };

    return queryResult;
  }

  private mapBook(book: BookDto): IBook {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      categories: book.volumeInfo.categories,
      description: book.volumeInfo.description,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      publisher: book.volumeInfo.publisher,
      subtitle: book.volumeInfo.subtitle,
      country: book.accessInfo.country,
      epubAvailable: book.accessInfo.epub.isAvailable,
      etag: book.etag,
      imageLinks: this.mapImageLinks(book.volumeInfo.imageLinks),
      industryIdentifiers: book.volumeInfo.industryIdentifiers ?? [],
      kind: book.kind,
      language: book.volumeInfo.language,
      previewLink: book.volumeInfo.previewLink,
      selfLink: book.selfLink,
      viewability: book.accessInfo.viewability
    };
  }

  private mapImageLinks(imageLinks: ImageLinks | null): IBookImageLinks {
    return {
      smallThumbnail: imageLinks?.smallThumbnail || '',
      thumbnail: imageLinks?.thumbnail || '',
      extraLarge: imageLinks?.extraLarge || '',
      large: imageLinks?.large || '',
      medium: imageLinks?.medium || '',
      small: imageLinks?.small || ''
    };
  }

  private fromSfApiBook(book: SfApiBookDto): IBook {
    return {
      id: book.id,
      title: book.title,
      authors: book.authors,
      categories: book.categories,
      description: book.description,
      pageCount: book.pageCount,
      publishedDate: String(book.publishedDate),
      publisher: book.publisher,
      subtitle: book.subtitle,
      country: book.country,
      epubAvailable: book.epubAvailable,
      etag: book.etag,
      imageLinks: {
        smallThumbnail: book.imageLinks.smallThumbnail || '',
        thumbnail: book.imageLinks.thumbnail || '',
        extraLarge: book.imageLinks.extraLarge || '',
        large: book.imageLinks.large || '',
        medium: book.imageLinks.medium || '',
        small: book.imageLinks.small || ''
      },
      industryIdentifiers: book.industryIdentifiers,
      kind: book.kind,
      language: book.language,
      previewLink: book.previewLink,
      selfLink: book.selfLink,
      viewability: book.viewability
    };
  }
}