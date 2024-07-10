import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { Bar, Pie } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { loadToys } from "../store/actions/toy.actions.js"
import { useEffect } from "react"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

export function Dashboard() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const labels = toyService.getToyLabels()

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [])

    const priceData = {
        labels: labels,
        datasets: [{
            label: 'Sum of prices per label',
            data: toys ? toyService.getLabelPriceSum(toys) : [],
            backgroundColor: '#087f81'
        }]
    }

    const stockData = {
        labels: labels,
        datasets: [{
            label: 'Toys per label',
            data: toys ? toyService.getLabelStock(toys) : [],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#FF6384',
                '#36A2EB'
            ],
            hoverOffset: 4
        }]
    };

    if (!toys) return <div>Loading...</div>
    return (
        <>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Bar data={priceData} />
            </div>
            <div style={{ width: '80%', margin: 'auto' }}>
                <Pie data={stockData} />
            </div>
        </>
    )
}