import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {
    return (
        <Link to={`/toy/${toy._id}`} className="toy-preview">
            <h4>{toy.name}</h4>
            <img
                src={`https://robohash.org/${toy.name}.png?set=set3`}
                alt={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            <h1 className={toy.inStock ? 'green' : 'red'}>
                {toy.inStock ? 'In stock' : 'Not in stock'}
            </h1>
        </Link>
    )
}