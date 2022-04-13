// Libs
import { flow, types } from 'mobx-state-tree';
import { computedFn } from 'mobx-utils';
import {
  getMoviesApi,
  getSelectedMovie,
  getSelectedMovieCast,
  getSelectedSerie,
  getSelectedSerieCast,
  getSeriesApi,
  getTrendingApi
} from '../api/api';

export const initialState = {
  moviesPreview: {},
  seriesPreview: {},
  movies: {},
  series: {},
  isLoading: false,
  selectedMovie: {
    id: 0,
    title: '',
    description: '',
    originalLanguage: '',
    originalTitle: '',
    genres: '',
    poster: '',
    actors: '',
    direction: '',
    releaseDate: '',
    runtime: 0,
    adult: false,
  },
  selectedSerie: {
    id: 0,
    title: '',
    description: '',
    originalLanguage: '',
    originalTitle: '',
    genres: '',
    poster: '',
    actors: '',
    creators: '',
    releaseDate: '',
    adult: false,
    seasons: 0,
    inProduction: false
  },
};

const Movie = types.model('Movie', {
  id: types.number,
  title: types.string,
  description: types.string,
  posterImage: types.string,
  type: types.string
});

const SelectedMovie = types.model('SelectedMovie', {
  id: types.number,
  title: types.string,
  originalLanguage: types.string,
  originalTitle: types.string,
  description: types.string,
  genres: types.string,
  poster: types.string,
  actors: types.string,
  direction: types.string,
  releaseDate: types.string,
  runtime: types.number,
  adult: types.boolean,
});

const SelectedSerie = types.model('SelectedSerie', {
  id: types.number,
  title: types.string,
  originalLanguage: types.string,
  originalTitle: types.string,
  description: types.string,
  genres: types.string,
  poster: types.string,
  actors: types.string,
  creators: types.string,
  releaseDate: types.string,
  seasons: types.number,
  adult: types.boolean,
  inProduction: types.boolean
});

export const contentModel = types.model('ContentStore', {
  isLoading: types.boolean,
  moviesPreview: types.map(Movie),
  seriesPreview: types.map(Movie),
  movies: types.map(Movie),
  series: types.map(Movie),
  selectedMovie: SelectedMovie,
  selectedSerie: SelectedSerie,
}).views(self => ({
  getMoviesPreview: computedFn(function getMoviesPreview() {
    return Array.from(self.moviesPreview.values());
  }),
  getSeriesPreview: computedFn(function getSeriesPreview() {
    return Array.from(self.seriesPreview.values());
  }),
  getMovies: computedFn(function getMovies() {
    return Array.from(self.movies.values());
  }),
  getSeries: computedFn(function getSeries() {
    return Array.from(self.series.values());
  }),
})).actions(self => ({
  setLoading() {
    self.isLoading = true;
  },
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
            type: 'serie'
          })
        });

      self.isLoading = false;

    } catch (error) { console.log(error) }
  }),
  saveMovies: flow(function* saveMovies() {
    try {
      const response = yield getMoviesApi();

      response.data.results.forEach(movie => {
        self.movies.set(movie.id, {
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${movie.poster_path}`,
          type: 'movie'
        })
      });

      self.isLoading = false;
    } catch (error) { console.log(error) }
  }),
  saveSeries: flow(function* saveSeries() {
    try {
      const response = yield getSeriesApi();

      response.data.results.forEach((serie) => {
        self.series.set(serie.id, {
          id: serie.id,
          title: serie.name,
          description: serie.overview,
          posterImage: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${serie.poster_path}`,
          type: 'serie'
        })
      });

      self.isLoading = false;
    } catch (error) { console.log(error) }
  }),
  saveSelectedMovie: flow(function* saveSelectedMovie(id) {
    try {
      const response = yield getSelectedMovie(id);
      const responseCast = yield getSelectedMovieCast(id);

      const { data } = response;

      const movie = {
        id: data.id,
        title: data.title,
        originalLanguage: data.original_language,
        originalTitle: data.original_title,
        description: data.overview,
        genres: data.genres.map(item => item.name).join(', '),
        poster: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${data.poster_path}`,
        actors: responseCast.data.cast.map(item => (item.original_name)).join(', '),
        direction: responseCast.data.crew.filter(item => item.department === 'Directing').map(item => (item.name)).join(', '),
        releaseDate: data.release_date,
        runtime: data.runtime,
        adult: data.adult,
      }

      self.selectedMovie = movie;
      self.isLoading = false;
    } catch (error) { console.log(error) }
  }),
  saveSelectedSerie: flow(function* saveSelectedSerie(id) {
    try {
      const response = yield getSelectedSerie(id);
      const responseCast = yield getSelectedSerieCast(id);

      const { data } = response;

      const serie = {
        id: data.id,
        title: data.name,
        originalLanguage: data.original_language,
        originalTitle: data.original_name,
        description: data.overview,
        genres: data.genres.map(item => item.name).join(', '),
        poster: `${process.env.REACT_APP_API_IMAGE_URL_BASE}${data.poster_path}`,
        actors: responseCast.data.cast.map(item => item.original_name).join(', '),
        creators: data.created_by.map(item => item.name).join(', '),
        releaseDate: data.first_air_date,
        seasons: data.number_of_seasons,
        adult: data.adult,
        inProduction: data.in_production
      }

      self.selectedSerie = serie;
      self.isLoading = false;
    } catch (error) { console.log(error) }
  }),
  cleanSelectedMovie() {
    self.selectedMovie = initialState.selectedMovie;
  },
  cleanSelectedSerie() {
    self.selectedSerie = initialState.selectedSerie;
  },
  cleanModule() {
    self.moviesPreview = initialState.moviesPreview;
    self.seriesPreview = initialState.seriesPreview;
    self.movies = initialState.movies;
    self.series = initialState.series;
    self.selectedMovie = initialState.selectedMovie;
    self.selectedSerie = initialState.selectedSerie;
    self.isLoading = initialState.isLoading;
  }
}));
