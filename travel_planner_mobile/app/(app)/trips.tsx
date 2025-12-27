import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@shared/components'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '@shared/theme'
import { useAppStore } from '@shared/store'

export default function TripsScreen() {
    const router = useRouter()
    const { user, savedTrips, logout } = useAppStore()

    const displayName = user?.split('@')[0] || 'User'

    const handleNewTrip = () => {
        router.push('/(app)/chat')
    }

    const handleLogout = () => {
        logout()
        router.replace('/auth')
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Chào, {displayName}! 👋</Text>
                    <Text style={styles.subtitle}>Hành trình nào tiếp theo đây?</Text>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutIcon}>🚪</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>
                        LỊCH TRÌNH ĐÃ LƯU ({savedTrips.length})
                    </Text>
                </View>

                {savedTrips.length > 0 ? (
                    savedTrips.map((trip) => (
                        <TouchableOpacity
                            key={trip.id}
                            style={styles.tripCard}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={{ uri: trip.hotel.imageUrl }}
                                style={styles.tripImage}
                                resizeMode="cover"
                            />
                            <View style={styles.tripInfo}>
                                <Text style={styles.tripName} numberOfLines={1}>
                                    {trip.name}
                                </Text>
                                <View style={styles.tripLocation}>
                                    <Text style={styles.locationIcon}>📍</Text>
                                    <Text style={styles.locationText} numberOfLines={1}>
                                        {trip.hotel.city}
                                    </Text>
                                </View>
                                <View style={styles.tripFooter}>
                                    <View style={styles.daysTag}>
                                        <Text style={styles.daysText}>{trip.days.length} NGÀY</Text>
                                    </View>
                                    <Text style={styles.tripCost}>~{trip.totalCost * 200}k</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIcon}>
                            <Text style={styles.emptyEmoji}>✨</Text>
                        </View>
                        <Text style={styles.emptyText}>Trống trải quá...</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Lên lịch mới"
                    onPress={handleNewTrip}
                    size="lg"
                    style={styles.newTripButton}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.neutralBg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray100,
    },
    greeting: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.neutralText,
    },
    subtitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.gray300,
        marginTop: 2,
    },
    logoutButton: {
        padding: SPACING.sm,
        backgroundColor: COLORS.gray50,
        borderRadius: BORDER_RADIUS.lg,
    },
    logoutIcon: {
        fontSize: 20,
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: SPACING.lg,
    },
    sectionHeader: {
        marginBottom: SPACING.lg,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.gray300,
        letterSpacing: 2,
    },
    tripCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: SPACING.lg,
        overflow: 'hidden',
        ...SHADOWS.md,
    },
    tripImage: {
        width: 80,
        height: 96,
    },
    tripInfo: {
        flex: 1,
        padding: SPACING.md,
        justifyContent: 'space-between',
    },
    tripName: {
        fontSize: FONT_SIZE.lg,
        fontWeight: '900',
        color: COLORS.neutralText,
    },
    tripLocation: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    locationIcon: {
        fontSize: 14,
    },
    locationText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.gray300,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    tripFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.sm,
    },
    daysTag: {
        backgroundColor: COLORS.primary + '0D',
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: BORDER_RADIUS.sm,
        borderWidth: 1,
        borderColor: COLORS.primary + '1A',
    },
    daysText: {
        fontSize: 9,
        fontWeight: '900',
        color: COLORS.primary,
    },
    tripCost: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '900',
        color: COLORS.accent,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: SPACING.xxl * 2,
        backgroundColor: COLORS.white + '80',
        borderRadius: BORDER_RADIUS.xxl,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLORS.gray100,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.md,
        ...SHADOWS.sm,
    },
    emptyEmoji: {
        fontSize: 32,
    },
    emptyText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.gray300,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    footer: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray50,
    },
    newTripButton: {
        width: '100%',
    },
})
