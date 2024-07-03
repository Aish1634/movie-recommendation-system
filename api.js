const API_KEY = '8c22abb2e63e0097e6edcb702175803c'; // Replace with your actual API key

export const fetchPopularMovies = async () => {
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json();
    return data.results; // Assuming results contain an array of movie objects
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return []; // Return empty array on error
  }
};
