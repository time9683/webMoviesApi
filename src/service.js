const API_URL = 'https://freetestapi.com/api/v1/movies';


// get movie By Id
/**
 * 
 * @param {number} movideId 
 * @returns  {Promise<{id: number, title: string, poster: string, awards: string}>}
 */
export async function getMovieById(movideId) {

  const res = await fetch(API_URL+`/${movideId}`);

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  return res.json();


}