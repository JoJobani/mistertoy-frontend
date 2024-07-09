import { ToyPreview } from "./ToyPreview"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-controls">
                        <button onClick={() => onRemoveToy(toy._id)}>X</button>
                        &nbsp; | &nbsp;
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>
                </li>
            )}
        </ul>
    )
}