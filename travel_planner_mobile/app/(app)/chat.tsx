import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS, SHADOWS } from '@shared/theme'
import {
    Message,
    UserType,
    TravelStyle,
    BudgetLevel,
    FilterState,
} from '@shared/types'
import { POPULAR_DESTINATIONS, POPULAR_ORIGINS } from '@shared/constants'
import { useAppStore } from '@shared/store'

export default function ChatScreen() {
    const router = useRouter()
    const scrollViewRef = useRef<ScrollView>(null)
    const setFilter = useAppStore((state) => state.setFilter)

    const [step, setStep] = useState(0)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'ai',
            text: 'Xin chào! Tôi là trợ lý du lịch WanderPlan. Bạn muốn khám phá thành phố nào?',
            timestamp: Date.now(),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [filters, setFilters] = useState<FilterState>({
        origin: '',
        destination: '',
        userType: UserType.FAMILY,
        durationDays: 3,
        style: TravelStyle.RELAXED,
        budget: BudgetLevel.MODERATE,
    })

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }, [messages, isTyping])

    const addMessage = (sender: 'ai' | 'user', text: string) => {
        setMessages((prev) => [
            ...prev,
            { id: Date.now().toString(), sender, text, timestamp: Date.now() },
        ])
    }

    const handleNextStep = (value: any, displayValue?: string) => {
        addMessage('user', displayValue || value.toString())
        setIsTyping(true)

        setTimeout(() => {
            setIsTyping(false)
            const nextStep = step + 1
            setStep(nextStep)

            switch (nextStep) {
                case 1:
                    setFilters((prev) => ({ ...prev, destination: value }))
                    addMessage('ai', `Tuyệt vời! ${value} là một lựa chọn xuất sắc. Bạn định khởi hành từ đâu?`)
                    break
                case 2:
                    setFilters((prev) => ({ ...prev, origin: value }))
                    addMessage('ai', 'Chuyến đi của bạn dự kiến kéo dài bao nhiêu ngày nhỉ?')
                    break
                case 3:
                    setFilters((prev) => ({ ...prev, durationDays: value }))
                    addMessage('ai', 'Bạn sẽ đi du lịch cùng ai?')
                    break
                case 4:
                    setFilters((prev) => ({ ...prev, userType: value }))
                    addMessage('ai', 'Phong cách du lịch yêu thích của bạn là gì?')
                    break
                case 5:
                    setFilters((prev) => ({ ...prev, style: value }))
                    addMessage('ai', 'Cuối cùng, mức ngân sách bạn dự kiến cho chuyến đi này?')
                    break
                case 6:
                    const finalFilters = { ...filters, budget: value }
                    setFilters(finalFilters)
                    addMessage('ai', 'Mọi thứ đã sẵn sàng! Đang chuẩn bị lịch trình tốt nhất cho bạn...')
                    setTimeout(() => {
                        setFilter(finalFilters)
                        router.push('/(app)/itinerary')
                    }, 1500)
                    break
            }
        }, 1000)
    }

    const renderQuickReplies = () => {
        switch (step) {
            case 0:
                return POPULAR_DESTINATIONS.map((city) => (
                    <TouchableOpacity
                        key={city}
                        onPress={() => handleNextStep(city)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{city}</Text>
                    </TouchableOpacity>
                ))
            case 1:
                const filteredOrigins = POPULAR_ORIGINS.filter((city) => city !== filters.destination)
                return filteredOrigins.map((city) => (
                    <TouchableOpacity
                        key={city}
                        onPress={() => handleNextStep(city)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{city}</Text>
                    </TouchableOpacity>
                ))
            case 2:
                return [1, 2, 3, 4, 5].map((d) => (
                    <TouchableOpacity
                        key={d}
                        onPress={() => handleNextStep(d, `${d} Ngày`)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{d} Ngày</Text>
                    </TouchableOpacity>
                ))
            case 3:
                return Object.values(UserType).map((t) => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => handleNextStep(t)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{t}</Text>
                    </TouchableOpacity>
                ))
            case 4:
                return Object.values(TravelStyle).map((t) => (
                    <TouchableOpacity
                        key={t}
                        onPress={() => handleNextStep(t)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{t}</Text>
                    </TouchableOpacity>
                ))
            case 5:
                return ['Tiết kiệm', 'Vừa phải', 'Sang trọng'].map((l, i) => (
                    <TouchableOpacity
                        key={l}
                        onPress={() => handleNextStep(i + 1, l)}
                        style={styles.quickReply}
                    >
                        <Text style={styles.quickReplyText}>{l}</Text>
                    </TouchableOpacity>
                ))
            default:
                return null
        }
    }

    const handleSend = () => {
        if (inputValue.trim()) {
            handleNextStep(inputValue.trim())
            setInputValue('')
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <View style={styles.aiInfo}>
                    <View style={styles.aiAvatar}>
                        <Text style={styles.aiEmoji}>🤖</Text>
                    </View>
                    <View>
                        <Text style={styles.aiName}>WanderPlan AI</Text>
                        <View style={styles.onlineStatus}>
                            <View style={styles.onlineDot} />
                            <Text style={styles.onlineText}>TRỰC TUYẾN</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${(step / 6) * 100}%` }]} />
            </View>

            <KeyboardAvoidingView
                style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.messagesContainer}
                    contentContainerStyle={styles.messagesContent}
                    showsVerticalScrollIndicator={false}
                >
                    {messages.map((m) => (
                        <View
                            key={m.id}
                            style={[
                                styles.messageWrapper,
                                m.sender === 'ai' ? styles.aiMessageWrapper : styles.userMessageWrapper,
                            ]}
                        >
                            <View
                                style={[
                                    styles.messageBubble,
                                    m.sender === 'ai' ? styles.aiMessage : styles.userMessage,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.messageText,
                                        m.sender === 'ai' ? styles.aiMessageText : styles.userMessageText,
                                    ]}
                                >
                                    {m.text}
                                </Text>
                            </View>
                        </View>
                    ))}

                    {isTyping && (
                        <View style={[styles.messageWrapper, styles.aiMessageWrapper]}>
                            <View style={[styles.messageBubble, styles.aiMessage]}>
                                <View style={styles.typingIndicator}>
                                    <View style={styles.typingDot} />
                                    <View style={styles.typingDot} />
                                    <View style={styles.typingDot} />
                                </View>
                            </View>
                        </View>
                    )}

                    {!isTyping && step < 6 && (
                        <View style={styles.quickRepliesContainer}>{renderQuickReplies()}</View>
                    )}
                </ScrollView>

                {(step === 0 || step === 1) && (
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập nội dung..."
                            placeholderTextColor={COLORS.gray300}
                            value={inputValue}
                            onChangeText={setInputValue}
                            onSubmitEditing={handleSend}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            disabled={!inputValue.trim()}
                            style={[styles.sendButton, !inputValue.trim() && styles.sendButtonDisabled]}
                        >
                            <Text style={styles.sendIcon}>➤</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
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
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray100,
        gap: SPACING.md,
    },
    backButton: {
        padding: SPACING.sm,
    },
    backIcon: {
        fontSize: 24,
        color: COLORS.neutralText,
    },
    aiInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: SPACING.md,
    },
    aiAvatar: {
        width: 40,
        height: 40,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: COLORS.primary + '1A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.primary + '0D',
    },
    aiEmoji: {
        fontSize: 20,
    },
    aiName: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '900',
        color: COLORS.neutralText,
    },
    onlineStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    onlineDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.accent,
    },
    onlineText: {
        fontSize: 9,
        fontWeight: '900',
        color: COLORS.accent,
        letterSpacing: 2,
    },
    progressBar: {
        height: 4,
        backgroundColor: COLORS.gray50,
    },
    progress: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    content: {
        flex: 1,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: SPACING.md,
        paddingBottom: SPACING.xxl,
    },
    messageWrapper: {
        marginBottom: SPACING.md,
    },
    aiMessageWrapper: {
        alignItems: 'flex-start',
    },
    userMessageWrapper: {
        alignItems: 'flex-end',
    },
    messageBubble: {
        maxWidth: '85%',
        padding: SPACING.md,
        borderRadius: BORDER_RADIUS.xl,
        ...SHADOWS.sm,
    },
    aiMessage: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.gray50,
    },
    userMessage: {
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 4,
    },
    messageText: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        lineHeight: 20,
    },
    aiMessageText: {
        color: COLORS.neutralText,
    },
    userMessageText: {
        color: COLORS.white,
    },
    typingIndicator: {
        flexDirection: 'row',
        gap: 6,
    },
    typingDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.gray200,
    },
    quickRepliesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SPACING.sm,
        marginTop: SPACING.sm,
    },
    quickReply: {
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray100,
        borderRadius: BORDER_RADIUS.full,
        ...SHADOWS.sm,
    },
    quickReplyText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.primary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray100,
        gap: SPACING.md,
    },
    input: {
        flex: 1,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.md,
        backgroundColor: COLORS.gray50,
        borderWidth: 1,
        borderColor: COLORS.gray100,
        borderRadius: BORDER_RADIUS.lg,
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.neutralText,
    },
    sendButton: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.lg,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.md,
    },
    sendButtonDisabled: {
        opacity: 0.5,
    },
    sendIcon: {
        fontSize: 20,
        color: COLORS.white,
        transform: [{ rotate: '90deg' }],
    },
})
