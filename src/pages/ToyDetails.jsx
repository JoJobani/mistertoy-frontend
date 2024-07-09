import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// import {toyService} from "../services/toy.service.js"
import {toyService} from "../services/toy.front-service.js"

export function ToyDetails(){
    const navigate = useNavigate()
    const [toy,setToy] = useState(null)
    const {toyId} = useParams()

    useEffect(()=> {
        if (toyId) loadToy()
    },[toyId])

    function loadToy(){
        toyService.getById(toyId)
            .then (toy => setToy(toy))
            .catch (err => {
                console.log('Had issues getting toy details ', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: {toy.price}</h5>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo laboriosam sunt vero, vitae ducimus ullam quis explicabo neque quam voluptate numquam quibusdam repellendus veniam saepe? Molestias, assumenda! Similique, praesentium facilis?</p>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link to={`/toy`}>Back</Link>
        </section>
    )

}