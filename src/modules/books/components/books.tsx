import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, Tab, Tabs, Typography } from "@mui/material";


import Recommended from './recommended';
import RecentlyRead from './recently-read';
import CustomTabPanel from './custom-tab-panel';
import bookStackImage from '../../../assets/books-stack.png';

export default function Books() {
  const [value, setValue] = React.useState(1);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ p: 2, m: 2 }} className='shadow'>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', columnGap: 3, justifyContent: 'center', alignItems: 'center' }} >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">Hello Danny</Typography>
            <Typography variant="body1">
              Welcome to Story Shelf, a place where you can find your next favorite book.
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Get Started</Button>
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
      <Card sx={{ p: 2, m: 2 }} className='shadow'>
        <CardContent>
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
        </CardContent>
      </Card>
    </Box>
  );
}