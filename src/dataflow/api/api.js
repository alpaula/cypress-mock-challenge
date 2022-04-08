// Libs
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_MOVIEDB_URL_BASE}`,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_MOVIE_CREDENTIAL}`,
  }
});

const language = navigator.language === 'pt-BR' ? navigator.language : 'en';

export const getTrendingApi = () =>
  apiClient({
    method: 'get',
    url: `trending/all/day?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}&language=${language}`
  });

export const getMoviesApi = () =>
  apiClient({
    method: 'get',
    url: `movie/popular?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}&language=${language}`
  });

export const getSeriesApi = () =>
  apiClient({
    method: 'get',
    url: `tv/popular?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}&language=${language}`
  });

export const getSelectedMovie = (id) =>
  apiClient({
    method: 'get',
    url: `movie/${id}?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}&language=${language}`
  });

export const getSelectedSerie = (id) =>
  apiClient({
    method: 'get',
    url: `tv/${id}?api_key=${process.env.REACT_APP_API_MOVIEDB_API_KEY}&language=${language}`
  });