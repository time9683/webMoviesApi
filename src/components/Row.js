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
        <button id="show">ver</button>
        <button id="remove">Eliminar</button>
      </td>
    `
    // agregar eventos a los botones xd
    this.querySelector("#remove").addEventListener('click', this.appRemove.bind(this))
  }

  appRemove(){
    this.parent.removeMovie(this.getAttribute('id'))
  }

}

customElements.define('app-row', AppRow, {extends: 'tr'})
