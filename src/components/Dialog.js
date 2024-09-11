class AppDialog extends HTMLDialogElement{

  constructor(){
    super()
  }

  connectedCallback(){

    this.innerHTML = /*html*/`
      <div id='child' class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <!-- Modal Content -->
        <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="p-6 border-b border-gray-200">
            <h2 id="title" class="text-2xl font-bold text-gray-800"></h2>
          </div>
          
          <!-- Modal Body -->
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- Movie Poster -->
              <div class="col-span-1">
                <img id="poster" src="/placeholder.svg?height=450&width=300" alt="Movie Poster" class="w-full rounded-lg shadow-md">
              </div>
              
              <!-- Movie Details -->
              <div class="col-span-1 md:col-span-2 space-y-4">
                <div>
                  <h3 class="text-lg font-semibold text-gray-700">Genre</h3>
                  <div id="genre" class="flex flex-wrap gap-2 mt-1"></div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-700">Rating</h3>
                  <p id="rating" class="text-gray-600"></p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-700">Director</h3>
                  <p id="director" class="text-gray-600"></p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-700">Cast</h3>
                  <p id="cast" class="text-gray-600"></p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-700">Plot</h3>
                  <p id="plot" class="text-gray-600"></p>
                </div>
              </div>
            </div>
            
            <!-- Additional Details -->
            <div class="mt-6 space-y-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Trailer</h3>
                <a id="trailer" href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">Watch Trailer</a>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Runtime</h3>
                <p id="runtime" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Awards</h3>
                <p id="awards" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Country</h3>
                <p id="country" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Language</h3>
                <p id="language" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Box Office</h3>
                <p id="boxOffice" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Production</h3>
                <p id="production" class="text-gray-600"></p>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-700">Website</h3>
                <a id="website" href="#" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline"></a>
              </div>
            </div>
          </div>
          
          <!-- Modal Footer -->
          <div class="p-6 border-t border-gray-200 flex justify-end">
            <button id="close" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">Close</button>
          </div>
        </div>
      </div>
    `
    this.querySelector("#close").addEventListener('click',this.closeDialog.bind(this))
  // detect esc key
    this.addEventListener('keydown',event=>{
      if(event.key === 'Escape'){
        this.closeDialog(event)
      }
    })
  }

  closeDialog(event){
    event.preventDefault()
    
    const child = this.querySelector("#child")
    child.classList.add('close')

    this.querySelector("#child").addEventListener('animationend',()=>{
      this.close()
      this.querySelector("#child").classList.remove('close')
    }
    ,{once:true})
  }


  updateData(movieInfo){
    const { title, poster, genre, rating, director, actors, plot, trailer, runtime, awards, country, language, boxOffice, production, website } = movieInfo;

    this.querySelector("#title").textContent = title || 'N/A';
    this.querySelector("#poster").src = poster || '/placeholder.svg?height=450&width=300';
    this.querySelector("#genre").innerHTML = genre ? genre.map(g => `<span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">${g}</span>`).join(' ') : 'N/A';
    this.querySelector("#rating").textContent = rating || 'N/A';
    this.querySelector("#director").textContent = director || 'N/A';
    // actors is an array
    this.querySelector("#cast").textContent = actors ? actors.join(', ') : 'N/A';
    this.querySelector("#plot").textContent = plot || 'N/A';
    this.querySelector("#trailer").href = trailer || '#';
    this.querySelector("#runtime").textContent = `${runtime} min` || 'N/A';
    this.querySelector("#awards").textContent = awards || 'N/A';
    this.querySelector("#country").textContent = country || 'N/A';
    this.querySelector("#language").textContent = language || 'N/A';
    this.querySelector("#boxOffice").textContent = boxOffice || 'N/A';
    this.querySelector("#production").textContent = production || 'N/A';
    this.querySelector("#website").href = website || '#';
    this.querySelector("#website").textContent = website || 'N/A';
   
  }
}


customElements.define("app-dialog",AppDialog,{
  extends:"dialog"
})

