import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type SeatSelectionScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SeatSelection'>;
    route: RouteProp<RootStackParamList, 'SeatSelection'>;
};

const SeatSelectionScreen = ({ navigation, route }: SeatSelectionScreenProps) => {
    const { busId, busName, price } = route.params;
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    // Mock occupied seats
    const occupiedSeats = ['1A', '3B', '4C', '7D'];

    const toggleSeat = (seatId: string) => {
        if (occupiedSeats.includes(seatId)) return;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(s => s !== seatId));
        } else {
            setSelectedSeats([...selectedSeats, seatId]);
        }
    };

    const renderSeat = (row: number, col: string) => {
        const seatId = `${row}${col}`;
        const isOccupied = occupiedSeats.includes(seatId);
        const isSelected = selectedSeats.includes(seatId);

        return (
            <TouchableOpacity
                key={seatId}
                style={[
                    styles.seat,
                    isOccupied && styles.seatOccupied,
                    isSelected && styles.seatSelected,
                ]}
                onPress={() => toggleSeat(seatId)}
                disabled={isOccupied}
            >
                <Icon
                    name="seat"
                    size={24}
                    color={isOccupied ? '#CBD5E1' : isSelected ? '#FFF' : THEME.colors.primary}
                />
                <Text style={[
                    styles.seatLabel,
                    isSelected && { color: '#FFF' },
                    isOccupied && { color: '#94A3B8' }
                ]}>
                    {seatId}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderRow = (row: number) => (
        <View key={row} style={styles.row}>
            <View style={styles.pair}>
                {renderSeat(row, 'A')}
                {renderSeat(row, 'B')}
            </View>
            <View style={styles.aisle} />
            <View style={styles.pair}>
                {renderSeat(row, 'C')}
                {renderSeat(row, 'D')}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={THEME.colors.text} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Select Seats</Text>
                    <Text style={styles.headerSubtitle}>{busName}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Front of Bus indicator */}
                <View style={styles.busFront}>
                    <View style={styles.driverSection}>
                        <Icon name="steering" size={32} color={THEME.colors.textSecondary} />
                        <Text style={styles.frontText}>Front</Text>
                    </View>
                </View>

                {/* Seat Legend */}
                <View style={styles.legend}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#F1F5F9', borderColor: THEME.colors.primary, borderWidth: 1 }]} />
                        <Text style={styles.legendText}>Available</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: THEME.colors.primary }]} />
                        <Text style={styles.legendText}>Selected</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendBox, { backgroundColor: '#CBD5E1' }]} />
                        <Text style={styles.legendText}>Occupied</Text>
                    </View>
                </View>

                {/* Seats Grid */}
                <View style={styles.seatsContainer}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(row => renderRow(row))}
                </View>
            </ScrollView>

            {/* Checkout Footer */}
            <View style={styles.footer}>
                <View>
                    <Text style={styles.selectedCount}>{selectedSeats.length} Seats Selected</Text>
                    <Text style={styles.totalPrice}>LKR {selectedSeats.length * price}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.confirmButton, selectedSeats.length === 0 && styles.disabledButton]}
                    disabled={selectedSeats.length === 0}
                    onPress={() => navigation.navigate('BookingSummary', {
                        busId,
                        selectedSeats,
                        totalPrice: selectedSeats.length * price
                    })}
                >
                    <LinearGradient
                        colors={[THEME.colors.primary, THEME.colors.secondary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.gradientButton}
                    >
                        <Text style={styles.buttonText}>Confirm Booking</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: THEME.colors.border,
    },
    backButton: {
        padding: 8,
    },
    headerTitleContainer: {
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    headerSubtitle: {
        fontSize: 14,
        color: THEME.colors.textSecondary,
    },
    scrollContent: {
        padding: 24,
    },
    busFront: {
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomColor: THEME.colors.border,
        marginBottom: 30,
    },
    driverSection: {
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    frontText: {
        fontSize: 12,
        color: THEME.colors.textSecondary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 40,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendBox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        marginRight: 8,
    },
    legendText: {
        fontSize: 12,
        color: THEME.colors.textSecondary,
    },
    seatsContainer: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
    },
    pair: {
        flexDirection: 'row',
    },
    aisle: {
        width: 40,
    },
    seat: {
        width: 50,
        height: 50,
        backgroundColor: '#F1F5F9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        borderWidth: 1,
        borderColor: THEME.colors.border,
    },
    seatSelected: {
        backgroundColor: THEME.colors.primary,
        borderColor: THEME.colors.primary,
    },
    seatOccupied: {
        backgroundColor: '#CBD5E1',
        borderColor: '#CBD5E1',
    },
    seatLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: THEME.colors.textSecondary,
        marginTop: 2,
    },
    footer: {
        padding: 24,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...THEME.shadows.medium,
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
    },
    selectedCount: {
        fontSize: 14,
        color: THEME.colors.textSecondary,
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: 'bold',
        color: THEME.colors.primary,
    },
    confirmButton: {
        borderRadius: THEME.radius.md,
        overflow: 'hidden',
        flex: 0.7,
    },
    disabledButton: {
        opacity: 0.5,
    },
    gradientButton: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SeatSelectionScreen;
