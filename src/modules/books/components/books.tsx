import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  Paper, 
  Tab, 
  Tabs, 
  Typography 
} from "@mui/material";

import './books.css';
import Recommended from './recommended';
import RecentlyRead from './recently-read';
import CustomTabPanel from './custom-tab-panel';
import bookStackImage from '../../../assets/books-stack.png';

export default function Books() {
  const [value, setValue] = React.useState(0);

  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleGetStarted = () => navigate('/discover');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card style={{ position: 'relative' }} sx={{ p: 2, m: 2 }} className='shadow card-container'>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', columnGap: 3, justifyContent: 'center', alignItems: 'center' }} >
          <Box sx={{ flex: 2 }}>
            <Typography variant="h4">Hello Danny</Typography>
            <Typography variant="body1">
              Welcome to Story Shelf, a place where you can find your next favorite book.
            </Typography>
            <Button onClick={handleGetStarted} variant="contained" color="secondary" sx={{ mt: 2 }}>Get Started</Button>
          </Box>
          <Box sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              alt="books"
              height="300px"
              style={{ objectFit: 'contain' }}
              image={bookStackImage}
            />
          </Box>
        </CardContent>
      </Card>
      <Paper elevation={0} sx={{ p: 2, m: 2 }} className='shadow' >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value={0} label="Recommended" />
          <Tab value={1} label="Recently Accessed (read)" />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <Recommended />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <RecentlyRead />
        </CustomTabPanel>
      </Paper>
    </Box>
  );
}