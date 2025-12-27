import { Stack } from 'expo-router'

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="trips" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="itinerary" />
      <Stack.Screen name="review" />
    </Stack>
  )
}
