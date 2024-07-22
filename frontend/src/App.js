import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Tabs, Tab, Box } from '@mui/material';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:80/search?q=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const addBookmark = (movie) => {
    const newBookmarks = [...bookmarks, movie];
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const removeBookmark = (movie) => {
    const newBookmarks = bookmarks.filter((bookmark) => bookmark !== movie)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      <h1>Movie Search</h1>
      <SearchBar onSearch={handleSearch} />
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Search Results" />
        <Tab label="Bookmarks" />
      </Tabs>
      <Box hidden={tabIndex !== 0}>
        <MovieList movies={movies} addBookmark={addBookmark} bookmarks={bookmarks} removeBookmark={removeBookmark}/>
      </Box>
      <Box hidden={tabIndex !== 1}>
        <MovieList movies={bookmarks} addBookmark={addBookmark} bookmarks={bookmarks} removeBookmark={removeBookmark}/>
      </Box>
    </Container>
  );
};

export default App;
