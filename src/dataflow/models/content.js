// Libs
import { types } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';

export const initialState = {
  moviesPreview: {},
  seriesPreview: {},
  movies: {},
  series: {},
  selectedMovie: {
    id: 0,
    title: '',
    description: '',
    score: 0,
    posterImage: '',
    adult: false,
    popularity: 0,
    backdropImage: ''
  }
};

const Movie = types.model('Movie', {
  id: types.number,
  title: types.string,
  description: types.string,
  score: types.number,
  posterImage: types.string,
  adult: types.boolean,
  popularity: types.number,
  backdropImage: types.string
});

export const contentModel = types.model('ContentStore', {
  moviesPreview: types.map(Movie),
  seriesPreview: types.map(Movie),
  movies: types.map(Movie),
  series: types.map(Movie),
  selectedMovie: Movie,
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
  saveMoviesPreview(movies) {
    movies.slice(0, 6).forEach((movie) => {
      self.moviesPreview.set(movie.id, movie)
    });
  },
  saveSeriesPreview(series) {
    series.slice(0, 6).forEach((serie) => {
      self.seriesPreview.set(serie.id, serie)
    });
  },
  saveMovies(movies) {
    movies.forEach((movie) => {
      self.movies.set(movie.id, movie)
    });
  },
  saveSeries(series) {
    series.forEach((serie) => {
      self.series.set(serie.id, serie)
    });
  },
  setSelectedMovie(movie) {
    self.series = movie;
  },
  cleanModule() {
    self.moviesPreview = initialState.moviesPreview;
    self.seriesPreview = initialState.seriesPreview;
    self.movies = initialState.movies;
    self.series = initialState.series;
  }
}));
