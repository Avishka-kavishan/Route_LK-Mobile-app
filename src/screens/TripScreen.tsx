import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';

import Trip from "../assets/svg/trip.svg";

const TripScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
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
                                <Trip width={24} height={24} />
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.heroTitle}>My Trips</Text>
                            </View>
                        </View>
                        <View><Text style={styles.heroSub}>See your upcoming and past trips</Text></View>
                    </LinearGradient>
                </ImageBackground>

                {/* Upcomming and past buttons */}
                <View style={styles.content}>
                    <View style={styles.tabs}>
                        <View style={styles.activeTab}>
                            <Text style={styles.activeTabText}>Upcoming</Text>
                        </View>
                        <View style={styles.tab}>
                            <Text style={styles.tabText}>Past</Text>
                        </View>
                    </View>

                    <View style={styles.emptyState}>
                        <Icon name="ticket-outline" size={64} color={THEME.colors.textSecondary} />
                        <Text style={styles.emptyStateTitle}>No Trips Found</Text>
                        <Text style={styles.emptyStateSub}>You haven't booked any trips yet. Start your journey today!</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: { width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden' },
    headerImage: {},
    gradientOverlay: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: 30,
    },

    // New header row styles
    searchHeaderRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    searchIconBadge: {
        width: 40,
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },

    headerTextContainer: { justifyContent: 'center' },
    heroTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFF', marginTop: 1 },
    heroSub: { fontSize: 14, color: '#0EA5E9', fontWeight: '500', marginLeft: 57, marginTop: -5 },

    title: {
        fontSize: 28,
        color: '#FFF',
        fontWeight: 'bold',
    },
    content: {
        padding: 24,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: THEME.radius.md,
        padding: 4,
        marginBottom: 32,
        ...THEME.shadows.light,
    },
    activeTab: {
        flex: 1,
        backgroundColor: THEME.colors.primary,
        paddingVertical: 10,
        borderRadius: THEME.radius.sm,
        alignItems: 'center',
    },
    activeTabText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    tabText: {
        color: THEME.colors.textSecondary,
        fontWeight: '500',
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyStateTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginTop: 16,
    },
    emptyStateSub: {
        fontSize: 16,
        color: THEME.colors.textSecondary,
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 20,
    },
});

export default TripScreen;
