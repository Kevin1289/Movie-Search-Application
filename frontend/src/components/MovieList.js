import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, addBookmark, removeBookmark, bookmarks }) => {

  const isBookmarked = (movie) => {
    return bookmarks.some((bookmark) => bookmark._source.id === movie._source.id);
  }

  if (movies.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>No movies to show</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._source.id} movie={movie} addBookmark={addBookmark} removeBookmark={removeBookmark} isBookmarked={isBookmarked(movie)} />
      ))}
    </div>
  );
};

export default MovieList;
