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
    console.log(`Response from ${endpoint}:`, response.data);  // Debugging line
    return response.data;
  } catch (err) {
    console.error(`Error ${endpoint}:`, err.response ? err.response.data : err.message);
    throw err;
  }
};

export const fetchMovies = (query = '') => {
  const endpoint = query ? '/search/movie' : '/trending/movie/day';
  const params = query ? { query, language: 'en-US' } : { language: 'en-US' };
  return fetchFromAPI(endpoint, params);
};

export const fetchMovieDetails = (movieId) => {
  return fetchFromAPI(`/movie/${movieId}`, { language: 'en-US' });
};

export const fetchMovieReviews = (movieId) => {
  return fetchFromAPI(`/movie/${movieId}/reviews`, { language: 'en-US', page: 1 });
};

export const fetchMovieCredits = async (movieId) => {
  const data = await fetchFromAPI(`/movie/${movieId}/credits`, { language: 'en-US' });
  console.log("Credits Data:", data);  // Debugging line
  return data.cast;  // Ensure that only the cast array is returned
};


//   import axios from 'axios';

// const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzY4ZGIxMjZkODI3ZTBlZmJiZjE1ZTlkOTU1Mzg3YSIsInN1YiI6IjY2NjI5MmI0NTAwNmVkZTg2ZDE0Zjc0MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fLZq8DKLU6hcrejDB61KcgHOw39IXLV5GKicbAMVPKg';

// const apiClient = axios.create({
//   baseURL: 'https://api.themoviedb.org/3',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${apiKey}`,
//   },
// });

// const fetchFromAPI = async (endpoint, params = {}) => {
//   try {
//     const response = await apiClient.get(endpoint, { params });
//     return response.data;
//   } catch (err) {
//     console.error(`Error in ${endpoint}:`, err.response ? err.response.data : err.message);
//     throw err;
//   }
// };

// export const fetchMovies = () => {
//        const endpoint = '/trending/movie/day';
//   const params = { language: 'en-US' };
//   return fetchFromAPI(endpoint, params); };

//   export const searchMovies = (query) => {
//     const endpoint = '/search/movie';
//     const params = { query, language: 'en-US' };
//     return fetchFromAPI(endpoint, params);
//   };

// export const fetchMovieById = (movieId) => {
//   return fetchFromAPI(`/movie/${movieId}`, { language: 'en-US' });
// };

// export const fetchMovieReviews = (movieId) => {
//   return fetchFromAPI(`/movie/${movieId}/reviews`, { language: 'en-US', page: 1 });
// };

// export const fetchMovieCredits = (movieId) => {
//   return fetchFromAPI(`/movie/${movieId}/credits`, { language: 'en-US' });
// };
