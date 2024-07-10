import * as React from 'react'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { ToySort } from "./ToySort.jsx"

export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort }) {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
    const checkedIcon = <CheckBoxIcon fontSize="small" />;
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 200))
    const toyLabels = toyService.getToyLabels()

    useEffectUpdate(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'select-multiple') {
            value = Array.from(target.selectedOptions, option => option.value || [])
        }
        value = (type === 'number') ? +value || '' : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    const { txt, inStock, maxPrice } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Toys filter/sort</h2>
            <form>
                <TextField
                    id="name"
                    label="Toy name"
                    variant="outlined"
                    type="text"
                    name="txt"
                    value={txt}
                    onChange={handleChange}
                    size="small" />

                <TextField
                    id="maxPrice"
                    name="maxPrice"
                    label="Max price"
                    variant="outlined"
                    type="number"
                    onChange={handleChange}
                    value={maxPrice || ''}
                    size="small" />

                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel id="inStock">Stock</InputLabel>
                    <Select
                        labelId="inStock"
                        id="inStock"
                        value={inStock || ''}
                        label='Stock'
                        onChange={handleChange}
                    >
                        <MenuItem value=''>All items</MenuItem>
                        <MenuItem value="true">In stock</MenuItem>
                        <MenuItem value="false">Not in stock</MenuItem>
                    </Select>
                </FormControl>

                <Autocomplete
                    multiple
                    id="labels"
                    size="small"
                    options={toyLabels}
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
                        <TextField {...params} label="Labels" placeholder="Choose labels" />
                    )}
                />

            </form>
            <ToySort sortBy={sortBy} onSetSort={onSetSort} />
        </section>
    )

}