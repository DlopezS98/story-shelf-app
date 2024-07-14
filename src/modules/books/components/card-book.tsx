import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, createTheme, Divider, ThemeProvider, Typography } from "@mui/material";
import BookModel from "../models/book.model";

export interface ICardBookProps {
  bookModel: BookModel;
}

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#121212',
          color: '#fff',
        }
      }
    }
  }
});

const CardBook: React.FC<ICardBookProps> = (props) => {
  const { bookModel } = props;

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 250, marginBottom: 3 }} className="shadow">
        <CardActionArea>
          <CardMedia
            style={{ objectFit: 'contain' }}
            component="img"
            height="140"
            image={bookModel.image}
            alt={bookModel.title}
          />
          <Divider color="#282c34" />
        </CardActionArea>
        <CardContent>
          <Box height={5} />
          {bookModel.categories.map((category) => <Chip key={category} label={category} color="secondary" size="small" />)}
          <Box height={10} />
          <Typography sx={{ marginBottom: 3 }} variant="subtitle1">{bookModel.title}</Typography>
          <Typography variant="subtitle2">Authors:</Typography>
          <Typography variant="caption">{bookModel.authors.join(', ')}</Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

export default CardBook;