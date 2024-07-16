import SearchIcon from '@mui/icons-material/Search';
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  styled,
  Typography
} from "@mui/material";
import useBookCategories from '../hooks/use-book-categories';
import React from 'react';
import useBooksPagination from '../hooks/use-books-pagination';
import DiscoverCardBook from './discover-card-book';
import BookModel from '../../books/models/book.model';
import CustomModal from '../../core/components/custom-modal';
import BookDetails from '../../core/components/book-details';

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
  const [selectedBook, setSelectedBook] = React.useState<BookModel | null>(null);

  const [category, setCategory] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('relevance');
  const [search, setSearch] = React.useState('');

  const { categories } = useBookCategories();
  const {
    isLoading,
    books,
    canLoadNextPage,
    loadNextPage,
    setFilterCategory,
    setFilterSearch,
    setFilterSortBy
  } = useBooksPagination();

  const [open, setOpen] = React.useState(false);

  const handleSortByChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setFilterSortBy(event.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const category = categories.find((category) => category.id === event.target.value);
    if (!category) return;

    setCategory(category.name);
    const isAll = category.name === 'All';
    setFilterCategory(isAll ? '' : category.name);
  };

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  const getCategory = (name: string) => {
    return categories.find((category) => category.name === name)?.id ?? '0';
  };

  const LoadingIndicator = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress color="secondary" />
        <Box><Typography>Loading...</Typography></Box>
      </Box>
    );
  };

  const handleBookClick = (book: BookModel) => {
    console.log('Book clicked', book);
    setSelectedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BooksLayout = () => {
    return (
      <Box sx={{ display: "flex", flexDirection: 'row', gap: 2, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {
          books.map((book) => (<DiscoverCardBook key={book.id} book={book} onBookClick={() => handleBookClick(book)} />))
        }
      </Box>
    );
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
            onChange={handleChangeSearch}
            value={search}
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        <Button variant="contained" color="secondary" onClick={() => setFilterSearch(search)}>Search</Button>
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
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {isLoading ? (<LoadingIndicator />) : (<BooksLayout />)}
      </Box>

      <CustomModal open={open} onClose={() => { }} handleClose={handleClose}>
        { selectedBook ? <BookDetails book={selectedBook} /> : null }
      </CustomModal>
    </Box>
  );
}