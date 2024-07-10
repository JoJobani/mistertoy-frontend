import * as React from 'react'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
    const checkedIcon = <CheckBoxIcon fontSize="small" />
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
        let { value, type, name: field, checked } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
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

    const { name, price, labels: selectedLabels, inStock } = toyToEdit

    if (toyId && toyToEdit._id !== toyId) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <form onSubmit={onSaveToy}>
                <TextField
                    id="name"
                    label="Toy name"
                    variant="outlined"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    size="small"
                    required
                />

                <TextField
                    name="price"
                    id="price"
                    label="Price"
                    variant="outlined"
                    type="number"
                    onChange={handleChange}
                    value={price}
                    size="small"
                    required
                />

                <label>Labels:</label>
                <Autocomplete
                    multiple
                    id="labels"
                    size="small"
                    options={labels}
                    value={selectedLabels}
                    onChange={(ev, newLabels) => {
                        setToyToEdit(prevToy => ({ ...prevToy, labels: newLabels }));
                    }}
                    getOptionLabel={(option) => option.toString()}
                    disableCloseOnSelect
                    renderOption={(props, option, { selected }) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option}
                            </li>
                        )
                    }}
                    style={{ width: 200 }}
                    renderInput={(params) => (
                        <TextField {...params} placeholder="Choose labels" />
                    )}
                />

                <FormControlLabel
                    control={<Checkbox
                        name="inStock"
                        checked={inStock}
                        onChange={handleChange} />}
                    label="In stock?"
                />

                <div>
                    <button className="btn">{toyToEdit._id ? 'Save' : 'Add'}</button>
                    <Link to="/toy">Cancel</Link>
                </div>
            </form>
        </section>
    )
}