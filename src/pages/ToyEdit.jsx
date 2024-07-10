import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()

    const labels = toyService.getToyLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issue in toy edit loading ', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function handleLabelChange({ target }) {
        const value = target.value
        setToyToEdit(prevToy => {
            const newLabels = prevToy.labels.includes(value)
                ? prevToy.labels.filter(label => label !== value)
                : [...prevToy.labels, value]
            return { ...prevToy, labels: newLabels }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issue in saving toy ', err)
                showErrorMsg('Had issues in toy edit')
            })
    }

    const { name, price, labels: selectedLabels } = toyToEdit

    if (toyId && toyToEdit._id !== toyId) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name: </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="price">Price : </label>
                <input type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={handleChange}
                    min={0}
                    required
                />

                <label>Labels:</label>
                <div className="labels-container">
                    {labels.map(label => (
                        <div key={label}>
                            <input
                                type="checkbox"
                                id={label}
                                value={label}
                                checked={selectedLabels.includes(label)}
                                onChange={handleLabelChange}
                            />
                            <label htmlFor={label}>{label}</label>
                        </div>
                    ))}
                </div>

                <div>
                    <button className="btn">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}