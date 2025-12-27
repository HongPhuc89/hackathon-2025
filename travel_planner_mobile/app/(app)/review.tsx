import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@shared/components'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '@shared/theme'

const FEEDBACK_TAGS = ['Logic tốt', 'Địa điểm đẹp', 'Gợi ý chuẩn', 'Dễ sử dụng']

export default function ReviewScreen() {
    const router = useRouter()
    const [rating, setRating] = useState(0)
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const [feedback, setFeedback] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        )
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
        setTimeout(() => {
            router.replace('/(app)/trips')
        }, 2500)
    }

    if (isSubmitted) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Text style={styles.successEmoji}>✨</Text>
                    </View>
                    <Text style={styles.successTitle}>Hoàn tất!</Text>
                    <Text style={styles.successText}>
                        Lịch trình đã được lưu vào bộ sưu tập của bạn. Hãy sẵn sàng lên đường!
                    </Text>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Tuyệt vời!</Text>
                    <Text style={styles.subtitle}>
                        Đánh giá nhanh trải nghiệm của bạn với Trợ lý AI nhé?
                    </Text>
                </View>

                {/* Star Rating */}
                <View style={styles.section}>
                    <View style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <TouchableOpacity
                                key={star}
                                onPress={() => setRating(star)}
                                style={styles.starButton}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.star, rating >= star && styles.starActive]}>⭐</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    {rating > 0 && (
                        <Text style={styles.ratingText}>
                            {rating === 5
                                ? 'Xuất sắc!'
                                : rating === 4
                                    ? 'Rất tốt!'
                                    : rating === 3
                                        ? 'Tốt!'
                                        : rating === 2
                                            ? 'Ổn!'
                                            : 'Cần cải thiện!'}
                        </Text>
                    )}
                </View>

                {/* Feedback Tags */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ĐIỂM BẠN HÀI LÒNG:</Text>
                    <View style={styles.tagsContainer}>
                        {FEEDBACK_TAGS.map((tag) => (
                            <TouchableOpacity
                                key={tag}
                                onPress={() => toggleTag(tag)}
                                style={[styles.tag, selectedTags.includes(tag) && styles.tagActive]}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.tagText, selectedTags.includes(tag) && styles.tagTextActive]}>
                                    {tag}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Feedback Input */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>GÓP Ý (TÙY CHỌN):</Text>
                    <TextInput
                        style={styles.feedbackInput}
                        placeholder="Chia sẻ thêm cảm nhận..."
                        placeholderTextColor={COLORS.gray300}
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Gửi & Kết thúc"
                    onPress={handleSubmit}
                    size="lg"
                    disabled={rating === 0}
                    style={styles.submitButton}
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
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: SPACING.xxl,
    },
    header: {
        marginBottom: SPACING.xxl,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.neutralText,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: '700',
        color: COLORS.gray300,
        lineHeight: 22,
    },
    section: {
        marginBottom: SPACING.xxl,
    },
    sectionTitle: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.gray300,
        letterSpacing: 2,
        marginBottom: SPACING.md,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: SPACING.sm,
        marginBottom: SPACING.md,
    },
    starButton: {
        padding: SPACING.xs,
    },
    star: {
        fontSize: 48,
        opacity: 0.2,
    },
    starActive: {
        opacity: 1,
    },
    ratingText: {
        fontSize: FONT_SIZE.xl,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
    },
    tag: {
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.full,
        borderWidth: 2,
        borderColor: COLORS.gray100,
        ...SHADOWS.sm,
    },
    tagActive: {
        backgroundColor: COLORS.primary + '0D',
        borderColor: COLORS.primary,
    },
    tagText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '900',
        color: COLORS.gray400,
    },
    tagTextActive: {
        color: COLORS.primary,
    },
    feedbackInput: {
        backgroundColor: COLORS.white,
        borderRadius: BORDER_RADIUS.xl,
        padding: SPACING.lg,
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.neutralText,
        minHeight: 120,
        borderWidth: 1,
        borderColor: COLORS.gray100,
        ...SHADOWS.sm,
    },
    footer: {
        paddingHorizontal: SPACING.xxl,
        paddingVertical: SPACING.lg,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray50,
    },
    submitButton: {
        width: '100%',
        backgroundColor: COLORS.accent,
    },
    successContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.xxl,
    },
    successIcon: {
        width: 128,
        height: 128,
        borderRadius: BORDER_RADIUS.xxl,
        backgroundColor: COLORS.accent + '1A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.xxl,
        transform: [{ rotate: '6deg' }],
        borderWidth: 4,
        borderColor: COLORS.white,
        ...SHADOWS.xl,
    },
    successEmoji: {
        fontSize: 64,
    },
    successTitle: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.neutralText,
        marginBottom: SPACING.md,
    },
    successText: {
        fontSize: FONT_SIZE.lg,
        fontWeight: '700',
        color: COLORS.gray400,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
    },
})
