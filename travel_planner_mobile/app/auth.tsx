import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Input } from '@shared/components'
import { COLORS, SPACING, FONT_SIZE, BORDER_RADIUS } from '@shared/theme'
import { useAppStore } from '@shared/store'

export default function AuthScreen() {
    const router = useRouter()
    const login = useAppStore((state) => state.login)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleLogin = () => {
        if (email.trim() && password.trim()) {
            login(email.trim())
            router.replace('/(app)/trips')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoIcon}>✈️</Text>
                    </View>
                    <Text style={styles.title}>WanderPlan</Text>
                    <Text style={styles.subtitle}>Lên kế hoạch du lịch{'\n'}thông minh với AI.</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        placeholder="Email của bạn..."
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        leftIcon={<Text style={styles.inputIcon}>@</Text>}
                    />

                    <Input
                        placeholder="Mật khẩu..."
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        leftIcon={<Text style={styles.inputIcon}>🔒</Text>}
                        rightIcon={
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Text style={styles.inputIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                            </TouchableOpacity>
                        }
                    />

                    <View style={styles.forgotPassword}>
                        <TouchableOpacity>
                            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Đăng nhập"
                        onPress={handleLogin}
                        size="lg"
                        disabled={!email.trim() || !password.trim()}
                        style={styles.loginButton}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Chưa có tài khoản?{' '}
                        <Text style={styles.signupText}>Đăng ký ngay</Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
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
    logoContainer: {
        width: 80,
        height: 80,
        backgroundColor: COLORS.primary,
        borderRadius: BORDER_RADIUS.xl,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SPACING.lg,
        transform: [{ rotate: '6deg' }],
        borderWidth: 4,
        borderColor: COLORS.white,
    },
    logoIcon: {
        fontSize: 40,
        transform: [{ rotate: '-45deg' }],
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.neutralText,
        marginBottom: SPACING.sm,
    },
    subtitle: {
        fontSize: FONT_SIZE.sm,
        fontWeight: '700',
        color: COLORS.gray400,
        textAlign: 'center',
        lineHeight: 20,
    },
    form: {
        marginBottom: SPACING.xl,
    },
    inputIcon: {
        fontSize: 20,
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: SPACING.lg,
    },
    forgotPasswordText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '900',
        color: COLORS.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    loginButton: {
        width: '100%',
    },
    footer: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: FONT_SIZE.xs,
        fontWeight: '700',
        color: COLORS.gray400,
    },
    signupText: {
        color: COLORS.primary,
        fontWeight: '900',
    },
})
