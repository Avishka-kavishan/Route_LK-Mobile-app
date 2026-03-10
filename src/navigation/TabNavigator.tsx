import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ─── Screen imports ───────────────────────────────────────────────────────────
import HomeScreen from '../screens/HomeScreen';
import TripScreen from '../screens/TripScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import { THEME } from '../theme';

import Home from "../assets/svg/home.svg";
import Search from "../assets/svg/search.svg";
import Trip from "../assets/svg/trip.svg";
import Profile from "../assets/svg/profile.svg";

// ─── Tab param types ──────────────────────────────────────────────────────────
export type MainTabParamList = {
    Home: undefined;
    Search: undefined;
    Trip: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

// ─── Tab Navigator ────────────────────────────────────────────────────────────
const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,

                // ── Icon resolver ─────────────────────────────────────────────
                tabBarIcon: ({ color }) => {
                    const iconSize = 26;
                    if (route.name === 'Home') return <Home width={iconSize} height={iconSize} fill={color} color={color} />;
                    if (route.name === 'Search') return <Search width={iconSize} height={iconSize} fill={color} color={color} />;
                    if (route.name === 'Trip') return <Trip width={iconSize} height={iconSize} fill={color} color={color} />;
                    if (route.name === 'Profile') return <Profile width={iconSize} height={iconSize} fill={color} color={color} />;
                    return null;
                },

                // ── Tab bar style ─────────────────────────────────────────────
                tabBarActiveTintColor: '#0EA5E9',        // Brand blue for active tab
                tabBarInactiveTintColor: '#000000ff',      // Muted gray for inactive
                tabBarStyle: {
                    backgroundColor: '#FFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E2E8F0',
                    paddingBottom: 6,
                    paddingTop: 6,
                    height: 62,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '600',
                },
            })}
        >
            {/* Home — combined search + discovery */}
            <Tab.Screen name="Home" component={HomeScreen} />

            {/* Search — dedicated search screen */}
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{ tabBarLabel: 'Search' }}
            />

            {/* Trip — user's bookings and travel history */}
            <Tab.Screen
                name="Trip"
                component={TripScreen}
                options={{ tabBarLabel: 'My Trips' }}
            />

            {/* Profile — account settings */}
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default TabNavigator;
