import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp, ms, mvs } from '../utils/responsive';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type BookingSummaryScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'BookingSummary'>;
    route: RouteProp<RootStackParamList, 'BookingSummary'>;
};

const BookingSummaryScreen = ({ navigation, route }: BookingSummaryScreenProps) => {
    const { selectedSeats, totalPrice } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={THEME.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking Summary</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.successSection}>
                    <View style={styles.successIcon}>
                        <Icon name="check-circle" size={scale(80)} color={THEME.colors.success} />
                    </View>
                    <Text style={styles.successTitle}>Review Your Booking</Text>
                    <Text style={styles.successSubtitle}>Please verify all details before payment</Text>
                </View>

                <View style={styles.detailsCard}>
                    <Text style={styles.cardTitle}>Travel Details</Text>

                    <DetailRow label="Bus Name" value="Super Line Express" icon="bus" />
                    <DetailRow label="Departure" value="Colombo Fort" icon="map-marker" />
                    <DetailRow label="Destination" value="Kandy Center" icon="map-marker-check" />
                    <DetailRow label="Travel Date" value="May 24, 2024" icon="calendar" />

                    <View style={styles.divider} />

                    <Text style={styles.cardTitle}>Seat Information</Text>
                    <View style={styles.seatsRow}>
                        {selectedSeats.map(seat => (
                            <View key={seat} style={styles.seatBadge}>
                                <Text style={styles.seatText}>{seat}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.priceCard}>
                    <Text style={styles.cardTitle}>Payment Details</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Ticket Price ({selectedSeats.length}x)</Text>
                        <Text style={styles.priceValue}>LKR {totalPrice}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Service Fee</Text>
                        <Text style={styles.priceValue}>LKR 150</Text>
                    </View>
                    <View style={[styles.priceRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Grand Total</Text>
                        <Text style={styles.totalValue}>LKR {totalPrice + 150}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.payButton} onPress={() => Alert.alert('Success', 'Booking Confirmed!')}>
                    <LinearGradient
                        colors={[THEME.colors.primary, THEME.colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Pay & Confirm</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const DetailRow = ({ label, value, icon }: { label: string; value: string; icon: string }) => (
    <View style={styles.detailRow}>
        <View style={styles.iconContainer}>
            <Icon name={icon} size={scale(20)} color={THEME.colors.primary} />
        </View>
        <View>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(16),
        backgroundColor: '#FFF',
        ...THEME.shadows.light,
    },
    backButton: {
        padding: scale(8),
    },
    headerTitle: {
        fontSize: ms(20),
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginLeft: scale(12),
    },
    scrollContent: {
        padding: scale(20),
    },
    successSection: {
        alignItems: 'center',
        marginBottom: verticalScale(30),
        marginTop: verticalScale(10),
    },
    successIcon: {
        marginBottom: verticalScale(16),
    },
    successTitle: {
        fontSize: ms(24, 0.7),
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    successSubtitle: {
        fontSize: ms(16),
        color: THEME.colors.textSecondary,
        marginTop: verticalScale(4),
    },
    detailsCard: {
        backgroundColor: '#FFF',
        borderRadius: scale(THEME.radius.lg),
        padding: scale(20),
        marginBottom: verticalScale(20),
        ...THEME.shadows.medium,
    },
    cardTitle: {
        fontSize: ms(18, 0.7),
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginBottom: verticalScale(16),
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(16),
    },
    iconContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: '#F8F9FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12),
    },
    detailLabel: {
        fontSize: ms(12),
        color: THEME.colors.textSecondary,
    },
    detailValue: {
        fontSize: ms(16),
        fontWeight: '600',
        color: THEME.colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: THEME.colors.border,
        marginVertical: verticalScale(16),
    },
    seatsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    seatBadge: {
        backgroundColor: THEME.colors.primary,
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(6),
        borderRadius: scale(THEME.radius.sm),
        marginRight: scale(8),
        marginBottom: verticalScale(8),
    },
    seatText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: ms(12),
    },
    priceCard: {
        backgroundColor: '#FFF',
        borderRadius: scale(THEME.radius.lg),
        padding: scale(20),
        marginBottom: verticalScale(30),
        ...THEME.shadows.medium,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(12),
    },
    priceLabel: {
        fontSize: ms(14),
        color: THEME.colors.textSecondary,
    },
    priceValue: {
        fontSize: ms(14),
        fontWeight: '600',
        color: THEME.colors.text,
    },
    totalRow: {
        marginTop: verticalScale(8),
        paddingTop: verticalScale(16),
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
    totalLabel: {
        fontSize: ms(18, 0.7),
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    totalValue: {
        fontSize: ms(22),
        fontWeight: 'bold',
        color: THEME.colors.primary,
    },
    footer: {
        padding: scale(20),
        backgroundColor: '#FFF',
        ...THEME.shadows.medium,
    },
    payButton: {
        borderRadius: scale(THEME.radius.md),
        overflow: 'hidden',
    },
    gradientButton: {
        paddingVertical: verticalScale(16),
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: ms(18),
        fontWeight: 'bold',
    },
});

export default BookingSummaryScreen;
