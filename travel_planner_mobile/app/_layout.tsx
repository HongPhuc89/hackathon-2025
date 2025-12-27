import { Slot, SplashScreen } from 'expo-router'
import { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync()
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <Slot />
      </PortalProvider>
    </GestureHandlerRootView>
  )
}
