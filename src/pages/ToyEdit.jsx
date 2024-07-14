import * as React from 'react'
import {
    Button,
    Checkbox,
    TextField,
    Autocomplete
} from '@mui/material'
import * as Yup from 'yup'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
    const checkedIcon = <CheckBoxIcon fontSize="small" />
    const navigate = useNavigate()

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()

    const labels = toyService.getToyLabels()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            let toy = await toyService.getById(toyId)
            setToyToEdit(toy)
        } catch (err) {
            console.log('Had issue in toy edit loading ', err)
            navigate('/toy')
        }
    }

    const ToySchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name too short')
            .max(16, 'Name too long'),
        price: Yup.number()
            .required('Must enter valid price')
            .min(1, 'Price must be at least 1')
    })

    async function onSaveToy(values, { setSubmitting }) {
        try {
            let newToy = await saveToy(values)
            showSuccessMsg('Toy saved!')
            navigate(`/toy/${newToy._id}`)
        } catch (err) {
            console.log('Had issue in saving toy ', err)
            showErrorMsg('Had issues in toy edit')
        } finally {
            setSubmitting(false)
        }
    }

    if (toyId && toyToEdit._id !== toyId) return <div>Loading...</div>
    return (
        <section className="toy-edit">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} toy</h2>

            <Formik
                enableReinitialize
                initialValues={toyToEdit}
                validationSchema={ToySchema}
                onSubmit={onSaveToy}>
                {({ errors, touched, values, handleChange, setFieldValue }) => (
                    <Form>
                        <Field
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            name="name"
                            error={touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            onChange={handleChange}
                            value={values.name}
                        />

                        <Field
                            as={TextField}
                            label="Price"
                            variant="outlined"
                            type="number"
                            name="price"
                            error={touched.price && !!errors.price}
                            helperText={touched.price && errors.price}
                            onChange={handleChange}
                            value={values.price}
                        />

                        <Autocomplete
                            multiple
                            id="labels"
                            options={labels}
                            value={values.labels}
                            onChange={(ev, newLabels) => {
                                setFieldValue("labels", newLabels);
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
                                            checked={selected}
                                        />
                                        {option}
                                    </li>
                                )
                            }}
                            style={{ maxWidth: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} placeholder="Choose labels" />
                            )}
                        />

                        <label>
                            <Field
                                type='checkbox'
                                name="inStock"
                                checked={values.inStock}
                                onChange={handleChange}
                            />
                            In stock?
                        </label>

                        <Button variant="contained" color="primary" type="submit">
                            {toyToEdit._id ? 'Save' : 'Add'}
                        </Button>
                    </Form>
                )}
            </Formik>
            <Button variant="text" color="primary" onClick={() => navigate(-1)}>
                Cancel
            </Button>
        </section>
    )
}