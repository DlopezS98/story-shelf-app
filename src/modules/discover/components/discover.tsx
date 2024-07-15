import SearchIcon from '@mui/icons-material/Search';
import {
  alpha,
  Box,
  Button,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled
} from "@mui/material";
import useBookCategories from '../hooks/use-book-categories';
import React from 'react';
import useBooksPagination from '../hooks/use-books-pagination';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  '.MuiInputBase-root': {
    width: '100%',
  }
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}));

export default function Discover() {
  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('relevance');

  const { categories } = useBookCategories();
  const { isLoading, books, canLoadNextPage, loadNextPage } = useBooksPagination();

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const category = categories.find((category) => category.id === event.target.value);
    if (!category) return;

    setCategory(category.name);
  };

  const getCategory = (name: string) => {
    return categories.find((category) => category.name === name)?.id ?? '0';
  };

  return (
    <Box sx={{ display: "flex", flexDirection: 'column', p: 3 }}>
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ display: "flex", flexDirection: 'row' }}>
        <Search style={{ width: '100%' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button variant="contained" color="secondary">Search</Button>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box sx={{ display: "flex", mt: 2, mb: 2, justifyContent: "center" }}>
        <FormControl sx={{ width: 280 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            value={getCategory(category)}
            label="Category"
            onChange={handleChange}
          >
            {
              categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  <React.Fragment>{category.name}</React.Fragment>
                </MenuItem>
              ))
            }
          </Select>
          {/* <FormHelperText>With label + helper text</FormHelperText> */}
        </FormControl>
        <FormControl sx={{ width: 280, ml: 2 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortByChange}
            label="Sort By"
          >
            <MenuItem value='relevance'>Relevance</MenuItem>
            <MenuItem value='newest'>Newest</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Box>
        {isLoading ? (
          <Box>Loading...</Box>
        ) : (
          <Box>
            {books.map((book) => (
              <Box key={book.id}>{book.title}</Box>
            ))}
            <Button disabled={!canLoadNextPage} onClick={loadNextPage}>Load More</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}