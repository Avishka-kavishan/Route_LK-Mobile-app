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
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { THEME } from '../theme';

import Apple from "../assets/svg/apple.svg"
import Facebook from "../assets/svg/facebook.svg"
import Google from "../assets/svg/google.svg"

const { width, height } = Dimensions.get('window');

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
                source={require('../assets/image/onboardningT.png')}
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

                            {/* Social Buttons */}
                            <View style={styles.socialContainer}>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Apple width={28} height={28} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Facebook width={28} height={28} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton}>
                                    <Google width={28} height={28} />
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
        width: width,
        height: height * 0.7, // Take up a good portion of the top
    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: 60,
    },
    logoText: {
        fontSize: 32,
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
        marginTop: height * 0.1, // Offset to show more bus
    },
    card: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    cardContent: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: THEME.colors.secondary,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#1A1A2E',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 24,
    },
    form: {
        width: '100%',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 56,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 28,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
    },
    loginButton: {
        height: 56,
        backgroundColor: THEME.colors.secondary,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        ...THEME.shadows.medium,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    forgotPassword: {
        marginTop: 16,
        alignItems: 'center',
    },
    forgotPasswordText: {
        fontSize: 16,
        color: '#1A1A2E',
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 20,
    },
    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
});

export default SignInScreen;
