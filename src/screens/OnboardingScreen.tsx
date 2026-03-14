import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { THEME } from '../theme';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        // Navigate to Login or Main for now
        navigation.navigate('Main');
    };

    const handleJoin = () => {
        navigation.navigate('SignUp');
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

                    {/* Content Card */}
                    <View style={styles.card}>
                        <Text style={styles.title}>Plan Your Journey</Text>
                        <Text style={styles.description}>
                            Search routes, check bus schedules, and confirm your seat in seconds.
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.loginButton} 
                                activeOpacity={0.8}
                                onPress={handleLogin}
                            >
                                <Text style={styles.loginButtonText}>Log in</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.joinButton} 
                                activeOpacity={0.8}
                                onPress={handleJoin}
                            >
                                <Text style={styles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>
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
        height:800,
        
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
        color: THEME.colors.secondary, // Cyan/Blue as in mockup
    },
    card: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingTop: 32,
        alignItems: 'center',
        height:210
        
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: THEME.colors.secondary,
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontSize: 18,
        color: THEME.colors.text,
        textAlign: 'center',
        lineHeight: 26,
        marginBottom: 32,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    loginButton: {
        flex: 1,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#D1D5DB', // Light gray border like in mockup
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: THEME.colors.secondary,
    },
    joinButton: {
        flex: 1,
        height: 56,
        borderRadius: 28,
        backgroundColor: THEME.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        ...THEME.shadows.medium,
    },
    joinButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default OnboardingScreen;
