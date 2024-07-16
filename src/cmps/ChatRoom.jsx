import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_USER_TYPING, SOCKET_EVENT_USER_TYPING } from '../services/socket.service.js'

export function ChatRoom({ toy }) {
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [typingUsers, setTypingUsers] = useState([])
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedinUser)

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EVENT_USER_TYPING, handleUserTyping)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, toy.name)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EVENT_USER_TYPING, handleUserTyping)
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
        socketService.emit(SOCKET_EMIT_USER_TYPING, { user: from, isTyping: false })
    }

    function handleUserTyping({ user, isTyping }) {
        setTypingUsers(prevUsers => {
            if (isTyping && !prevUsers.includes(user)) {
                return [...prevUsers, user]
            } else if (!isTyping) {
                return prevUsers.filter(u => u !== user)
            }
            return prevUsers
        })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        socketService.emit(SOCKET_EMIT_USER_TYPING,
            { user: loggedInUser?.fullname, isTyping: value.length > 0 })
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

            {typingUsers.length > 0 && (
                <p>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...</p>
            )}
        </section>
    )
}