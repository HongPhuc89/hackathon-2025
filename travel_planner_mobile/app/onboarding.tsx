import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@shared/components'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@shared/theme'
import { useAppStore } from '@shared/store'

export default function OnboardingScreen() {
  const router = useRouter()
  const completeOnboarding = useAppStore((state) => state.completeOnboarding)

  const handleStart = () => {
    completeOnboarding()
    router.replace('/auth')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🗺️</Text>
          </View>
          <Text style={styles.title}>Cùng Lên Kế Hoạch</Text>
          <Text style={styles.subtitle}>Du lịch thông minh,{'\n'}lịch trình hoàn hảo cùng AI.</Text>
        </View>

        <View style={styles.features}>
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🤖</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Trợ lý ảo AI</Text>
              <Text style={styles.featureDescription}>Thấu hiểu mọi nhu cầu</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: COLORS.secondary + '20' }]}>
              <Text style={styles.featureEmoji}>📍</Text>
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Gợi ý địa điểm</Text>
              <Text style={styles.featureDescription}>Tối ưu hóa thời gian</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Bắt đầu ngay" onPress={handleStart} size="lg" style={styles.button} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutralBg,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  iconContainer: {
    marginBottom: SPACING.lg,
  },
  icon: {
    fontSize: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.neutralText,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    gap: SPACING.md,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.xl,
    gap: SPACING.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.accent + '10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '900',
    color: COLORS.neutralText,
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: FONT_SIZE.xs,
    fontWeight: '700',
    color: COLORS.gray400,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  button: {
    width: '100%',
  },
})
