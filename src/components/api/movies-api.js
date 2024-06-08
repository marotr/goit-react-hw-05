import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzY4ZGIxMjZkODI3ZTBlZmJiZjE1ZTlkOTU1Mzg3YSIsInN1YiI6IjY2NjI5MmI0NTAwNmVkZTg2ZDE0Zjc0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fLZq8DKLU6hcrejDB61KcgHOw39IXLV5GKicbAMVPKg';

export const fetchMovies = async (query = '') => {
  const url = query
    ? `https://api.themoviedb.org/3/search/movie`
    : `https://api.themoviedb.org/3/trending/movie/day`;
  
  const params = {
    language: 'en-US',
    query,
  };

  const options = {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    params,
  };

  try {
    const response = await axios.get(url, options);
    return response.data; 
  } catch (err) {
    console.error('Error in fetchMovies:', err.response ? err.response.data : err.message);
    throw err; 
  }
};
