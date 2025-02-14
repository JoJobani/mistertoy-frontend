import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import { ToyPreview } from "./ToyPreview"
import { useSelector } from 'react-redux'

export function ToyList({ toys, onRemoveToy }) {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    {user && user.isAdmin &&
                        <Tooltip title="Delete" arrow>
                            <Button
                                className="remove-button"
                                variant="text"
                                color="secondary"
                                onClick={() => onRemoveToy(toy._id)}
                                sx={{ color: 'red', minWidth: 'auto', padding: '5px' }}
                                size='small'
                            >
                                X
                            </Button>
                        </Tooltip>}
                    <ToyPreview toy={toy} />
                </li>
            )}
        </ul>
    )
}