# WanderPlan Mobile - Development Guide

## 🏗️ Kiến trúc

### Expo Router (File-based Routing)

App sử dụng Expo Router với cấu trúc như sau:

```
app/
├── _layout.tsx           # Root layout (GestureHandler, Portal)
├── index.tsx             # Entry point (routing logic)
├── onboarding.tsx        # Onboarding screen
├── auth.tsx              # Authentication screen
└── (app)/                # Authenticated routes group
    ├── _layout.tsx       # App layout (Stack navigation)
    ├── trips.tsx         # My trips screen
    ├── chat.tsx          # AI chat screen
    └── itinerary.tsx     # Itinerary detail screen
```

### State Management (Zustand)

Store được tổ chức theo features:

```typescript
// modules/shared/store.ts
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
```

### Module Structure

```
modules/
├── features/              # Feature-specific code
│   └── (future features)
└── shared/                # Shared across features
    ├── components/        # Reusable UI components
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   └── index.ts
    ├── types.ts           # TypeScript types
    ├── theme.ts           # Design tokens
    ├── constants.ts       # App constants
    ├── store.ts           # Zustand store
    └── index.ts           # Barrel export
```

## 🎨 Design System

### Colors

```typescript
COLORS = {
  primary: '#6366F1',      // Indigo
  secondary: '#EC4899',    // Pink
  accent: '#F59E0B',       // Amber
  neutralText: '#1F2937',  // Gray-800
  neutralBg: '#F9FAFB',    // Gray-50
  // ... more colors
}
```

### Spacing

```typescript
SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}
```

### Typography

```typescript
FONT_SIZE = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  huge: 32,
}

FONT_WEIGHT = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  black: '900',
}
```

## 📱 Screens

### 1. Onboarding Screen
- Giới thiệu app
- Hiển thị features chính
- Button "Bắt đầu ngay"

### 2. Auth Screen
- Form đăng nhập
- Email + Password
- Toggle show/hide password
- Link "Quên mật khẩu"

### 3. Trips Screen
- Danh sách chuyến đi đã lưu
- Empty state
- Button "Lên lịch mới"
- Logout button

### 4. Chat Screen
- Conversational UI với AI
- Progress bar (6 steps)
- Quick replies
- Text input (cho destination/origin)
- Typing indicator

### 5. Itinerary Screen
- Loading state
- Hotel card
- Day selector
- Location cards
- Save button

## 🔧 Development Workflow

### 1. Tạo Screen Mới

```typescript
// app/(app)/new-screen.tsx
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SPACING } from '@shared/theme'

export default function NewScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.neutralBg }}>
      {/* Your content */}
    </SafeAreaView>
  )
}
```

### 2. Tạo Component Mới

```typescript
// modules/shared/components/NewComponent.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SPACING, FONT_SIZE } from '@shared/theme'

interface NewComponentProps {
  title: string
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '900',
    color: COLORS.neutralText,
  },
})
```

### 3. Thêm State vào Store

```typescript
// modules/shared/store.ts
interface AppState {
  // ... existing state
  
  // New feature
  newFeature: string | null
  setNewFeature: (value: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  // ... existing state
  
  newFeature: null,
  setNewFeature: (value) => set({ newFeature: value }),
}))
```

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Run on simulator
npm run ios
npm run android

# Clear cache
npm run reset
```

## 📦 Build

```bash
# Development build
npx expo prebuild

# Production build
eas build --platform ios
eas build --platform android
```

## 🚀 Deployment

1. Update version in `package.json`
2. Update version in `app.config.ts`
3. Build with EAS
4. Submit to stores

## 💡 Best Practices

### 1. Imports
Sử dụng module aliases:
```typescript
import { Button } from '@shared/components'
import { COLORS } from '@shared/theme'
import { useAppStore } from '@shared/store'
```

### 2. Styling
Sử dụng design tokens:
```typescript
const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,        // ✅ Good
    // padding: 16,              // ❌ Bad
    backgroundColor: COLORS.white, // ✅ Good
    // backgroundColor: '#fff',  // ❌ Bad
  },
})
```

### 3. TypeScript
Luôn define types:
```typescript
interface Props {
  title: string
  onPress: () => void
}

const Component: React.FC<Props> = ({ title, onPress }) => {
  // ...
}
```

### 4. State Management
Sử dụng Zustand cho global state, useState cho local state:
```typescript
// Global state
const user = useAppStore((state) => state.user)

// Local state
const [isOpen, setIsOpen] = useState(false)
```

## 🔗 Resources

- [Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [React Native Docs](https://reactnative.dev/)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
