'use client'

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useMapStore } from "@/lib/mapStore"

type CircuitLocations = {
    Circuit: {
        Location: {
            lat: string
            long: string
            locality: string
            country: string
        }
    }
}

export default function RaceMap({ circuitLocations }: { circuitLocations: CircuitLocations[] }) {
    const mapRef = useRef<HTMLDivElement | null>(null)
    const leafletMap = useRef<L.Map | null>(null)
    const markersRef = useRef<L.CircleMarker[]>([])
    const { focus } = useMapStore()

    const locations = circuitLocations.map((location) => ({
        lat: parseFloat(location.Circuit.Location.lat),
        long: parseFloat(location.Circuit.Location.long),
        locality: location.Circuit.Location.locality,
        country: location.Circuit.Location.country,
    }))

    useEffect(() => {
        if (mapRef.current && !leafletMap.current) {
            leafletMap.current = L.map(mapRef.current, {
                zoomControl: false,
                worldCopyJump: false,
                maxBoundsViscosity: 1.0,
                maxBounds: [
                    [-85, -180],
                    [85, 180]
                ],
            }).setView([26.5, 29.5], 1)

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS community',
            }).addTo(leafletMap.current)

            // Create markers
            markersRef.current = locations.map(({ lat, long, locality, country }) => {
                const marker = L.circleMarker([lat, long], {
                    radius: 2,
                    color: '#ddd',
                    fillColor: '#fff',
                    fillOpacity: 1,
                    weight: 1,
                });

                marker.bindPopup(`${locality}, ${country}`, {
                    closeButton: false,
                    offset: L.point(0, -6),
                    className: 'custom-popup',
                });

                marker.on('click', () => {
                    leafletMap.current?.flyTo([lat, long], 15, {
                        duration: 1.5,
                        easeLinearity: 0.25,
                    });
                });

                marker.on('mouseover', () => marker.openPopup());
                marker.on('mouseout', () => marker.closePopup());

                marker.addTo(leafletMap.current!);

                return marker;
            });


            // Function to toggle markers based on zoom level
            const toggleMarkers = () => {
                if (!leafletMap.current) return
                const zoom = leafletMap.current.getZoom()
                if (zoom <= 11) {
                    // Add all markers if not already added
                    markersRef.current.forEach(marker => {
                        if (!leafletMap.current!.hasLayer(marker)) {
                            marker.addTo(leafletMap.current!)
                        }
                    })
                } else {
                    // Remove all markers
                    markersRef.current.forEach(marker => {
                        if (leafletMap.current!.hasLayer(marker)) {
                            leafletMap.current!.removeLayer(marker)
                        }
                    })
                }
            }

            // Initial toggle based on starting zoom
            toggleMarkers()

            // Listen for zoom changes
            leafletMap.current.on('zoomend', toggleMarkers)
        }

        setTimeout(() => {
            leafletMap.current?.invalidateSize()
        }, 0)

        return () => {
            if (leafletMap.current) {
                leafletMap.current.off('zoomend')
                leafletMap.current.remove()
                leafletMap.current = null
            }
        }
    }, [])

    useEffect(() => {
        if (leafletMap.current && focus) {
            leafletMap.current.flyTo([focus.lat, focus.long], 15, {
                duration: 1.5,
                easeLinearity: 0.25,
            })
        }
    }, [focus])

    return (
        <section className="side-panel">
            <div
                ref={mapRef}
                className="w-full h-full rounded-xl"
                style={{ backgroundColor: '#333' }}
            />
        </section>
    )
}
