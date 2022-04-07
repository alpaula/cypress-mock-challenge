// Libs
import { types } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';

export const initialState = {
  movie: {
    id: '',
    title: '',
    description: '',
    score: '',
    posterImage: '',
    adult: '',
    popularity: ''
  },
  serie: {
    id: '',
    title: '',
    description: '',
    score: '',
    posterImage: '',
    adult: '',
    popularity: ''
  },
};

const Movie = types.model('User', {
  id: types.number,
  title: types.string,
  description: types.string,
  score: types.number,
  posterImage: types.string,
  adult: types.boolean,
  popularity: types.number
});

export const contentModel = types.model('ContentStore', {
  movies: types.map(Movie),
  series: types.map(Movie),
}).views(self => ({
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
  saveMovies(movies) {
    movies.slice(0, 6).forEach((movie) => {
      self.movies.set(movie.id, movie)
    });
  },
  saveSeries(series) {
    series.slice(0, 6).forEach((serie) => {
      self.series.set(serie.id, serie)
    });
  },
  cleanModule() {
    self.movies = initialState.movie;
    self.series = initialState.serie;
  }
}));
