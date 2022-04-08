// Libs
import { flow, types } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';
import { getMoviesApi, getSeriesApi, getTrendingApi } from '../api/api';

export const initialState = {
  moviesPreview: {},
  seriesPreview: {},
  movies: {},
  series: {},
};

const Movie = types.model('Movie', {
  id: types.number,
  title: types.string,
  description: types.string,
  posterImage: types.string,
});

export const contentModel = types.model('ContentStore', {
  moviesPreview: types.map(Movie),
  seriesPreview: types.map(Movie),
  movies: types.map(Movie),
  series: types.map(Movie),
}).views(self => ({
  getMoviesPreview: computedFn(function getMoviesPreview() {
    return Array.from(self.moviesPreview, item => ({
      ...item[1],
    }));
  }),
  getSeriesPreview: computedFn(function getSeriesPreview() {
    return Array.from(self.seriesPreview, item => ({
      ...item[1],
    }));
  }),
  getMovies: computedFn(function getMovies() {
    return Array.from(self.movies, item => ({
      ...item[1],
    }));
  }),
  getSeries: computedFn(function getSeries() {
    return Array.from(self.series, item => ({
      ...item[1],
    }));
  }),
})).actions(self => ({
  savePreview: flow(function* savePreview() {
    try {
      const response = yield getTrendingApi();

      response.data.results
        .filter(movie => movie.media_type === 'movie')
        .slice(0, 6)
        .forEach(movie => {
          self.moviesPreview.set(movie.id, {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
            type: movie.media_type
          })
        });

      response.data.results
        .filter(movie => movie.media_type === 'tv')
        .slice(0, 6)
        .forEach(serie => {
          self.seriesPreview.set(serie.id, {
            id: serie.id,
            title: serie.name,
            description: serie.overview,
            posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.poster_path}`,
            type: serie.media_type
          })
        });
    } catch (error) { console.log(error) }
  }),
  saveMovies: flow(function* saveMovies() {
    try {
      const response = yield getMoviesApi();

      response.data.results
        .forEach(movie => {
          self.movies.set(movie.id, {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
            type: movie.media_type
          })
        });
    } catch (error) { console.log(error) }
  }),
  saveSeries: flow(function* saveSeries() {
    try {
      const response = yield getSeriesApi();

      response.data.results
        .forEach((serie) => {
          self.series.set(serie.id, {
            id: serie.id,
            title: serie.name,
            description: serie.overview,
            posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.poster_path}`,
            type: serie.media_type
          })
        });
    } catch (error) { console.log(error) }
  }),
  cleanModule() {
    self.moviesPreview = initialState.moviesPreview;
    self.seriesPreview = initialState.seriesPreview;
    self.movies = initialState.movies;
    self.series = initialState.series;
  }
}));
