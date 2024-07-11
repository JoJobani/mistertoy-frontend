import { useState } from "react"
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import GoogleMapReact from "google-map-react"

const API_KEY = import.meta.env.GOOGLE_MAP_API || 'AIzaSyBmOoIOdOQXCXs0HDPk0OzBpCCRDWwE3qQ'
const Marker = ({ loc }) => <div className="marker">{loc}</div>;

export function About() {
    const [coords, setCoords] = useState({ lat: 32.1658, lng: 34.8455 })
    const [zoom, setZoom] = useState(9)
    const locations = [
        { city: 'Tel Aviv', lat: 32.0853, lng: 34.7818 },
        { city: 'Ramat Gan', lat: 32.0722, lng: 34.8265 },
        { city: 'Herzliya', lat: 32.1658, lng: 34.8455 },
        { city: 'Hadera', lat: 32.4343, lng: 34.9196 },
        { city: 'Zikhron Yaakov', lat: 32.5735, lng: 34.9512 },
    ]

    return (
        <section className="about">
            <h1>Our locations:</h1>
            <div className="locations">
                {locations.map(loc => {
                    return (
                        <Button
                            key={loc.city}
                            variant="outlined"
                            onClick={() => {
                                setCoords(loc)
                                setZoom(12)
                            }}
                            sx={{
                                margin: '5px'
                            }}>
                            {loc.city}
                        </Button>
                    )
                })}
            </div>

            <div className="map" style={{ height: '65vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: API_KEY }}
                    center={coords}
                    zoom={zoom}
                    onClick={({ lat, lng }) => setCoords({ lat, lng })}
                >
                    {locations.map(location => (
                        <Marker
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