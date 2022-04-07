// Libs
import axios from 'axios';

export const trendingClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_MOVIEDB_URL_BASE}trending/all/day?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}`,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_MOVIE_CREDENTIAL}`,
  }
});

export const movieClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_MOVIEDB_URL_BASE}movie/popular?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}`,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_MOVIE_CREDENTIAL}`,
  }
});
