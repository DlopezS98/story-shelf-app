import IBook from "../entities/book.entity";
import RecommendedBooks from "./books.json";

export default class BooksService {
  getRecommendBooks(): Promise<IBook[]> {
    const promise = new Promise<IBook[]>((resolve) => {
      setTimeout(() => {
        resolve(RecommendedBooks);
      }, 5000);
    });
    // return Promise.resolve(RecommendedBooks);
    return promise;
  }
}