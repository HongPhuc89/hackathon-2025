import { create } from 'zustand'
import { SavedTrip, FilterState, UserType, TravelStyle, BudgetLevel } from '@shared/types'

interface AppState {
  // Auth
  user: string | null
  isAuthenticated: boolean
  login: (email: string) => void
  logout: () => void

  // Onboarding
  hasCompletedOnboarding: boolean
  completeOnboarding: () => void

  // Trips
  savedTrips: SavedTrip[]
  addTrip: (trip: SavedTrip) => void
  removeTrip: (tripId: string) => void

  // Current filter
  currentFilter: FilterState | null
  setFilter: (filter: FilterState) => void
  clearFilter: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  user: null,
  isAuthenticated: false,
  login: (email: string) =>
    set({
      user: email,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  // Onboarding
  hasCompletedOnboarding: false,
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),

  // Trips
  savedTrips: [],
  addTrip: (trip: SavedTrip) =>
    set((state) => ({
      savedTrips: [...state.savedTrips, trip],
    })),
  removeTrip: (tripId: string) =>
    set((state) => ({
      savedTrips: state.savedTrips.filter((t) => t.id !== tripId),
    })),

  // Current filter
  currentFilter: null,
  setFilter: (filter: FilterState) => set({ currentFilter: filter }),
  clearFilter: () => set({ currentFilter: null }),
}))
