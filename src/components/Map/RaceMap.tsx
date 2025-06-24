'use client';

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function RaceMap() {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const leafletMap = useRef<L.Map | null>(null);

    useEffect(() => {
        if (mapRef.current && !leafletMap.current) {
            leafletMap.current = L.map(mapRef.current, {
                zoomControl: false,
            }).setView([51.505, -0.09], 13);

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS community',
            }).addTo(leafletMap.current);
        }

        // Force map to recalc size after a tick
        setTimeout(() => {
            leafletMap.current?.invalidateSize();
        }, 0);

        return () => {
            if (leafletMap.current) {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, []);

    return (
        <section
            className="md:fixed md:right-0 md:bottom-0 ml-auto
            h-[calc(50vh-40px)] w-full md:w-1/3 overflow-y-auto p-2
            rounded-lg shadow-lg bg-black/40 mr-[4px] mb-[4px]
            border-[4px] md:border-0 mt-[4px]"
        >
            <div
                ref={mapRef}
                className="w-full h-full rounded-xl"
            />
        </section>
    );
}
