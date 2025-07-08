'use client';

import dynamic from 'next/dynamic';

const RaceMap = dynamic(() => import('./RaceMap'), { ssr: false });

const MapWrapper = ({ races }: {
    races: {
        Circuit: {
            Location: {
                lat: string;
                long: string;
                locality: string;
                country: string;
            };
        };
    }[];
}) => {
    const circuitLocations = races.map(race => ({
        Circuit: {
            Location: race.Circuit.Location
        }
    }));

    return <RaceMap circuitLocations={circuitLocations} />;
};

export default MapWrapper;