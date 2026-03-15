import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Splash from "../assets/svg/splash.svg";
import { scale, verticalScale, moderateScale, wp, hp } from '../utils/responsive';

type SplashScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Splash'>;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
    const scaleAnim = new Animated.Value(0.7);
    const opacityAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.logoBox,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Splash width={scale(80)} height={scale(80)} color="#0EA5E9" />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0EA5E9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoBox: {
        width: scale(110),
        height: scale(110),
        backgroundColor: '#FFFFFF',
        borderRadius: scale(28),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(8) },
        shadowOpacity: 0.15,
        shadowRadius: scale(20),
        elevation: 12,
    },
});

export default SplashScreen;
