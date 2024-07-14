import bookStackImage from '../../../assets/books-stack.png';
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";

export default function Books() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ p: 2, m: 2 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', columnGap: 3, justifyContent: 'center', alignItems: 'center' }} >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">Hello Danny</Typography>
            <Typography variant="body1">
              Welcome to Story Shelf, a place where you can find your next favorite book.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>Get Started</Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              alt="books"
              height="300"
              style={{ objectFit: 'contain' }}
              image={bookStackImage}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}