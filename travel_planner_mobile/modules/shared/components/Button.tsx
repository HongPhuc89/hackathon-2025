import React from 'react'
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native'
import { COLORS, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, SHADOWS } from '@shared/theme'

interface ButtonProps {
    title: string
    onPress: () => void
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    style?: ViewStyle
    textStyle?: TextStyle
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    style,
    textStyle,
}) => {
    const buttonStyles = [
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        disabled && styles.disabled,
        style,
    ]

    const textStyles = [
        styles.text,
        styles[`text_${variant}`],
        styles[`textSize_${size}`],
        textStyle,
    ]

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.7}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? COLORS.white : COLORS.primary} />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    base: {
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.md,
    },
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    ghost: {
        backgroundColor: 'transparent',
    },
    disabled: {
        opacity: 0.5,
    },
    size_sm: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    size_md: {
        paddingVertical: 14,
        paddingHorizontal: 24,
    },
    size_lg: {
        paddingVertical: 18,
        paddingHorizontal: 32,
    },
    text: {
        fontWeight: FONT_WEIGHT.black,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    text_primary: {
        color: COLORS.white,
    },
    text_secondary: {
        color: COLORS.white,
    },
    text_outline: {
        color: COLORS.primary,
    },
    text_ghost: {
        color: COLORS.primary,
    },
    textSize_sm: {
        fontSize: FONT_SIZE.xs,
    },
    textSize_md: {
        fontSize: FONT_SIZE.sm,
    },
    textSize_lg: {
        fontSize: FONT_SIZE.base,
    },
})
