import React from 'react';
import './MovieCard.css';

const MovieCard = ({ title, posterUrl }) => {
  const MAX_TITLE_LENGTH = 20; // Set your desired maximum length

  const truncatedTitle =
    title.length > MAX_TITLE_LENGTH
      ? `${title.substring(0, MAX_TITLE_LENGTH)}...`
      : title;

  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} className="movie-poster" />
      <p className="movie-title">{truncatedTitle}</p>
    </div>
  );
};

export default MovieCard;
