'use client';

import dynamic from 'next/dynamic';

const RaceMap = dynamic(() => import('./RaceMap'), { ssr: false });

const MapWrapper = ({
    circuitLocations,
}: {
    circuitLocations: {
        lat: string;
        long: string;
        locality: string;
        country: string;
    }[];
}) => {
    return <RaceMap circuitLocations={circuitLocations} />;
};

export default MapWrapper;
