import { $ } from './utils.js'
import { Chart } from 'chart.js/auto'


export function updatePlot (movies) {
    const plotType = 'doughnut'
    // Get and clean the canvas
    const canvas = $('#plotCanvas')
    var chart = Chart.getChart('plotCanvas')
    chart?.destroy()

    // Extract the awards and titles from each movie
    const awards = movies.map((movie) => 
        movie.awards.includes('Won') ? parseInt(movie.awards.split(' ')[1]) : 0)
    const titles = movies.map((movie) => movie.title)

    new Chart(canvas, {
        type: plotType,
        data: {
            labels: titles,
            datasets: [{
                label: 'Óscars',
                data: awards
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }  
        }
    })
}
