"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreditsUrl = exports.getMovieUrl = exports.getPopularMovieUrl = void 0;
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.API_KEY;
const getPopularMovieUrl = (page) => `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`;
exports.getPopularMovieUrl = getPopularMovieUrl;
const getMovieUrl = (id) => `${API_URL}movie/${id}?api_key=${API_KEY}`;
exports.getMovieUrl = getMovieUrl;
const getCreditsUrl = (id) => `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;
exports.getCreditsUrl = getCreditsUrl;
//# sourceMappingURL=getMovieUrl.js.map