import React from 'react'
import { View, TextInput, StyleSheet, TextInputProps, Text } from 'react-native'
import { COLORS, BORDER_RADIUS, FONT_SIZE, SPACING } from '@shared/theme'

interface InputProps extends TextInputProps {
    label?: string
    error?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    leftIcon,
    rightIcon,
    style,
    ...props
}) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error && styles.inputError]}>
                {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
                <TextInput
                    style={[styles.input, leftIcon ? styles.inputWithLeftIcon : undefined, style]}
                    placeholderTextColor={COLORS.gray300}
                    {...props}
                />
                {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.md,
    },
    label: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.neutralText,
        marginBottom: SPACING.xs,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.gray50,
        borderWidth: 1,
        borderColor: COLORS.gray100,
        borderRadius: BORDER_RADIUS.lg,
        paddingHorizontal: SPACING.md,
    },
    inputError: {
        borderColor: COLORS.error,
    },
    input: {
        flex: 1,
        paddingVertical: SPACING.md,
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.neutralText,
    },
    inputWithLeftIcon: {
        paddingLeft: SPACING.xs,
    },
    leftIcon: {
        marginRight: SPACING.xs,
    },
    rightIcon: {
        marginLeft: SPACING.xs,
    },
    errorText: {
        fontSize: FONT_SIZE.xs,
        color: COLORS.error,
        marginTop: SPACING.xs,
        fontWeight: '600',
    },
})
