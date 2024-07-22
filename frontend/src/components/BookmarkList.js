import React from 'react';
import MovieCard from './MovieCard';

const BookmarkList = ({ bookmarks, removeBookmark }) => {

  if (bookmarks.length === 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>No bookmarks</div>;
  }

  return (
    <div>
      {bookmarks.map((movie) => (
        <MovieCard isBookmarked={true} key={movie._source.id} id={movie._source.id} movie={movie} removeBookmark={(movie) => removeBookmark(movie)}/>
      ))}
    </div>
  );
};

export default BookmarkList;
