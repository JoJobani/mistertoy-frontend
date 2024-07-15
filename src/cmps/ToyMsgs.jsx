import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { useState } from "react"
import { toyService } from "../services/toy.service.js"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service.js"

function getEmptyMsg() {
    return {
        txt: '',
    }
}

export function ToyMsgs({ toy }) {
    const [msg, setMsg] = useState(getEmptyMsg())
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onAddToyMsg() {
        try {
            await toyService.addToyMsg(toy._id, utilService.makeLorem(8))
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

    return (
        <section className="toy-msgs">
            {user &&
                <button onClick={() => { onAddToyMsg(toy._id) }}>Add toy msg</button>
            }            <ul>
                {toy.msgs &&
                    toy.msgs.map((msg) => (
                        <li key={msg.id}>
                            {msg.by.fullname} - {msg.txt}
                            {user &&
                                (user.isAdmin || user._id === msg.by._id) &&
                                <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                                    X
                                </button>}
                        </li>
                    ))}
            </ul>
        </section>
    )
}