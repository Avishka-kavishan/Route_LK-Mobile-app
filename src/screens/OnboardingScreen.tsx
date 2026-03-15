import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp, ms, mvs, SCREEN_WIDTH, SCREEN_HEIGHT } from '../utils/responsive';


const OnboardingScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const handleLogin = () => {
        navigation.navigate('SignIn');
    };

    const handleJoin = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ImageBackground
                source={require('../assets/image/onboardingT.png')}
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
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,

    },
    overlay: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        marginTop: verticalScale(50),
    },
    logoText: {
        fontSize: ms(28),
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
        borderTopLeftRadius: scale(40),
        borderTopRightRadius: scale(40),
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(32),
        paddingBottom: verticalScale(40),
        alignItems: 'center',
    },
    title: {
        fontSize: ms(28, 0.7),
        fontWeight: 'bold',
        color: THEME.colors.secondary,
        textAlign: 'center',
        marginBottom: verticalScale(12),
    },
    description: {
        fontSize: ms(18),
        color: THEME.colors.text,
        textAlign: 'center',
        lineHeight: ms(26),
        marginBottom: verticalScale(32),
        paddingHorizontal: scale(10),
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    loginButton: {
        flex: 1,
        height: verticalScale(56),
        borderRadius: scale(28),
        borderWidth: 1,
        borderColor: '#D1D5DB', // Light gray border like in mockup
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(10),
    },
    loginButtonText: {
        fontSize: ms(18),
        fontWeight: '600',
        color: THEME.colors.secondary,
    },
    joinButton: {
        flex: 1,
        height: verticalScale(56),
        borderRadius: scale(28),
        backgroundColor: THEME.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(10),
        ...THEME.shadows.medium,
    },
    joinButtonText: {
        fontSize: ms(18),
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default OnboardingScreen;
