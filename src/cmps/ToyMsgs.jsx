import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useState } from "react"
import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"

import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

export function ToyMsgs({ toy }) {
    const [msg, setMsg] = useState(utilService.getEmptyMsg())
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onRemoveMsg(msgId) {
        try {
            await toyService.removeToyMsg(toy._id, msgId)
            showSuccessMsg('Message removed!')
        } catch (err) {
            showErrorMsg('Couldnt remove message')
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            await toyService.addToyMsg(toy._id, msg.txt)
            setMsg(utilService.getEmptyMsg())
            showSuccessMsg('Message saved!')
        } catch (err) {
            showErrorMsg('Couldnt add message')
        }
    }

    return (
        <section className="toy-texts">
            <h2>Messages:</h2>
            {user &&
                <form
                    onSubmit={onSaveMsg}>
                    <input
                        type="text"
                        onChange={handleMsgChange}
                        name="txt"
                        value={msg.txt}
                        placeholder="Type message..."
                        required
                    />
                </form>
            }
            <ul>
                {toy.msgs && toy.msgs.map((msg) => (
                    <li key={msg.id}>
                        {msg.by.fullname} - {msg.txt}
                        {user &&
                            (user.isAdmin || user._id === msg.by._id) &&
                            <IconButton
                                size="small"
                                onClick={() => onRemoveMsg(msg.id)}>
                                <DeleteIcon />
                            </IconButton>}
                    </li>
                ))}
            </ul>
        </section>
    )
}