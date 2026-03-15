import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp, ms, mvs, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/responsive';

import Apple from "../assets/svg/apple.svg"
import Facebook from "../assets/svg/facebook.svg"
import Google from "../assets/svg/google.svg"


const SignInScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login logic
        navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ImageBackground
                source={require('../assets/image/sign.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.overlay}>
                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoText}>
                            Route<Text style={styles.logoHighlight}>LK</Text>
                        </Text>
                    </View>

                    {/* Scrolling Content Card */}
                    <View style={styles.cardContainer}>
                        <ScrollView 
                            style={styles.card} 
                            contentContainerStyle={styles.cardContent}
                            showsVerticalScrollIndicator={false}
                            bounces={true}
                        >
                            <Text style={styles.title}>Log in</Text>
                            <Text style={styles.subtitle}>Log in to continue your seamless journey</Text>

                            <View style={styles.form}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Email Address</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter email address"
                                        placeholderTextColor="#9CA3AF"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>Password</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#9CA3AF"
                                        secureTextEntry
                                        value={password}
                                        onChangeText={setPassword}
                                    />
                                </View>

                                {/* Log in Button (text "Sign Up" in mockup, but user called it Log in) */}
                                <TouchableOpacity 
                                    style={styles.loginButton} 
                                    onPress={handleLogin}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.loginButtonText}>Sign In</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forget Password</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.dividerContainer}>
                                <View style={styles.divider} />
                                <Text style={styles.dividerText}>or sign up with</Text>
                                <View style={styles.divider} />
                            </View>

                            {/* Social Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Apple width={scale(28)} height={scale(28)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Facebook width={scale(28)} height={scale(28)} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Google width={scale(28)} height={scale(28)} />
                                </TouchableOpacity>
                            </View>
                            {/* Footer */}
                            <View style={styles.footer}>
                                <Text style={styles.footerText}>don’t have an account? </Text>
                                    <TouchableOpacity>
                                    <Text style={styles.signInText}>Sign up</Text>
                                    </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT, // Take up a good portion of the top
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: verticalScale(60),
    },
    logoText: {
        fontSize: ms(32),
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    logoHighlight: {
        color: THEME.colors.secondary,
    },
    cardContainer: {
        flex: 1,
        width: '100%',
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: scale(40),
        borderTopRightRadius: scale(40),
        marginTop: verticalScale(320), // Standard offset or HP(40)
    },
    cardContent: {
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(32),
        paddingBottom: verticalScale(20), // Reduced from 80
        alignItems: 'center',
    },
    title: {
        fontSize: ms(28, 0.7),
        fontWeight: 'bold',
        color: THEME.colors.secondary,
        textAlign: 'center',
        marginBottom: verticalScale(8),
    },
    subtitle: {
        fontSize: ms(16),
        color: '#1A1A2E',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: verticalScale(24),
    },
    form: {
        width: '100%',
        marginBottom: verticalScale(20),
    },
    inputContainer: {
        marginBottom: verticalScale(20),
    },
    label: {
        fontSize: ms(16),
        color: '#374151',
        marginBottom: verticalScale(8),
        fontWeight: '500',
    },
    input: {
        height: verticalScale(56),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: scale(28),
        paddingHorizontal: scale(20),
        fontSize: ms(16),
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
    },
    loginButton: {
        height: verticalScale(56),
        backgroundColor: THEME.colors.secondary,
        borderRadius: scale(28),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(10),
        ...THEME.shadows.medium,
    },
    loginButtonText: {
        fontSize: ms(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    forgotPassword: {
        marginTop: verticalScale(16),
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: ms(16),
        color: '#1A1A2E',
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(20),
        marginTop: 0,
        marginBottom: verticalScale(10),
    },
    socialButton: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(30),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(20),
        marginTop: verticalScale(10),
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: scale(16),
        fontSize: ms(14),
        color: '#6B7280',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(20)
    },
    footerText: {
        fontSize: ms(16),
        color: '#4B5563',
    },
    signInText: {
        fontSize: ms(16),
        fontWeight: 'bold',
        color: THEME.colors.secondary,
    },
});

export default SignInScreen;
