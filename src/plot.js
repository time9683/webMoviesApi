import { $ } from './utils.js'
import { Chart } from 'chart.js/auto'


export function updatePlot (movies) {
    // Get and clean the canvas
    const barCanvas = $('#barPlot')
    const doughnutCanvas = $('#doughnutPlot')
    var barChart = Chart.getChart('barPlot')
    var doughnutChart = Chart.getChart('doughnutPlot')
    barChart?.destroy()
    doughnutChart?.destroy()


    // Extract the awards and titles from each movie
    const awards = movies.map((movie) => 
        movie.awards.includes('Won') ? parseInt(movie.awards.split(' ')[1]) : 0)
    const titles = movies.map((movie) => movie.title)

    // Plot the data
    /*
    new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: titles,
            datasets: [{
                label: 'Premios',
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
    */
    new Chart(doughnutCanvas, {
        type: 'doughnut',
        data: {
            labels: titles,
            datasets: [{
                label: 'Premios',
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

// TODO: Entregar las peliculas filtradas, no todas las pelis, para que se actualice cada que se filtre