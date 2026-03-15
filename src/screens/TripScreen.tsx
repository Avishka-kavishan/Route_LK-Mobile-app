import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp, ms, mvs } from '../utils/responsive';

import Trip from "../assets/svg/trip.svg";

import Tickets from "../assets/svg/ticket.svg";
import Ellipse from "../assets/svg/Ellipse.svg";
import Location from "../assets/svg/location.svg"

const tripsData = [
    { id: '1', ticketNumber: '29876543', from: 'Colombo', to: 'Mathara', date: 'Fri, 30 May', time: '04:30 PM' },
    { id: '2', ticketNumber: '29876543', from: 'Colombo', to: 'Mathara', date: 'Fri, 30 May', time: '04:30 PM' },
    { id: '3', ticketNumber: '29876543', from: 'Colombo', to: 'Mathara', date: 'Fri, 30 May', time: '04:30 PM' },
];

const TripScreen = () => {
    const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/image/header.png')}
                style={styles.header}
                imageStyle={styles.headerImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['transparent', 'rgba(10,20,35,0.55)', '#0f1923']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientOverlay}
                >
                    {/* Trip plane icon in white square */}
                    <View style={styles.searchHeaderRow}>
                        <View style={styles.searchIconBadge}>
                            <Trip width={scale(24)} height={scale(24)} color={THEME.colors.secondary} />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.heroTitle}>My Trips</Text>
                        </View>
                    </View>
                    <View><Text style={styles.heroSub}>See your upcoming and past trips</Text></View>
                </LinearGradient>
            </ImageBackground>

            {/* Upcoming and past buttons */}
            <View style={styles.tabsWrapper}>
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Upcoming' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Upcoming')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'Upcoming' && styles.activeTabButtonText]}>Upcoming</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'Past' && styles.activeTabButton]}
                        onPress={() => setActiveTab('Past')}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 'Past' && styles.activeTabButtonText]}>Past</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.cardsWrapper}>
                    {activeTab === 'Upcoming' ? (
                        <View style={styles.cardsContainer}>
                            {tripsData.map((trip) => (
                                <View key={trip.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.ticketBadge}>
                                            <Tickets width={scale(18)} height={scale(18)} />
                                        </View>
                                        <Text style={styles.ticketNumber}>{trip.ticketNumber}</Text>
                                        <View style={styles.flexCenter} />
                                        <View style={styles.locationBadge}>
                                          <Location width={scale(18)} height={scale(18)} />
                                        </View>
                                    </View>

                                    <View style={styles.dashedLine} />

                                    <View style={styles.cardBody}>
                                        <View style={styles.routeRow}>
                                            <View style={styles.routeIconWrapper}>
                                                <Ellipse width={scale(10)} height={scale(10)} style={styles.boldIcon} />
                                            </View>
                                            <View style={styles.routeContent}>
                                                <View style={styles.routeDetails}>
                                                    <Text style={styles.cityName}>{trip.from}</Text>
                                                    <Text style={styles.routeLabel}>DEPARTURE</Text>
                                                </View>
                                                <View style={styles.timeContainer}>
                                                    <Text style={styles.timeText}>{trip.time}</Text>
                                                    <Text style={styles.dateText}>{trip.date}</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={[styles.routeRow, styles.arrivalRow]}>
                                            <View style={styles.routeIconWrapper}>
                                                <Ellipse width={scale(10)} height={scale(10)} style={styles.boldIcon} />
                                            </View>
                                            <View style={styles.routeContent}>
                                                <View style={styles.routeDetails}>
                                                    <Text style={styles.cityName}>{trip.to}</Text>
                                                    <Text style={styles.routeLabel}>ARRIVAL</Text>
                                                </View>
                                                <View style={styles.timeContainer}>
                                                    <Text style={styles.timeText}>{trip.time}</Text>
                                                    <Text style={styles.dateText}>{trip.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Icon name="ticket-outline" size={scale(64)} color={THEME.colors.textSecondary} />
                            <Text style={styles.emptyStateTitle}>No Past Trips</Text>
                            <Text style={styles.emptyStateSub}>You don't have any past trips recorded yet.</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: verticalScale(40),
    },
    header: { width: '100%', height: verticalScale(170), borderBottomLeftRadius: scale(20), borderBottomRightRadius: scale(20), overflow: 'hidden' },
    
    headerImage: { width: wp(104),
        height: verticalScale(170),
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(-10)},

    gradientOverlay: {
        paddingTop: verticalScale(60),
        paddingBottom: verticalScale(40),
        paddingHorizontal: scale(20),
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: scale(20),
        height: verticalScale(170)
    },
    searchHeaderRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    searchIconBadge: {
        width: scale(40),
        height: scale(40),
        backgroundColor: '#FFF',
        borderRadius: scale(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12)
    },
    headerTextContainer: { justifyContent: 'center' },
    heroTitle: { fontSize: scale(22), fontWeight: 'bold', color: '#FFF', marginTop: verticalScale(1) },
    heroSub: { fontSize: scale(14), color: '#0BA5EC', fontWeight: '500', marginLeft: scale(52), marginTop: verticalScale(-5) },
    tabsWrapper: {
        paddingHorizontal: scale(16),
        marginTop: verticalScale(-50),
        paddingTop: verticalScale(20),
        zIndex: 1,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: scale(8),
        padding: scale(4),
        marginBottom: verticalScale(20),
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(1) },
        shadowOpacity: 0.1,
        shadowRadius: scale(2),
    },
    cardsWrapper: {
        paddingHorizontal: scale(16),
    },
    tabButton: {
        flex: 1,
        paddingVertical: verticalScale(12),
        alignItems: 'center',
        borderRadius: scale(8),
    },
    activeTabButton: {
        backgroundColor: '#0BA5EC',
    },
    tabButtonText: {
        color: '#1F2937',
        fontWeight: '500',
        fontSize: ms(15),
    },
    activeTabButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    cardsContainer: {
        marginTop: verticalScale(5),
    },
    card: {
        backgroundColor: '#F3F4F6',
        borderRadius: scale(8),
        marginBottom: verticalScale(16),
        paddingTop: verticalScale(16),
        paddingBottom: verticalScale(20),
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(16),
        marginBottom: verticalScale(16),
    },
    ticketBadge: {
        alignItems: 'center',
        justifyContent: 'center',
        width: scale(30),
        height: scale(30),
        borderWidth: 1,
        borderColor: '#9CA3AF',
        borderRadius: scale(20),
        marginRight: scale(10),
    },
    ticketNumber: {
        fontSize: ms(14),
        fontWeight: '500',
        color: '#111827',
    },
    flexCenter: {
        flex: 1,
    },
    locationBadge: {
        backgroundColor: '#E5E7EB',
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        alignItems: 'center',
        justifyContent: 'center',
    },
    dashedLine: {
        height: 1,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        marginHorizontal: scale(16),
        marginBottom: verticalScale(16),
        borderRadius: 1,
    },
    cardBody: {
        paddingHorizontal: scale(16),
    },
    routeRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    arrivalRow: {
        marginTop: verticalScale(18),
    },
    routeIconWrapper: {
        marginRight: scale(10),
        paddingTop: verticalScale(3),
    },
    boldIcon: {
        marginTop: verticalScale(10),
    },
    routeContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    routeDetails: {
        flex: 1,
    },
    cityName: {
        fontSize: ms(15),
        fontWeight: '600',
        color: '#111827',
        marginBottom: verticalScale(2),
    },
    routeLabel: {
        fontSize: ms(11),
        fontWeight: '600',
        color: '#9CA3AF',
        textTransform: 'uppercase',
    },
    timeContainer: {
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: ms(13),
        fontWeight: '500',
        color: '#9CA3AF',
        marginBottom: verticalScale(2),
    },
    dateText: {
        fontSize: ms(12),
        fontWeight: '500',
        color: '#9CA3AF',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: verticalScale(60),
    },
    emptyStateTitle: {
        fontSize: ms(18, 0.7),
        fontWeight: 'bold',
        color: '#1F2937',
        marginTop: verticalScale(16),
    },
    emptyStateSub: {
        fontSize: ms(14),
        color: '#6B7280',
        textAlign: 'center',
        marginTop: verticalScale(8),
        paddingHorizontal: scale(20),
    },
});

export default TripScreen;
