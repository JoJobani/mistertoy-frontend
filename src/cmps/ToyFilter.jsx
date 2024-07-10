import { useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { ToySort } from "./ToySort.jsx"

export function ToyFilter({ filterBy, onSetFilter, sortBy, onSetSort }) {
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

    const { txt, inStock, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <h2>Toys filter/sort</h2>
            <form>
                <div className="name-field">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="txt"
                        placeholder="Search toy name..."
                        value={txt}
                        onChange={handleChange}
                    />
                </div>

                <div className="price-field">
                    <label htmlFor="maxPrice">Max price:</label>
                    <input type="number"
                        id="maxPrice"
                        name="maxPrice"
                        placeholder="Max price"
                        value={filterByToEdit.maxPrice || ''}
                        onChange={handleChange}
                    />
                </div>

                <div className="stock-field">
                    <label htmlFor="inStock">In stock:</label>
                    <select name="inStock" value={inStock || ''} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="true">In stock</option>
                        <option value="false">Not in stock</option>
                    </select>
                </div>

                <div className="labels-field">
                    <label htmlFor="labels">Labels:</label>
                    <select
                        multiple
                        name="labels"
                        value={labels || []}
                        onChange={handleChange}
                    >
                        <option value="">Labels</option>
                        <>
                            {toyLabels.map(label => (
                                <option key={label} value={label}>
                                    {label}
                                </option>
                            ))}
                        </>
                    </select>
                </div>
            </form>
            <ToySort sortBy={sortBy} onSetSort={onSetSort} />
        </section>
    )

}