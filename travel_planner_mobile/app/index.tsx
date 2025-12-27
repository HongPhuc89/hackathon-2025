import { Redirect } from 'expo-router'
import { useAppStore } from '@shared/store'

export default function Index() {
    const { hasCompletedOnboarding, isAuthenticated } = useAppStore()

    if (!hasCompletedOnboarding) {
        return <Redirect href="/onboarding" />
    }

    if (!isAuthenticated) {
        return <Redirect href="/auth" />
    }

    return <Redirect href="/(app)/trips" />
}
