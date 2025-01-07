const API_URL: string = "https://api.themoviedb.org/3/";
const API_KEY: string | undefined = process.env.API_KEY;

export const getPopularMovieUrl = (page?: number) => `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${page || 1}`;

export const getMovieUrl = (id?: number) => `${API_URL}movie/${id}?api_key=${API_KEY}`;

export const getCreditsUrl = (id?: number) => `${API_URL}movie/${id}/credits?api_key=${API_KEY}`;