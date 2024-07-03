// src/components/Home/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Search from '../Search/Search';

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const API_KEY = '8c22abb2e63e0097e6edcb702175803c';
      const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="home">
      
      
      {/* Trending Movies Section */}
      <section className="trending-movies">
        <h2>Trending Movies</h2>
        <div className="movie-grid">
          {popularMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>Release Date: {movie.release_date}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Search Component */}
      <Search onSearchResults={handleSearchResults} />

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <section className="search-results">
          <h2>Search Results</h2>
          <div className="movie-grid">
            {searchResults.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>Release Date: {movie.release_date}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
