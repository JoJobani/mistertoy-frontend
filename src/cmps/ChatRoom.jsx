import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service.js'

export function ChatRoom({ toy }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy.name)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [toy])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedInUser?.fullname
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
    }

    return (
        <section className="toy-texts">
            <h2>Lets Chat about {toy.name}</h2>

            {loggedInUser &&
                <form onSubmit={sendMsg}>
                    <input
                        type="text"
                        value={msg.txt}
                        onChange={handleFormChange}
                        placeholder='Write a message to chat...'
                        name="txt"
                        autoComplete="off" />
                </form>}

            <ul className='chat'>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}