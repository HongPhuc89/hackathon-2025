import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '@shared/theme'
import { useAppStore } from '@shared/store'
import { ItineraryPackage, SavedTrip } from '@shared/types'
import { Button } from '@shared/components'

// Mock data generator
const generateMockItinerary = (): ItineraryPackage => {
  return {
    id: Date.now().toString(),
    name: 'Khám phá Đà Nẵng',
    description: 'Lịch trình 3 ngày tại thành phố đáng sống',
    tags: ['Biển', 'Ẩm thực', 'Văn hóa'],
    hotel: {
      id: 'hotel1',
      name: 'Fusion Suites Danang Beach',
      address: 'Võ Nguyên Giáp, Phước Mỹ, Sơn Trà, Đà Nẵng',
      city: 'Đà Nẵng',
      stars: 5,
      costLevel: 2,
      tags: ['Gần biển', 'Spa', 'Hồ bơi'],
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    },
    days: [
      {
        day: 1,
        items: [
          {
            location: {
              id: 'loc1',
              name: 'Bãi biển Mỹ Khê',
              address: 'Đường Võ Nguyên Giáp, Phước Mỹ, Sơn Trà',
              description: 'Một trong những bãi biển đẹp nhất thế giới',
              tags: ['Biển', 'Thư giãn'],
              costLevel: 1,
              coordinates: { lat: 16.0544, lng: 108.2425 },
              suitability: {
                'Gia đình': 9,
                'Cặp đôi': 8,
                'Một mình': 7,
                'Nhóm bạn': 9,
              },
              durationMin: 120,
              imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
            },
            timeSlot: '08:00 - 11:00',
          },
          {
            location: {
              id: 'loc2',
              name: 'Chợ Hàn',
              address: 'Trần Phú, Hải Châu, Đà Nẵng',
              description: 'Chợ truyền thống lớn nhất Đà Nẵng',
              tags: ['Mua sắm', 'Ẩm thực'],
              costLevel: 1,
              coordinates: { lat: 16.0678, lng: 108.2208 },
              suitability: {
                'Gia đình': 8,
                'Cặp đôi': 7,
                'Một mình': 6,
                'Nhóm bạn': 8,
              },
              durationMin: 90,
              imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
            },
            timeSlot: '13:30 - 17:00',
          },
        ],
      },
      {
        day: 2,
        items: [
          {
            location: {
              id: 'loc3',
              name: 'Bà Nà Hills',
              address: 'Hòa Ninh, Hòa Vang, Đà Nẵng',
              description: 'Khu du lịch trên núi với Cầu Vàng nổi tiếng',
              tags: ['Tham quan', 'Văn hóa'],
              costLevel: 3,
              coordinates: { lat: 15.9959, lng: 107.9971 },
              suitability: {
                'Gia đình': 10,
                'Cặp đôi': 9,
                'Một mình': 7,
                'Nhóm bạn': 10,
              },
              durationMin: 480,
              imageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
            },
            timeSlot: '08:00 - 17:00',
          },
        ],
      },
      {
        day: 3,
        items: [
          {
            location: {
              id: 'loc4',
              name: 'Ngũ Hành Sơn',
              address: 'Hòa Hải, Ngũ Hành Sơn, Đà Nẵng',
              description: 'Quần thể núi đá vôi với chùa chiền linh thiêng',
              tags: ['Tâm linh', 'Tham quan'],
              costLevel: 1,
              coordinates: { lat: 16.0019, lng: 108.2625 },
              suitability: {
                'Gia đình': 8,
                'Cặp đôi': 8,
                'Một mình': 9,
                'Nhóm bạn': 7,
              },
              durationMin: 150,
              imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
            },
            timeSlot: '08:00 - 11:00',
          },
        ],
      },
    ],
    totalCost: 15,
    score: 9.2,
  }
}

