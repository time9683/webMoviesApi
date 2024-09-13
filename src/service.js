const API_URL = 'https://freetestapi.com/api/v1/movies';


// get movie By Id
/**
 * 
 * @param {number} movideId 
 * @returns  {Promise<{id: number, 
 *            title: string, 
 *            year: number,
 *            genre: array<string>,
 *            rating: number,
 *            director: string,
 *            actors: array<string>,
 *            plot: string,
 *            poster: string, 
 *            trailer: string,
 *            runtime: number,
 *            awards: string,
 *            country: string,
 *            language: string,
 *            boxOffice: string,
 *            production: string,
 *            website: string,
 * }>}
 */
export async function getMovieById(movieId) {

  const res = await fetch(API_URL+`/${movieId}`);

  return res.ok ? res.json()  : Promise.reject(res.statusText);


}