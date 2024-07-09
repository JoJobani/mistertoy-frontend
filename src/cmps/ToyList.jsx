import { Link } from "react-router-dom"

import { ToyPreview } from "./ToyPreview"


export function ToyList({ toys, onRemoveToy, onEditToy }) {
    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div className="toy-controls">
                        <button className="btn" onClick={() => onRemoveToy(toy._id)}>X</button>
                        &nbsp; | &nbsp;
                        <button className="btn" onClick={() => onEditToy(toy)}>Edit</button>
                        &nbsp; | &nbsp;
                        <Link to={`/toy/${toy._id}`} className="btn">Details</Link>
                    </div>
                </li>
            )}
        </ul>
    )
}