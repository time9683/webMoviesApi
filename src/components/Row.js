class AppRow extends  HTMLTableRowElement{
  parent = null
  constructor(){
    super()
  }

  connectedCallback(){
    this.parent = this.closest('app-table')
    this.innerHTML = /*html*/`
      <td>${this.getAttribute('id')}</td>
      <td><img src="${this.getAttribute('poster')}" alt="${this.getAttribute('title')}"></td>
      <td>${this.getAttribute('title')}</td>
      <td>${this.getAttribute('awards')}</td>
      <td>
        <button id="show" class="mb-2 w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Ver</button>
        <br>
        <button id="remove" class="px-4 w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Eliminar</button>
      </td>
    `
    // agregar eventos a los botones xd
    this.querySelector("#remove").addEventListener('click', this.appRemove.bind(this))
    this.querySelector("#show").addEventListener('click', this.appSee.bind(this))
  }

  appRemove(){
    this.parent.removeMovie(this.getAttribute('id'))
  }

  appSee() {
    this.parent.seeMovie(this.getAttribute('id'))
  }

}

customElements.define('app-row', AppRow, {extends: 'tr'})
