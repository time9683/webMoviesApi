import { getMovieById } from "../service"
import { $ } from '../utils.js'
import { updatePlot } from '../plot.js'


const TIME_FETCH = 10

export default class AppTable extends HTMLElement {

  /**
   * @type {Array<{id: number, title: string, poster: string, awards: string}>}
   */
  showMovies = []
  intervalRef = null
  filterInput = null

  constructor() {
    super()
  }

  // Método que se ejecuta cuando el componente se renderiza en el dom
  connectedCallback() {
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


    this.intervalRef = setTimeout(() => {
      this.getRandomMovie()
    }, TIME_FETCH) // TODO: cambiar a 5000
  }

  addMovie(movie) {
    this.showMovies.push(movie)
    this.render()
  }

  removeMovie(id) {
    this.showMovies = this.showMovies.filter(movie => movie.id !== parseInt(id))
    this.render()
  }

  seeMovie(id) {
    // obtener la pelicula por id
    const movie = this.showMovies.find(movie => movie.id === parseInt(id))
    // obtener el dialog
    const appDialog =  $("dialog")
    // mostrar el dialog
    appDialog.showModal()
    // actualizar los datos del dialog
    appDialog.updateData(movie)

  }

  // renderizar los datos en la tabla
  render() {
    // 1. limpiar el tbody
    const tbody = this.querySelector('tbody')
    tbody.innerHTML = ''

    // 2. filtrar los datos si hay algo en el input
    const moviesToRender = this.filterInput !== null ?
      this.showMovies.filter(movie => movie.title.toLowerCase().includes(this.filterInput.toLowerCase())) :
      this.showMovies

    // 3. ordenar los datos por titulo
    const sortMovie = moviesToRender.sort((a, b) => a.title.localeCompare(b.title))

    // 4. renderizar los datos
    sortMovie.forEach(movie => {
      const row = document.createElement('tr', { is: 'app-row' })
      row.setAttribute('id', movie.id)
      row.setAttribute('title', movie.title)
      row.setAttribute('poster', movie.poster)
      row.setAttribute('awards', movie.awards)
      tbody.appendChild(row)
    })
    // 5. actualizar el canvas
    updatePlot(moviesToRender)
  }

  async getRandomMovie() {
    // la logica ahora es que cada 5 segundos se haga una peticion a la api
    // se genere una id aleatoria entre 1 y 20
    // si la id ya existe en el array de showMovies se vuelve a generar otra id
    // esto se hace de manera recursiva
    const id = Math.floor(Math.random() * 20) + 1

    // obtenemos el array de showMovies
    const movies = this.showMovies

    // buscamos si la id ya existe en el array de showMovies
    const movieIndex = movies.findIndex(movie => parseInt(movie.id) === parseInt(id))

    // si la id no existe en el array de showMovies se hace la peticion a la api
    movieIndex === -1 ? this.getMovie(id) :
      // si la id ya existe en el array de showMovies se vuelve a generar otra id solo hasta que existan 20 peliculas en la tabla
      movies.length < 20 ? this.getRandomMovie() : null

  }

  // lo separo porque se ve mas bonito xd
  getMovie(id) {
    getMovieById(id)
      .then(movie => {
        this.addMovie(movie);
        this.intervalRef = setTimeout(() => {
          this.getRandomMovie();
        }, TIME_FETCH);
      })
      .catch(err => {
        console.error(err);
      });
  }



}

customElements.define('app-table', AppTable)

