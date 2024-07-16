import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import BookModel from '../../books/models/book.model';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';

export interface BookDetailsProps {
  book: BookModel;
}

const BookDetails: React.FC<BookDetailsProps> = (props) => {
  const { book } = props;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}></Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="subtitle1">{book.authors}</Typography>
        </Box>
      </Box>
      <Divider sx={{ mb: 2, mt: 2 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>...</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Button sx={{ borderRadius: 12 }} variant="contained" color='secondary' endIcon={<ArrowOutwardIcon />}>
                Start Reading
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}></Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, gap: 2 }}>
              <IconButton sx={{ backgroundColor: '#282c34' }} color="secondary" aria-label="add to wishlist">
                <BookmarkIcon />
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
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1" align='justify'>{book.description}</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'center' }}>
            <Typography variant="h6">Details</Typography>
            <Typography variant="body1">Pages: {book.pageCount}</Typography>
            <Typography variant="body1">Language: {book.language}</Typography>
            <Typography variant="body1">Identifiers:</Typography>
            {
              book.industryIdentifiers.map((identifier) => (
                <Typography sx={{ marginLeft: 2 }} key={identifier.type} variant="body1">{identifier.type}: {identifier.identifier}</Typography>
              ))
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;