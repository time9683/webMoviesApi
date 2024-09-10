import { getMovieById } from "../service"
import { $ } from '../utils.js'
import { updatePlot } from '../plot.js'
export default class AppTable extends HTMLElement{

  /**
   * @type {Array<{id: number, title: string, poster: string, awards: string}>}
   */
  showMovies = []
  intervalRef = null
  filterInput = null

  constructor(){
  super()
  }

  // Método que se ejecuta cuando el componente se renderiza en el dom
  connectedCallback(){
    this.innerHTML = /*html*/`

    <input class="text-black" type="text" id="filter" placeholder="Buscar por nombre">

      <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Póster</th>
          <th>Nombre</th>
          <th>Premios</th>
          <th>Acciones</th>
        </tr>

      </thead>

      <tbody>
      </tbody>
      </table>
    `
    this.input = this.querySelector('#filter')

    this.input.addEventListener('input', (e) => {
      const value = e.target.value
      this.filterInput = value
      this.render()
    })


    this.intervalRef = setInterval(() => {
      this.getRandomMovie()
    }, 10) // TODO: cambiar a 5000
  }

  addMovie(movie){
    this.showMovies.push(movie)
    this.render() 
  }

  removeMovie(id){
    this.showMovies = this.showMovies.filter(movie => movie.id !== parseInt(id))
    this.render()
  }

  seeMovie(id) {
    const movie = this.showMovies.find(movie => movie.id === parseInt(id))

    const details = $("#details")
    
    details.innerHTML = /*html*/ `
    <h1>${movie.title}</h1>
    <div class="flex justify-center">
      <img src="${movie.poster}" alt="">
      <div class="ml-4">
        <p> Premios: ${movie.awards}</p>
        <p> Sinopsis: ${movie.plot}</p>
        <p> Duración: ${movie.runtime} minutos</p>
        <p> Director: ${movie.director}</p>
        <p> Actores: ${movie.actors.join(', ')}</p>
        <p> Rating: ${movie.rating}</p>
        <p> Género(s): ${movie.genre.join(', ')}</p>
        <p> País: ${movie.country}</p>
        <p> Idioma: ${movie.language}</p>
        <p> Box Office: ${movie.boxOffice}</p>
        <p> Producción: ${movie.production}</p>
        <p> Sitio web: ${movie.website}</p>
      </div>
    </div>
    <button onclick="details.close()">Cerrar</button>
    `
    details.showModal()
  }

  // renderizar los datos en la tabla
  render(){
    // 1. limpiar el tbody
    const tbody = this.querySelector('tbody')
    tbody.innerHTML = ''

    // 2. filtrar los datos si hay algo en el input y graficarlos
    const moviesToRender = this.filterInput !== null ? 
    this.showMovies.filter(movie => movie.title.toLowerCase().includes(this.filterInput.toLowerCase())) :
    this.showMovies

    // 3. ordenar los datos por titulo
    const sortMovie = moviesToRender.sort((a, b) => a.title.localeCompare(b.title))

    // 4. renderizar los datos
    sortMovie.forEach(movie => {
      const row = document.createElement('tr', {is: 'app-row'})
      row.setAttribute('id', movie.id)
      row.setAttribute('title', movie.title)
      row.setAttribute('poster', movie.poster)
      row.setAttribute('awards', movie.awards)
      tbody.appendChild(row)
    })

    // 5. graficar los datos
    updatePlot(sortMovie)
 }

  getRandomMovie(){
    // la logica ahora es que cada 5 segundos se haga una peticion a la api
    // se genere una id aleatoria entre 1 y 20
    // si la id ya existe en el array de showMovies se vuelve a generar otra id
    // esto se hace de manera recursiva

    const id = Math.floor(Math.random() * 20) + 1
    
    // TODO: A ternaria
    // TODO: Recursion stack full when more than 20 movies are shown
    if(this.showMovies.find(movie => movie.id === id)){
      return this.getRandomMovie()
    }

    getMovieById(id).then(movie => {
      this.addMovie(movie)
    }).catch(err => {
      console.error(err)
    })
  }
}

customElements.define('app-table', AppTable)