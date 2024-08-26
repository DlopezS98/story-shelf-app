import React from 'react';
import { Backdrop, Box, CircularProgress, Divider, Typography } from '@mui/material';

import ItemCard from './item-card';
import ItemModel from '../models/item.model';
import BookModel from '../../books/models/book.model';
import CustomModal from '../../core/components/custom-modal';
import BookDetails from '../../core/components/book-details';
import useWishListItems from '../hooks/use-wish-list-items';
import BooksService from '../../core/services/books.service';
import WishListsService from '../../core/services/wish-lists.service';

export default function WishList() {
  const booksService = new BooksService();
  const wishListService = new WishListsService();

  const [showLoader, setShowLoader] = React.useState(false);
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(null);
  const [open, setOpen] = React.useState(false);
  const { result, isLoading } = useWishListItems();
  const items = result.value || [];
  // const [items, setItems] = React.useState<ItemModel[]>(result.value || []);

  const LoadingIndicator = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="secondary" />
        <Box>
          <Typography>Loading...</Typography>
        </Box>
      </Box>
    );
  };

  const handleItemClick = async (item: ItemModel) => {
    setShowLoader(true);
    const bookEntity = await booksService.getById(item.bookId);
    setSelectedBook(BookModel.fromEntity(bookEntity));
    setShowLoader(false);
    setOpen(true);
  };

  const handleRemoveItem = async (item: ItemModel) => {
    setShowLoader(true);
    await wishListService.removeItem(item.id);
    items.splice(items.findIndex((i) => i.id === item.id), 1);
    setShowLoader(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ItemsLayout = () => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onBookClick={() => handleItemClick(item)}
            onRemoveClick={handleRemoveItem}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography marginBottom={2} variant="h3">
        Wish List
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{isLoading ? <LoadingIndicator /> : <ItemsLayout />}</Box>

      <CustomModal open={open} onClose={() => {}} handleClose={handleClose}>
        {selectedBook ? <BookDetails book={selectedBook} /> : null}
      </CustomModal>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showLoader}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Box>
  );
}
