import '../style.css'
import "./components/Table.js"
import "./components/Row.js"
import { $ } from './utils.js'



$("#app").innerHTML = /*html*/ `

<div class="bg-[#111] min-h-screen grid text-white justify-center p-4 ">
<dialog id="details"> </dialog>

<app-table class=""></app-table>

<canvas id="plot" class="w-full h-96"></canvas>

</div>

`
