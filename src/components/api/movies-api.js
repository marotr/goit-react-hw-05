import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const fetchMovies = async () => {
  const url = '/search/movie';
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    params: {
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  };

  try {
    const response = await axios.get(url, options);
    console.log(response.data);
  } catch (err) {
    console.error('Error fetching movies:', err.response ? err.response.data : err.message);
  }
};

fetchMovies();

