import React, { useState, useEffect } from 'react';
import { Button, TextField, List, ListItem, ListItemText, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import './wishlist.css';

const Wishlist: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  
  useEffect(() => {
    const savedItems = localStorage.getItem('wishlist');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
      console.log('Loaded items from localStorage:', JSON.parse(savedItems)); 
    } else {
      console.log('No items found in localStorage');
    }
  }, []);

  // Guarda datos en localStorage 
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('wishlist', JSON.stringify(items));
      console.log('Saved items to localStorage:', items);
    }
  }, [items]);

  const handleAddItem = (item: string) => {
    if (item && !items.includes(item)) {
      setItems([...items, item]);
    }
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSearch = async () => {
    if (searchValue.trim()) {
      setLoading(true);
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchValue}`);
        const data = await response.json();
        console.log('Search results:', data); 
        setSearchResults(data.items || []);
      } catch (error) {
        console.error('Error fetching data from Google Books API', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <div className="search-container">
        <TextField
          label="Search books"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: 8 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<SearchIcon />}>
          Search
        </Button>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="search-results-container">
          <List>
            {searchResults.map((book: any) => (
              <ListItem key={book.id} button onClick={() => handleAddItem(book.volumeInfo.title)}>
                <ListItemText primary={book.volumeInfo.title} secondary={book.volumeInfo.authors?.join(', ')} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
      <div className="add-item-container">
        <TextField
          label="Add custom item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          size="small"
          style={{ marginRight: 8 }}
        />
        <Button variant="contained" color="primary" onClick={() => handleAddItem(inputValue)}>
          Add
        </Button>
      </div>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(index)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Wishlist;
