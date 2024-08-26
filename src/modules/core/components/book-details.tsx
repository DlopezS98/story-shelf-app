import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box, Button, CircularProgress, Divider, IconButton, Paper, Typography } from '@mui/material';

import './book-details.css';
import BookModel from '../../books/models/book.model';
import useAddToWishList from '../hooks/use-add-to-wish-list';

export interface BookDetailsProps {
  book: BookModel;
}

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { isLoading, addToWishList } = useAddToWishList();
  const { book } = props;

  const handleAddToWishList = () => {
    addToWishList(book.id);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div className="book-cover-container">
            <img className="book-cover book-shadow" src={book.image} alt={book.title} />
          </div>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="subtitle1">{book.authors}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>...</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Button sx={{ borderRadius: 12 }} variant="contained" color="secondary" endIcon={<ArrowOutwardIcon />}>
                Start Reading
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 2, justifyContent: 'end' }}>
              <IconButton
                onClick={handleAddToWishList}
                sx={{ backgroundColor: '#282c34' }}
                color="secondary"
                aria-label="add to wishlist"
              >
                {isLoading ? <CircularProgress color="secondary" size={24} /> : <BookmarkIcon />}
              </IconButton>
              <IconButton sx={{ backgroundColor: '#282c34' }} color="secondary" aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton sx={{ backgroundColor: '#282c34' }} color="secondary" aria-label="download">
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mb: 1, mt: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1" align="justify">
              {book.description}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Typography variant="h6">Details</Typography>
            <Typography variant="body1">Pages: {book.pageCount}</Typography>
            <Typography variant="body1">Language: {book.language}</Typography>
            <Typography variant="body1">Identifiers:</Typography>
            {book.industryIdentifiers.map((identifier) => (
              <Typography key={identifier.type} variant="body1">
                {identifier.type}: {identifier.identifier}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookDetails;
