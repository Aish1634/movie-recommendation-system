// MovieDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const API_KEY = '8c22abb2e63e0097e6edcb702175803c'; // Replace with your actual API key
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`);
        if (!movieResponse.ok) {
          throw new Error('Network response was not ok.');
        }
        const movieData = await movieResponse.json();
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getDirector = (crew) => {
    const director = crew.find(member => member.job === 'Director');
    return director ? director.name : 'N/A';
  };

  const getMainCast = (cast) => {
    return cast.slice(0, 5); // Get the main 5 cast members
  };

  return (
    <div className="movie-details">
      {movie && (
        <>
          <h1>{movie.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <p>{movie.overview}</p>
          <ul>
            <li><strong>Release Year:</strong> {new Date(movie.release_date).getFullYear()}</li>
            <li><strong>Duration:</strong> {movie.runtime} minutes</li>
            <li><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</li>
            <li><strong>Director:</strong> {getDirector(movie.credits.crew)}</li>
            <li><strong>Main Cast:</strong> 
              <ul>
                {getMainCast(movie.credits.cast).map(member => (
                  <li key={member.cast_id}>{member.name} as {member.character}</li>
                ))}
              </ul>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
