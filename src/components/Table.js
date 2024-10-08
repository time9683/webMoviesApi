import { getMovieById } from "../service"
import { $, GetFromLocalStorage, SaveToLocalStorage } from '../utils.js'
import { updatePlot } from '../plot.js'


const TIME_FETCH = 1000

export default class AppTable extends HTMLElement {

  /**
   * @type {Array<{id: number, title: string, poster: string, awards: string}>}
   */
  showMovies = []
  intervalRef = null
  filterInput = null

  constructor() {
    super()
    const data = GetFromLocalStorage()
    this.showMovies =  data
    console.log(data)
  }

  // Método que se ejecuta cuando el componente se renderiza en el dom
  connectedCallback() {
    this.innerHTML = /*html*/`
    <div class="text-center pb-6">
      <input class="text-black bg-gray-50 rounded-md border-[1px] 
                    border-gray-200 hover:border-gray-400 w-1/4 
                    focus:outline-none focus:ring-2 focus:ring-gray-400" 
             type="text" id="filter" placeholder=" Buscar por nombre">
    </div>

    <table class="bg-gray-50 rounded-lg">
      <thead class="border-b-[1px] border-gray-200">
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


    window.addEventListener("storage",()=>{
      console.log("updated")
      this.showMovies = GetFromLocalStorage()
      this.render()
    })

    this.intervalRef = setTimeout(() => {
      this.getRandomMovie()
    }, TIME_FETCH) // TODO: cambiar a 5000
    this.render()
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
    document.body.style.overflow = 'hidden'
    // actualizar los datos del dialog
    appDialog.updateData(movie)

  }

  // renderizar los datos en la tabla
  render() {
    //  0. guardar los datos en el localstorage
    SaveToLocalStorage(this.showMovies)
  //  si no hay datos en el array, se vuelve a generar petición a la api
    this.showMovies.length  === 0 ? this.getRandomMovie() : null

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
      row.setAttribute('class', "border-b-[1px] border-gray-100 hover:font-semibold")
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

