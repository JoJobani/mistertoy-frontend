import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { toyService } from "../services/toy.service.js"
import { ToyMsgs } from "../cmps/ToyMsgs.jsx"

import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export function ToyDetails() {
    const navigate = useNavigate()
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        loadToy()
    }, [toyId, toy])

    async function loadToy() {
        try {
            let toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues getting toy details ', err)
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <div className="back-btn">
                <Button
                    variant="text"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{
                        color: '#000000',
                        '&:hover': { color: '#000000' }
                    }}>
                    Back
                </Button>
            </div>
            <h1>{toy.name}</h1>
            <h3>Price: <span>${toy.price.toLocaleString()}</span></h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo laboriosam sunt vero, vitae ducimus ullam quis explicabo neque quam voluptate numquam quibusdam repellendus veniam saepe? Molestias, assumenda! Similique, praesentium facilis?</p>

            <div className="toy-labels">
                <h5>Labels:</h5>
                <ul>
                    {toy.labels.map((label, index) => (
                        <li key={index}>{label}</li>
                    ))}
                </ul>
            </div>
            <h3 className={toy.inStock ? 'green' : 'red'}>{toy.inStock ?
                'Toy in stock!' :
                'Toy currently not in stock'}</h3>
            {user && user.isAdmin &&
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    href={`/toy/edit/${toy._id}`}>
                    Edit toy
                </Button>
            }
            <ToyMsgs toy={toy} />
        </section>
    )

}