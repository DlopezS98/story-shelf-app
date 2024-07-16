/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import BookModel from "../../books/models/book.model";
import BooksPaginationService from "../../core/services/books-pagination.service";

const booksPaginationService = BooksPaginationService.getInstance();

export default function userBooksPagination() {
  const [books, setBooks] = React.useState<BookModel[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [canLoadNextPage, setCanLoadNextPage] = React.useState<boolean>(true);

  const handleFinally = () => {
    setLoading(false); 
    setCanLoadNextPage(booksPaginationService.canLoadNextPage())
  };

  const loadNextPage = async () => {
    setLoading(true);
    // setCanLoadNextPage(false);
    booksPaginationService.loadNextPage()
      .then(() => setBooks(booksPaginationService.getBooks()))
      .catch((error: any) => console.error(error))
      .finally(handleFinally);
  };

  const setSearch = (search: string) => {
    setLoading(true);
    booksPaginationService.setSearch(search)
      .then(() => setBooks(booksPaginationService.getBooks()))
      .catch((error: any) => console.error(error))
      .finally(handleFinally);
  };

  const setCategory = (category: string) => {
    setLoading(true);
    booksPaginationService.setCategory(category)
      .then(() => setBooks(booksPaginationService.getBooks()))
      .catch((error: any) => console.error(error))
      .finally(handleFinally);
  };

  const setSortBy = (sortBy: string) => {
    setLoading(true);
    booksPaginationService.setSortBy(sortBy)
      .then(() => setBooks(booksPaginationService.getBooks()))
      .catch((error: any) => console.error(error))
      .finally(handleFinally);
  };

  React.useEffect(() => {
    loadNextPage();
  }, []);

  return {
    books, 
    isLoading, 
    canLoadNextPage, 
    loadNextPage, 
    reset: booksPaginationService.reset,
    setFilterSearch: setSearch,
    setFilterCategory: setCategory,
    setFilterSortBy: setSortBy,
  };
}