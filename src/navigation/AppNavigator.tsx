import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import SplashScreen from '../screens/SplashScreen';
import BusListScreen from '../screens/BusListScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import BookingSummaryScreen from '../screens/BookingSummaryScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
    Splash: undefined;
    Main: undefined;
    BusList: { startPoint: string; endPoint: string; date: string; time: string };
    SeatSelection: { busId: string; busName: string; price: number };
    BookingSummary: { busId: string; selectedSeats: string[]; totalPrice: number };
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
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
