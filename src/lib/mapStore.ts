import { create } from 'zustand'

type MapStore = {
  focus: { lat: number; long: number } | null
  setFocus: (coords: { lat: number; long: number }) => void
}

export const useMapStore = create<MapStore>((set) => ({
  focus: null,
  setFocus: (coords) => set({ focus: coords }),
}))
