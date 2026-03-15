import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import { scale, verticalScale, moderateScale, wp, hp } from '../utils/responsive';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';

type BusListScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'BusList'>;
    route: RouteProp<RootStackParamList, 'BusList'>;
};

interface Bus {
    id: string;
    name: string;
    type: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    availableSeats: number;
    rating: number;
    isAC: boolean;
}

const MOCK_BUSES: Bus[] = [
    {
        id: '1',
        name: 'Super Line Express',
        type: 'Luxury AC',
        departureTime: '08:00 AM',
        arrivalTime: '11:30 AM',
        duration: '3h 30m',
        price: 1500,
        availableSeats: 12,
        rating: 4.8,
        isAC: true,
    },
    {
        id: '2',
        name: 'Highway Master',
        type: 'Deluxe Non-AC',
        departureTime: '09:30 AM',
        arrivalTime: '12:45 PM',
        duration: '3h 15m',
        price: 1100,
        availableSeats: 5,
        rating: 4.2,
        isAC: false,
    },
    {
        id: '3',
        name: 'Ceylonese Luxury',
        type: 'Sleeper AC',
        departureTime: '10:00 PM',
        arrivalTime: '02:00 AM',
        duration: '4h 00m',
        price: 2500,
        availableSeats: 20,
        rating: 4.9,
        isAC: true,
    },
];

const BusListScreen = ({ navigation, route }: BusListScreenProps) => {
    const { startPoint, endPoint, date } = route.params;

    const renderBusCard = ({ item }: { item: Bus }) => (
        <TouchableOpacity
            style={styles.busCard}
            onPress={() => navigation.navigate('SeatSelection', {
                busId: item.id,
                busName: item.name,
                price: item.price
            })}
        >
            <View style={styles.cardHeader}>
                <View>
                    <Text style={styles.busName}>{item.name}</Text>
                    <Text style={styles.busType}>{item.type}</Text>
                </View>
                <LinearGradient
                    colors={[THEME.colors.primary, THEME.colors.secondary]}
                    style={styles.ratingBadge}
                >
                    <Icon name="star" size={14} color="#FFF" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </LinearGradient>
            </View>

            <View style={styles.routeSection}>
                <View style={styles.timePoint}>
                    <Text style={styles.time}>{item.departureTime}</Text>
                    <Text style={styles.location}>{startPoint}</Text>
                </View>

                <View style={styles.durationLine}>
                    <View style={styles.dot} />
                    <View style={styles.line} />
                    <Icon name="bus" size={scale(20)} color={THEME.colors.primary} />
                    <View style={styles.line} />
                    <View style={styles.dot} />
                </View>

                <View style={styles.timePoint}>
                    <Text style={styles.time}>{item.arrivalTime}</Text>
                    <Text style={styles.location}>{endPoint}</Text>
                </View>
            </View>

            <View style={styles.cardFooter}>
                <View style={styles.amenities}>
                    {item.isAC && <Icon name="snowflake" size={scale(18)} color={THEME.colors.secondary} style={{ marginRight: scale(8) }} />}
                    <Icon name="wifi" size={scale(18)} color={THEME.colors.textSecondary} style={{ marginRight: scale(8) }} />
                    <Icon name="power-plug" size={scale(18)} color={THEME.colors.textSecondary} />
                </View>
                <View style={styles.priceSection}>
                    <Text style={styles.priceLabel}>From</Text>
                    <Text style={styles.price}>LKR {item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={scale(24)} color={THEME.colors.text} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{startPoint} to {endPoint}</Text>
                    <Text style={styles.headerSubtitle}>{date}</Text>
                </View>
            </View>

            <FlatList
                data={MOCK_BUSES}
                keyExtractor={(item) => item.id}
                renderItem={renderBusCard}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

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
    headerTitleContainer: {
        marginLeft: scale(12),
    },
    headerTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    headerSubtitle: {
        fontSize: scale(14),
        color: THEME.colors.textSecondary,
    },
    listContent: {
        padding: scale(16),
    },
    busCard: {
        backgroundColor: '#FFF',
        borderRadius: scale(THEME.radius.md),
        padding: scale(16),
        marginBottom: verticalScale(16),
        ...THEME.shadows.medium,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: verticalScale(16),
    },
    busName: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    busType: {
        fontSize: scale(14),
        color: THEME.colors.textSecondary,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(4),
        borderRadius: scale(THEME.radius.sm),
    },
    ratingText: {
        color: '#FFF',
        fontSize: scale(12),
        fontWeight: 'bold',
        marginLeft: scale(4),
    },
    routeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(20),
    },
    timePoint: {
        alignItems: 'center',
        flex: 1,
    },
    time: {
        fontSize: scale(16),
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    location: {
        fontSize: scale(12),
        color: THEME.colors.textSecondary,
        marginTop: verticalScale(2),
    },
    durationLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.5,
    },
    dot: {
        width: scale(6),
        height: scale(6),
        borderRadius: scale(3),
        backgroundColor: THEME.colors.primary,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: THEME.colors.border,
        marginHorizontal: scale(4),
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: THEME.colors.border,
        paddingTop: verticalScale(12),
    },
    amenities: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceSection: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: scale(10),
        color: THEME.colors.textSecondary,
        textTransform: 'uppercase',
    },
    price: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: THEME.colors.primary,
    },
});

export default BusListScreen;
