// Libs
import axios from 'axios';

export const trendingClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/trending/all/day?api_key=361b96ea8a305b9fa639795ba4ad5fe4',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_MOVIE_CREDENTIAL}`,
  }
});

export const movieClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie/popular?api_key=361b96ea8a305b9fa639795ba4ad5fe4',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_MOVIE_CREDENTIAL}`,
  }
});
