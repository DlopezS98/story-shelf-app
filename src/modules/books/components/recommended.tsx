import React from 'react';

import useRecommendedBooks from '../hooks/use-recommended-books';
import { Box, Card, CardContent, Skeleton } from '@mui/material';
import CardBook from './card-book';
import BookModel from '../models/book.model';
import CustomModal from '../../core/components/custom-modal';
import BookDetails from '../../core/components/book-details';

interface BookCardSkeletonProps {
  key: number;
}

const BookCardSkeleton: React.FC<BookCardSkeletonProps> = (prop) => {
  return (
    <Card className='shadow' key={prop.key} sx={{ width: 230, height: 250 }}>
      <CardContent>
        <Skeleton variant="rectangular" width="100%" height={118} />
        <Skeleton variant="rectangular" width={30} height={15} style={{ marginTop: 10 }} />
        <Skeleton animation="wave" style={{ marginBottom: 5 }} />
        <Skeleton animation="wave" />
      </CardContent>
    </Card>
  );
};

export default function Recommended() {
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(null);
  const [open, setOpen] = React.useState(false);
  
  const { isLoading, books } = useRecommendedBooks();

  const handleBookClick = (book: BookModel) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const LoaderSkeletons = Array.from({ length: 5 }).map((_, index) => <BookCardSkeleton key={index} />);
  const BooksLayout = () => {
    return (
      <Box sx={{ display: "flex", gap: 2, overflowX: "scroll" }}>
        {
          books.map((book) => (<CardBook key={book.id} bookModel={book} onBookClick={() => handleBookClick(book)} />))
        }
      </Box>
    );
  };

  return (
    <Box>
      {
        isLoading
          ? <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>{LoaderSkeletons}</Box>
          : books.length === 0
            ? <div>No books</div>
            : <BooksLayout />
      }
      <CustomModal open={open} onClose={() => { }} handleClose={handleClose}>
        {selectedBook ? <BookDetails book={selectedBook} /> : null}
      </CustomModal>
    </Box>
  );
}