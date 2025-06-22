'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

type RaceMapProps = {
    lat: number
    lon: number
    name: string
}

const position = [51.505, -0.09]

export default function RaceMap({ lat, lon, name }: RaceMapProps) {
    return (
        <div className="h-64 w-full rounded-lg overflow-hidden">
            <MapContainer>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
