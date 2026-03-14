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
                            <Arrow width={24} height={24} />
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
                                {agree && <Checkbox width={20} height={20} />}
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
                            <Apple width={28} height={28} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Facebook width={28} height={28} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Google width={28} height={28} />
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
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 30,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A2E',
        textAlign: 'center',
        marginRight: 44, // To balance the back button
    },
    form: {
        marginBottom: 30,
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
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#9CA3AF',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#FFFFFF"
    },
    checkboxSelected: {
        backgroundColor: THEME.colors.background,
        borderColor: THEME.colors.secondary,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#374151',
    },
    termsText: {
        fontWeight: 'bold',
        color: '#1A1A2E',
    },
    signUpButton: {
        height: 56,
        backgroundColor: THEME.colors.secondary,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        ...THEME.shadows.medium,
    },
    signUpButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#E5E7EB',
    },
    dividerText: {
        paddingHorizontal: 16,
        fontSize: 14,
        color: '#6B7280',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 40,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#4B5563',
    },
    signInText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: THEME.colors.secondary,
    },
});

export default SignUpScreen;
