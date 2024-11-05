import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import MovieCard from './MovieCard';
import './MovieGrid.css';

const MovieGrid = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Use the Intersection Observer
  const { ref, inView } = useInView({
    threshold: 0.5, // Only trigger when the element is at least 50% visible
  });

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await axios.get(`https://test.create.diagnal.com/data/page${page}.json`);
      if (response.data && response.data.page && response.data.page['content-items'].content.length > 0) {
        setMovies((prevMovies) => [...prevMovies, ...response.data.page['content-items'].content]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more data available to load
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [page, hasMore, loading]);

  // Trigger fetch when `inView` changes
  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMovies();
    }
  }, [inView, hasMore, loading, fetchMovies]);

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="movie-grid">
      {filteredMovies.map((movie, index) => (
        <MovieCard key={index} title={movie.name} posterUrl={`https://test.create.diagnal.com/images/${movie['poster-image']}`} />
      ))}
      {/* This div acts as the observer's target element */}
      <div ref={ref} className="loading-indicator">
        {loading ? 'Loading more movies...' : hasMore ? '' : 'No more movies to load'}
      </div>
    </div>
  );
};

export default MovieGrid;
