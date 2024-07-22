import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const MovieCard = ({ movie, isBookmarked, addBookmark, removeBookmark }) => {
    const { title, overview, genres, popularity, release_date, vote_average, vote_count } = movie._source;
    const genresArray = JSON.parse(genres.replace(/'/g, '"'));

    const onBookmark = () => {
        isBookmarked ? removeBookmark(movie) : addBookmark(movie);
    }

    return (
        <Card sx={{ width: '100%', margin: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <IconButton onClick={() => onBookmark()}>
                        {isBookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                    <strong>Release Date:</strong> {release_date}
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                    <strong>Genres:</strong>
                    {genresArray.map((genre) => (
                        <Chip key={genre.id} label={genre.name} variant="outlined" size="small" sx={{ margin: 0.5 }} />
                    ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {overview}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Popularity:</strong> {popularity}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Average Vote:</strong> {vote_average}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Vote Count:</strong> {vote_count}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
