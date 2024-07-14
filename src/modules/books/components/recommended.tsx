import * as React from 'react';

import useRecommendedBooks from '../hooks/use-recommended-books';

export default function Recommended() {
  const { isLoading, books } = useRecommendedBooks();

  return (
    <div>
      Recommended
      {
        isLoading
          ? <div>Loading...</div>
          : books.length === 0
            ? <div>No books</div>
            : <div># of Books: {books.length} </div>
      }
    </div>
  );
}