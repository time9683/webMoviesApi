import '../style.css'
import "./components/Table.js"
import "./components/Row.js"
import "./components/Dialog.js"
import { $ } from './utils.js'

{/* <dialog id="details"> </dialog> */}


$("#app").innerHTML = /*html*/ `

<div class="bg-gray-100 min-h-screen grid text-white justify-center p-4 ">
<dialog is="app-dialog"> </dialog>
<div class="p-6 border-b border-gray-200 mb-4">
    <h1 class="text-4xl font-semibold text-black">Películas .API</h2>
</div>

<!-- Container to center the plot -->
<div class="mb-4 border-gray-200 border-b pb-8">
    <h2 class="text-2xl text-black font-semibold text-center mb-4">Óscars por película</h2>
    <!-- Plot container -->
    <div class="w-1/3 m-auto">
        <canvas id="plotCanvas" class="w-10"></canvas>
    </div>
</div>

<h2 class="text-2xl font-semibold text-center pb-4 text-black"> Listado de películas </h2>
<app-table class=""></app-table>



</div>

`
