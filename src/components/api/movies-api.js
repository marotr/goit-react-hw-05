import axios from 'axios';

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzY4ZGIxMjZkODI3ZTBlZmJiZjE1ZTlkOTU1Mzg3YSIsInN1YiI6IjY2NjI5MmI0NTAwNmVkZTg2ZDE0Zjc0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fLZq8DKLU6hcrejDB61KcgHOw39IXLV5GKicbAMVPKg';

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (err) {
    console.error(`Error in ${endpoint}:`, err.response ? err.response.data : err.message);
    throw err;
  }
};

export const fetchMovies = (query = '') => {
  const endpoint = query ? '/search/movie' : '/trending/movie/day';
  return fetchFromAPI(endpoint, { query, language: 'en-US' });
};

export const fetchMovieDetails = (movieId) => {
  return fetchFromAPI(`/movie/${movieId}`, {
    language: 'en-US',
    append_to_response: 'videos,images,credits,reviews',
  });
};
