import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { useEffect, useState } from "react"

export function ToySort({ sortBy, onSetSort }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        setSortByToEdit(prevSort => ({
            ...prevSort,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    return (
        <>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="sortBy">Sort</InputLabel>
                <Select
                    labelId="sortBy"
                    id="sortBy"
                    name='sortBy'
                    value={sortByToEdit.sortBy}
                    label="Sort"
                    onChange={handleChange}
                >
                    <MenuItem value="none">Default</MenuItem>
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                    <MenuItem value="createdAt">Date</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={sortByToEdit.desc}
                        onChange={handleChange}
                        name="desc"
                    />
                }
                label="Descending"
            />
        </>
    )
}