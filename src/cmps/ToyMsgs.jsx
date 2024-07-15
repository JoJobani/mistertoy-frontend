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

    async function onRemoveMsg(msgId) {
        await toyService.removeToyMsg(toy._id, msgId)
        showSuccessMsg('Msg removed!')
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        await toyService.addToyMsg(toy._id, msg.txt)
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    return (
        <section className="toy-msgs">
            <h2>Messages:</h2>
            {user &&
                <form>
                    <input
                        type="text"
                        onChange={handleMsgChange}
                        onSubmit={onSaveMsg}
                        name="txt"
                        value={msg.txt}
                        placeholder="Type message..."
                    />
                </form>
            }
            <ul>
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