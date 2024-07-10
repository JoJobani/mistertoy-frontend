import Button from '@mui/material/Button'

import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-controls">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onRemoveToy(toy._id)}
                            sx={{ width: "fit-content", m: 1 }}
                            size='small'
                        >
                            X
                        </Button>
                        &nbsp; | &nbsp;
                        <Button
                            variant="contained"
                            href={`/toy/${toy._id}`}
                            color="primary"
                            sx={{ width: "fit-content", m: 1 }}
                            size='small'
                        >
                            Details
                        </Button>
                    </div>
                </li>
            )}
        </ul>
    )
}