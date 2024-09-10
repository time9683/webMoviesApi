import '../style.css'
import "./components/Table.js"
import "./components/Row.js"
import { $ } from './utils.js'



$("#app").innerHTML = /*html*/ `

<div class="bg-[#111] min-h-screen grid text-white justify-center p-4 ">
<dialog id="details"> </dialog>
<div class="flex justify-center">
    <div class="w-2/4">
        <canvas id="barPlot" class="w-10"></canvas>
    </div>
    <div class="w-2/4">
        <canvas id="doughnutPlot" class="w-10"></canvas>
    </div>
</div>
<app-table class=""></app-table>



</div>

`
