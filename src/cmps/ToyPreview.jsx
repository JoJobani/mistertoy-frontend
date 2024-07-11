export function ToyPreview({ toy }) {
    return (
        <article>
            <h4 className="toy-name">{toy.name}</h4>
            <img
                src={`https://robohash.org/${toy.name}.png?set=set3`}
                alt={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
        </article>
    )
}