import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"

function getEmptyMsg() {
    return {
        txt: '',
    }
}

export function ToyDetails() {
    const navigate = useNavigate()
    const [msg, setMsg] = useState(getEmptyMsg())
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

    async function onAddToyMsg(toyId) {
        try {
            await toyService.addToyMsg(toyId, 'bla bla ' + parseInt(Math.random() * 10))
            showSuccessMsg(`toy msg added`)
        } catch (err) {
            console.log(err)
            showErrorMsg('Cannot add toy msg ')
        }
    }

    async function onRemoveMsg(msgId) {
        const removedMsgId = await toyService.removeToyMsg(toy._id, msgId)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
        }))
        showSuccessMsg('Msg removed!')
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(toy._id, msg.txt)
        setToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
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

            <h3>{toy.inStock ? 'Toy in stock!' : 'Toy currently not in stock'}</h3>
            {user && user.isAdmin &&
                <Link to={`/toy/edit/${toy._id}`} className="btn">Edit</Link>
            }
            <Link to={`/toy`} className="btn">Back</Link>
            <section className="toy-msgs">
                <button onClick={() => { onAddToyMsg(toy._id) }}>Add toy msg</button>
                <ul>
                    {toy.msgs &&
                        toy.msgs.map((msg) => (
                            <li key={msg.id}>
                                By: {msg.by.fullname} - {msg.txt}
                                <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                                    X
                                </button>
                            </li>
                        ))}
                </ul>
            </section>
        </section>
    )

}