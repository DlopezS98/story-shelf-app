import IBook from "../entities/book.entity";
import ICategory from "../entities/category.entity";

import RecommendedBooks from "./books.json";
import BookDto from "../dtos/google-book.dto";
import Categories from "./base-categories.json";
import GoogleApisResponseDto from "../dtos/google-apis-response.dto";
import { IQueryResult, PaginationOptions } from "../types/common.type";

export default class BooksService {
  private readonly baseUrl = 'https://www.googleapis.com/books/v1/volumes';
  
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
    
    const normalizeCategory = (name: string) => name.toLowerCase().replace(/ /g, '+');
    const categoryMap = async (category: ICategory) => {
      const categoryName = normalizeCategory(category.name);
      const url = `${this.baseUrl}?q=+subject:${categoryName}&maxResults=1`;
      const response = await fetch(url);
      const json = await response.json() as GoogleApisResponseDto<BookDto>;
      return { category, response: json };
    };
    
    const promises = categories.map(categoryMap);
    const values = await Promise.all(promises);//.then((p) => p.map(({ category, response }) => this.mapCategory(category, response)));
    const mappedCategories = values.map(({ category, response }) => this.mapCategory(category, response));
    mappedCategories.unshift(category);
    return mappedCategories;
  }
  
  private mapCategory(category: ICategory, response: GoogleApisResponseDto<BookDto>): ICategory {
    return {
      ...category,
      books: response.totalItems,
      description: ""
    };
  }

  async search(options: PaginationOptions): Promise<IQueryResult<IBook>> {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return Promise.resolve({ items: [], totalCount: 0 });
  }
}