export default function ItineraryScreen() {
  const router = useRouter()
  const { currentFilter, addTrip } = useAppStore()
  const [isLoading, setIsLoading] = useState(true)
  const [itinerary, setItinerary] = useState<ItineraryPackage | null>(null)
  const [activeDay, setActiveDay] = useState(1)

  React.useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setItinerary(generateMockItinerary())
      setIsLoading(false)
    }, 2000)
  }, [])

  const handleSaveTrip = () => {
    if (!itinerary) return

    const trip: SavedTrip = {
      id: Date.now().toString(),
      name: itinerary.name,
      hotel: itinerary.hotel,
      days: itinerary.days,
      totalCost: itinerary.totalCost,
      createdAt: Date.now(),
    }

    addTrip(trip)
    router.push('/(app)/review')
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <View style={styles.loadingIcon}>
            <Text style={styles.loadingEmoji}>🏝️</Text>
          </View>
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={{ marginTop: SPACING.lg }}
          />
          <Text style={styles.loadingTitle}>Đang kiến tạo...</Text>
          <Text style={styles.loadingText}>
            WanderPlan đang tìm kiếm{'\n'}những trải nghiệm tốt nhất.
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  if (!itinerary) return null

  const currentDay = itinerary.days.find((d) => d.day === activeDay)

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch trình</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hotel Card */}
        <View style={styles.hotelCard}>
          <View style={styles.hotelBadge}>
            <Text style={styles.hotelBadgeText}>NGHỈ TẠI</Text>
          </View>
          <View style={styles.hotelContent}>
            <Image source={{ uri: itinerary.hotel.imageUrl }} style={styles.hotelImage} />
            <View style={styles.hotelInfo}>
              <Text style={styles.hotelName} numberOfLines={2}>
                {itinerary.hotel.name}
              </Text>
              <View style={styles.hotelStars}>
                {Array(itinerary.hotel.stars)
                  .fill(0)
                  .map((_, i) => (
                    <Text key={i} style={styles.star}>
                      ⭐
                    </Text>
                  ))}
              </View>
              <View style={styles.hotelLocation}>
                <Text style={styles.locationIcon}>📍</Text>
                <Text style={styles.hotelAddress} numberOfLines={2}>
                  {itinerary.hotel.address}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Day Selector */}
        <View style={styles.daySelector}>
          {itinerary.days.map((d) => (
            <TouchableOpacity
              key={d.day}
              onPress={() => setActiveDay(d.day)}
              style={[styles.dayButton, activeDay === d.day && styles.dayButtonActive]}
            >
              <Text
                style={[styles.dayButtonText, activeDay === d.day && styles.dayButtonTextActive]}
              >
                Ngày {d.day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Itinerary Items */}
        <View style={styles.itineraryList}>
          {currentDay?.items.map((item, idx) => (
            <View key={item.location.id} style={styles.itineraryItem}>
              <View style={styles.itemNumber}>
                <Text style={styles.itemNumberText}>{idx + 1}</Text>
              </View>
              <View style={styles.itemCard}>
                <Image source={{ uri: item.location.imageUrl }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.location.name}
                    </Text>
                    <View style={styles.itemTag}>
                      <Text style={styles.itemTagText}>{item.location.tags[0]}</Text>
                    </View>
                  </View>
                  <View style={styles.itemLocation}>
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.itemAddress} numberOfLines={1}>
                      {item.location.address}
                    </Text>
                  </View>
                  <View style={styles.itemFooter}>
                    <View style={styles.itemTime}>
                      <Text style={styles.timeIcon}>🕐</Text>
                      <Text style={styles.timeText}>{item.timeSlot}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.saveButtonContainer}>
          <Button
            title="Lưu hành trình"
            onPress={handleSaveTrip}
            size="lg"
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutralBg,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  loadingContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  loadingIcon: {
    width: 112,
    height: 112,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.primary + '0D',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxl,
  },
  loadingEmoji: {
    fontSize: 64,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.neutralText,
    marginTop: SPACING.lg,
  },
  loadingText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.gray300,
    textAlign: 'center',
    marginTop: SPACING.md,
    lineHeight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray50,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backIcon: {
    fontSize: 24,
    color: COLORS.neutralText,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '900',
    color: COLORS.neutralText,
  },
  content: {
    flex: 1,
  },
  hotelCard: {
    backgroundColor: COLORS.white,
    margin: SPACING.lg,
    borderRadius: BORDER_RADIUS.xxl,
    padding: SPACING.lg,
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.primary + '1A',
  },
  hotelBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderTopRightRadius: BORDER_RADIUS.xxl,
    borderBottomLeftRadius: BORDER_RADIUS.lg,
  },
  hotelBadgeText: {
    fontSize: 8,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 2,
  },
  hotelContent: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  hotelImage: {
    width: 96,
    height: 128,
    borderRadius: BORDER_RADIUS.lg,
  },
  hotelInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  hotelName: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '900',
    color: COLORS.neutralText,
    lineHeight: 22,
  },
  hotelStars: {
    flexDirection: 'row',
    gap: 2,
    marginVertical: 6,
  },
  star: {
    fontSize: 14,
  },
  hotelLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  locationIcon: {
    fontSize: 14,
  },
  hotelAddress: {
    flex: 1,
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.gray300,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  daySelector: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  dayButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.white,
    ...SHADOWS.sm,
  },
  dayButtonActive: {
    backgroundColor: COLORS.neutralText,
    borderColor: COLORS.neutralText,
  },
  dayButtonText: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '900',
    color: COLORS.gray300,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  dayButtonTextActive: {
    color: COLORS.white,
  },
  itineraryList: {
    paddingHorizontal: SPACING.lg,
  },
  itineraryItem: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  itemNumber: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.primary + '0D',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
    marginTop: 4,
  },
  itemNumberText: {
    fontSize: FONT_SIZE.base,
    fontWeight: '900',
    color: COLORS.primary,
  },
  itemCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
    borderWidth: 1,
    borderColor: COLORS.gray50,
  },
  itemImage: {
    width: '100%',
    height: 120,
  },
  itemInfo: {
    padding: SPACING.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  itemName: {
    flex: 1,
    fontSize: FONT_SIZE.sm,
    fontWeight: '900',
    color: COLORS.neutralText,
  },
  itemTag: {
    backgroundColor: COLORS.accent + '1A',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS.sm,
  },
  itemTagText: {
    fontSize: 7,
    fontWeight: '900',
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  itemLocation: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: SPACING.sm,
  },
  itemAddress: {
    flex: 1,
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.gray200,
    fontStyle: 'italic',
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeIcon: {
    fontSize: 14,
  },
  timeText: {
    fontSize: 9,
    fontWeight: '900',
    color: COLORS.gray400,
  },
  saveButtonContainer: {
    padding: SPACING.lg,
    paddingTop: SPACING.xxl,
  },
  saveButton: {
    width: '100%',
    backgroundColor: COLORS.accent,
  },
})
