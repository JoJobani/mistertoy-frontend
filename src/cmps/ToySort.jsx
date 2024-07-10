import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

import { useEffect, useState } from "react"

export function ToySort({ sortBy, onSetSort }) {
    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        onSetSort(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setSortByToEdit(prevSort => ({
            ...prevSort,
            [field]: field === 'desc' ? -prevSort.desc : value,
        }))
    }

    return (
        <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="sortBy">Sort</InputLabel>
            <Select
                labelId="sortBy"
                id="sortBy"
                value={sortByToEdit.type}
                label="Sort"
                onChange={handleChange}
            >
                <MenuItem value="none">Default</MenuItem>
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="createdAt">Date</MenuItem>
            </Select>
        </FormControl>
    )
}