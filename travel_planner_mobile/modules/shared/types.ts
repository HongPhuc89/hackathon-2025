export enum UserType {
  FAMILY = 'Gia đình',
  COUPLE = 'Cặp đôi',
  SOLO = 'Một mình',
  FRIENDS = 'Nhóm bạn',
}

export enum TravelStyle {
  RELAXED = 'Thư giãn',
  ACTIVE = 'Năng động',
  CULTURAL = 'Văn hóa',
  SHOPPING = 'Mua sắm',
}

export enum BudgetLevel {
  BUDGET = 1,
  MODERATE = 2,
  LUXURY = 3,
}

export interface Coordinates {
  lat: number
  lng: number
}

export interface Location {
  id: string
  name: string
  address: string
  description: string
  tags: string[]
  costLevel: number // 1-3
  coordinates: Coordinates
  suitability: {
    [key in UserType]: number // 0-10 score
  }
  durationMin: number
  imageUrl: string
}

export interface Hotel {
  id: string
  name: string
  address: string
  city: string
  stars: number
  costLevel: number
  tags: string[]
  imageUrl: string
}

export interface FilterState {
  origin: string
  destination: string
  userType: UserType
  durationDays: number
  style: TravelStyle
  budget: BudgetLevel
}

export interface ItineraryItem {
  location: Location
  timeSlot: string
}

export interface DailyItinerary {
  day: number
  items: ItineraryItem[]
}

export interface ItineraryPackage {
  id: string
  name: string
  description: string
  tags: string[]
  days: DailyItinerary[]
  hotel: Hotel
  totalCost: number
  score: number
}

export interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp?: number
}

export interface SavedTrip {
  id: string
  name: string
  hotel: Hotel
  days: DailyItinerary[]
  totalCost: number
  createdAt: number
}
