import Button from '@mui/material/Button'

import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li key={toy._id}>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => onRemoveToy(toy._id)}
                        sx={{ width: "fit-content", color: 'red', size: 'small' }}
                        size='small'
                    >
                        X
                    </Button>
                    <ToyPreview toy={toy} />
                </li>
            )}
        </ul>
    )
}