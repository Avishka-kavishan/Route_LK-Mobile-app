import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../navigation/AppNavigator';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp } from '../utils/responsive';

import Arrow from "../assets/svg/back.svg"
import Apple from "../assets/svg/apple.svg"
import Facebook from "../assets/svg/facebook.svg"
import Google from "../assets/svg/google.svg"
import Checkbox from "../assets/svg/Checkbox.svg"

const SignUpScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSignUp = () => {
        // Handle sign up logic
        navigation.navigate('Main');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity 
                            style={styles.backButton} 
                            onPress={() => navigation.goBack()}
                        >
                            <Arrow width={scale(24)} height={scale(24)} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Create New Account</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter name"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

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

                        {/* Terms and Conditions */}
                        <TouchableOpacity 
                            style={styles.checkboxContainer} 
                            onPress={() => setAgree(!agree)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, agree && styles.checkboxSelected]}>
                                {agree && <Checkbox width={scale(20)} height={scale(20)} />}
                            </View>
                            <Text style={styles.checkboxLabel}>
                                Agree with <Text style={styles.termsText}>Terms & Conditions</Text>
                            </Text>
                        </TouchableOpacity>

                        {/* Sign Up Button */}
                        <TouchableOpacity 
                            style={styles.signUpButton} 
                            onPress={handleSignUp}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.signUpButtonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Divider */}
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
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signInText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: scale(24),
        paddingBottom: verticalScale(40),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(60),
        marginBottom: verticalScale(30),
    },
    backButton: {
        width: scale(44),
        height: scale(44),
        borderRadius: scale(22),
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: scale(22),
        fontWeight: 'bold',
        color: '#1A1A2E',
        textAlign: 'center',
        marginRight: scale(44), // To balance the back button
    },
    form: {
        marginBottom: verticalScale(30),
    },
    inputContainer: {
        marginBottom: verticalScale(20),
    },
    label: {
        fontSize: scale(16),
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
        fontSize: scale(16),
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(30),
    },
    checkbox: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(4),
        borderWidth: 1,
        borderColor: '#9CA3AF',
        marginRight: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFFFFF"
    },
    checkboxSelected: {
        backgroundColor: THEME.colors.background,
        borderColor: THEME.colors.secondary,
    },
    checkboxLabel: {
        fontSize: scale(14),
        color: '#374151',
    },
    termsText: {
        fontWeight: 'bold',
        color: '#1A1A2E',
    },
    signUpButton: {
        height: verticalScale(56),
        backgroundColor: THEME.colors.secondary,
        borderRadius: scale(28),
        justifyContent: 'center',
        alignItems: 'center',
        ...THEME.shadows.medium,
    },
    signUpButtonText: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(30),
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: scale(16),
        fontSize: scale(14),
        color: '#6B7280',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: scale(20),
        marginBottom: verticalScale(40),
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: scale(16),
        color: '#4B5563',
    },
    signInText: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: THEME.colors.secondary,
    },
});

export default SignUpScreen;
