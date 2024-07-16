import React from "react";
import BookModel from "../../books/models/book.model";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

export interface DiscoverCardBookProps {
  book: BookModel;
  onBookClick: (book: BookModel) => void;
}

const DiscoverCardBook: React.FC<DiscoverCardBookProps> = (props) => {

  const { book, onBookClick } = props;

  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea onClick={() => onBookClick(book)}>
        <CardMedia
          component="img"
          height="300"
          image={book.image}
          alt={book.title}
        />
      </CardActionArea>
      <CardContent>
        <Typography sx={{ textAlign: 'center' }} variant="subtitle1">{book.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default DiscoverCardBook;