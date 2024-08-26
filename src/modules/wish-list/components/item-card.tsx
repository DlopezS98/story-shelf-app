import React from 'react';
import { DeleteOutline } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Divider, Typography } from '@mui/material';

import ItemModel from '../models/item.model';

export interface ItemCardProps {
  item: ItemModel;
  onBookClick: (item: ItemModel) => void;
  onRemoveClick: (item: ItemModel) => void;
}

const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { item, onBookClick, onRemoveClick } = props;

  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea onClick={() => onBookClick(item)}>
        <CardMedia component="img" height="300" image={item.bookCoverUrl} alt={item.bookTitle} />
      </CardActionArea>
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Typography sx={{ textAlign: 'center' }} variant="subtitle1">
          {item.bookTitle}
        </Typography>
        <Box width={'100%'}>
          <Divider sx={{ mb: 2, mt: 1 }} color="white" />
        </Box>
        <Box>
          <Button
            onClick={() => onRemoveClick(item)}
            sx={{ borderRadius: 8, color: 'white' }}
            variant="contained"
            style={{ backgroundColor: '#282c34'}}            
            startIcon={<DeleteOutline color='secondary' />}
          >
            Remove
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
