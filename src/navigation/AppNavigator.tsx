import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import SplashScreen from '../screens/SplashScreen';
import BusListScreen from '../screens/BusListScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingSummaryScreen from '../screens/BookingSummaryScreen';
import TabNavigator from './TabNavigator';

import NotificationScreen from '../screens/NotificationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
    BusList: { startPoint: string; endPoint: string; date: string; time: string };
    SeatSelection: { busId: string; busName: string; price: number };
    BookingSummary: { busId: string; selectedSeats: string[]; totalPrice: number };
    Notifications: undefined;
    Onboarding: undefined;
    SignUp: undefined;
    SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#F8F9FE' },
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="BusList" component={BusListScreen} />
                <Stack.Screen name="SeatSelection" component={SeatSelectionScreen} />
                <Stack.Screen name="BookingSummary" component={BookingSummaryScreen} />
                <Stack.Screen name="Notifications" component={NotificationScreen} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="SignIn" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
