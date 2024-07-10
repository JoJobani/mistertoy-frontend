import React from "react"
import GoogleMapReact from "google-map-react"

const AnyReactComponent = ({ loc }) => <div className="marker">{loc}</div>;

export function About() {
    const zoom = 9
    const locations = [
        { lat: 32.0853, lng: 34.7818 },
        { lat: 32.0722, lng: 34.8265 },
        { lat: 32.1658, lng: 34.8455 },
        { lat: 32.4343, lng: 34.9196 },
        { lat: 32.5735, lng: 34.9512 },
    ]

    return (
        <section className="about">
            <h1>Our locations:</h1>
            <div className="map" style={{ height: '65vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBmOoIOdOQXCXs0HDPk0OzBpCCRDWwE3qQ" }}
                    center={{ lat: 32.1658, lng: 34.8455 }}
                    defaultZoom={zoom}
                >
                    {locations.map(location => (
                        <AnyReactComponent
                            key={`${location.lat}-${location.lng}`}
                            lat={location.lat}
                            lng={location.lng}
                            loc="📍"
                        />
                    ))}
                </GoogleMapReact>
            </div>
        </section>
    )
}