// src/components/Search.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Search.css'; // Import your CSS file for styling

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const API_KEY = '8c22abb2e63e0097e6edcb702175803c'; // Replace with your TMDB API key
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {/* Render search results with Link to MovieDetails */}
        {results.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`} className="search-result">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Release Date: {movie.release_date}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
