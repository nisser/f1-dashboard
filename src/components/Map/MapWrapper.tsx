'use client';

import dynamic from 'next/dynamic';

// Dynamically load client-only component
const RaceMap = dynamic(() => import('./RaceMap'), { ssr: false });

const MapWrapper = () => <RaceMap />;

export default MapWrapper;
