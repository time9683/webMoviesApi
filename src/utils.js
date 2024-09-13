//funciones utiles
export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);

const KEY = 'movies';

export const SaveToLocalStorage = (movieArr) => {
    localStorage.setItem(KEY, JSON.stringify(movieArr));
}

export const GetFromLocalStorage = () => {
  try{
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  }
  catch(e){
    return []
  }
}