import React from "react";

import BookModel from "../models/book.model";
import IBook from "../../core/entities/book.entity";
import BooksService from "../../core/services/books.service";

const booksService = new BooksService();

export default function useRecommendedBooks() {
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [books, setBooks] = React.useState<BookModel[]>([]);

  React.useEffect(() => {
    setLoading(true);
    booksService.getRecommendBooks()
      .then((books: IBook[]) => {
        const bookModels = books.map((book: IBook) => BookModel.fromEntity(book));
        setBooks(bookModels);
      })
      .catch((error: any) => {
        console.error(error);
      })
      .finally(() => setLoading(false))
  }, []);

  return { isLoading, books };
}