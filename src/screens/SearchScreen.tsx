import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    Modal,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker';
import { THEME } from '../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MainTabParamList } from '../navigation/TabNavigator';

import Search from '../assets/svg/search b.svg';
import Location from '../assets/svg/city select.svg';
import Calender from '../assets/svg/calander.svg';
import Dropdown from '../assets/svg/dropdown.svg';
import Change from '../assets/svg/change.svg';
import Time from '../assets/svg/time b.svg';
import Cancel from '../assets/svg/cancel.svg';
import { scale, verticalScale, moderateScale, wp, hp, ms, mvs } from '../utils/responsive';

// Removed unused SVG imports; using MaterialCommunityIcons for icons

// ─── Navigation Types ──────────────────────────────────────────────────────────
type SearchScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Search'>,
    StackNavigationProp<RootStackParamList>
>;

type SearchScreenProps = {
    navigation: SearchScreenNavigationProp;
};

// ─── Search Screen ────────────────────────────────────────────────────────────
const SRI_LANKA_CITIES = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Chilaw', 'Colombo',
    'Dambulla', 'Galle', 'Gampaha', 'Hambantota', 'Hatton', 'Jaffna',
    'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Negombo',
    'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee',
    'Vavuniya', 'Welisara'
];
const SearchScreen = ({ navigation }: SearchScreenProps) => {
    const [from, setFrom] = React.useState('Colombo');
    const [to, setTo] = React.useState('Kandy');
    const [date, setDate] = React.useState(new Date());
    const [datePickerOpen, setDatePickerOpen] = React.useState(false);
    const [cityModalVisible, setCityModalVisible] = React.useState(false);
    const [selectingFor, setSelectingFor] = React.useState<'from' | 'to' | null>(null);
    const recentSearches = [
        { from: 'Colombo', to: 'Kandy', date: 'May 10' },
        { from: 'Galle', to: 'Matara', date: 'May 08' },
        { from: 'Jaffna', to: 'Negombo', date: 'May 05' },
    ];

    // Swap from/to cities
    const swapLocations = () => {
        setFrom(to);
        setTo(from);
    };

    // Navigate to bus listing
    const handleSearch = () => {
        navigation.navigate('BusList', {
            startPoint: from,
            endPoint: to,
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString(),
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* ─── HERO HEADER (Fixed) ─────────────────────────────────────── */}
            {/* Bus background with dark overlay */}
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
                    {/* Search icon in white square */}
                    <View style={styles.searchHeaderRow}>
                        <View style={styles.searchIconBadge}>
                            <Search width={scale(24)} height={scale(24)} />
                        </View>
                        <View style={styles.headerTextContainer}>
                            <Text style={styles.heroTitle}>Search Buses</Text>
                        </View>
                    </View>
                    <View><Text style={styles.heroSub}>Find your perfect ride</Text></View>
                </LinearGradient>
            </ImageBackground>

            {/* ─── Scrollable Content ─── */}
            <ScrollView
                style={{ marginTop: -30 }}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ─── SEARCH CARD ──────────────────────────────────────────────── */}
                {/* Floating white card overlapping the dark header */}
                <View style={styles.searchCard}>
                    {/* FROM field */}
                    <Text style={styles.fieldLabel}>From</Text>
                    <TouchableOpacity
                        style={styles.dropdownField}
                        onPress={() => {
                            setSelectingFor('from');
                            setCityModalVisible(true);
                        }}
                    >
                        <View style={styles.fieldIconBg}>
                            <Location width={scale(35)} height={scale(35)} />
                        </View>
                        <Text style={[styles.fieldText, !from && styles.fieldPlaceholder]}>{from || 'Select City'}</Text>
                        <Dropdown width={scale(35)} height={scale(35)} />
                    </TouchableOpacity>

                    {/* TO field with swap button */}
                    <View style={styles.toRow}>
                        <Text style={styles.fieldLabel}>To</Text>
                        <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
                            <Change width={scale(35)} height={scale(35)} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.dropdownField}
                        onPress={() => {
                            setSelectingFor('to');
                            setCityModalVisible(true);
                        }}
                    >
                        <View style={styles.fieldIconBg}>
                            <Location width={scale(35)} height={scale(35)} />
                        </View>
                        <Text style={[styles.fieldText, !to && styles.fieldPlaceholder]}>{to || 'Select City'}</Text>
                        <Dropdown width={scale(35)} height={scale(35)} />
                    </TouchableOpacity>

                    {/* DATE field */}
                    <Text style={[styles.fieldLabel, { marginTop: 16 }]}>Date</Text>
                    <TouchableOpacity style={styles.dropdownField} onPress={() => setDatePickerOpen(true)}>
                        <View style={styles.fieldIconBg}>
                            <Calender width={scale(35)} height={scale(35)} />
                        </View>
                        <Text style={[styles.fieldText, !date && styles.fieldPlaceholder]}>{date ? date.toDateString() : 'Select Date'}</Text>
                        {/* No chevron on date as per image sometimes, but keeping for consistency if needed */}
                    </TouchableOpacity>

                    {/* Hidden date picker modal */}
                    <DatePicker
                        modal
                        open={datePickerOpen}
                        date={date || new Date()}
                        mode="date"
                        onConfirm={(selectedDate) => {
                            setDatePickerOpen(false);
                            setDate(selectedDate);
                        }}
                        onCancel={() => setDatePickerOpen(false)}
                    />

                    {/* Search Button */}
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <LinearGradient
                            colors={['#0EA5E9', '#0EA5E9']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.buttonText}>Search Route</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* ─── RECENT SEARCHES ────────────────────────────────────── */}
                <View style={styles.recentSection}>
                    <View style={styles.recentHeader}>
                        <Text style={styles.recentTitle}>Recent searches</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>see all</Text>
                        </TouchableOpacity>
                    </View>
                    {recentSearches.map((item, idx) => (
                        <View key={idx} style={styles.recentCard}>
                            <View style={styles.recentIconBg}>
                                <Time width={scale(35)} height={scale(35)} />
                            </View>
                            <View style={styles.recentInfo}>
                                <View style={styles.recentRouteRow}>
                                    <Text style={styles.recentRoute}>{item.from}</Text>
                                    <Text style={styles.recentRouteArrow}> → </Text>
                                    <Text style={styles.recentRoute}>{item.to}</Text>
                                </View>
                                <Text style={styles.recentDate}>{item.date}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { /* TODO: remove item */ }}>
                                <Cancel width={scale(25)} height={scale(25)} />
                            </TouchableOpacity>
                        </View>


                    ))}
                </View>
            </ScrollView>

            {/* City Selection Modal */}
            <Modal
                visible={cityModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setCityModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select City</Text>
                            <TouchableOpacity onPress={() => setCityModalVisible(false)}>
                                <Icon name="close" size={24} color="#1A1A2E" />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={SRI_LANKA_CITIES}
                            keyExtractor={(item) => item}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.cityOption}
                                    onPress={() => {
                                        if (selectingFor === 'from') setFrom(item);
                                        if (selectingFor === 'to') setTo(item);
                                        setCityModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.cityOptionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: THEME.colors.background },
    scrollContent: { paddingBottom: verticalScale(20) },
    header: { width: '100%', height: verticalScale(170), borderBottomLeftRadius: scale(20), borderBottomRightRadius: scale(20), overflow: 'hidden', alignContent:'center' },
    headerImage: {
        width: wp(104),
        height: verticalScale(170),
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(-10)
    },

    gradientOverlay: {
        paddingTop: verticalScale(60),
        paddingBottom: verticalScale(80),
        paddingHorizontal: scale(20),
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: scale(30),
        height: verticalScale(170)
    },

    // New header row styles
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
    heroTitle: { fontSize: ms(22), fontWeight: 'bold', color: '#FFF', marginTop: verticalScale(1) },
    heroSub: { fontSize: ms(14), color: '#0EA5E9', fontWeight: '500', marginLeft: scale(52), marginTop: verticalScale(-5) },

    // Search card styles
    searchCard: {
        backgroundColor: '#FFF',
        marginHorizontal: scale(16),
        marginTop: 0,              // Handled by ScrollView
        borderRadius: scale(20),
        padding: scale(20),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(6) },
        shadowOpacity: 0.10,
        shadowRadius: scale(16),
        elevation: 8,
    },

    fieldLabel: { fontSize: ms(14), fontWeight: '700', color: '#0EA5E9', marginBottom: verticalScale(8) }, // Teal-ish color from image

    dropdownField: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: scale(16), paddingHorizontal: scale(16), paddingVertical: verticalScale(14), marginBottom: verticalScale(8), borderWidth: 1, borderColor: '#E2E8F0' },
    fieldIconBg: { width: scale(36), height: scale(36), borderRadius: scale(10), backgroundColor: '#0f1923', justifyContent: 'center', alignItems: 'center', marginRight: scale(12) },
    fieldText: { flex: 1, fontSize: ms(16), fontWeight: '600', color: '#1A1A2E' },
    fieldPlaceholder: { color: '#94A3B8', fontWeight: '400' },
    toRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: verticalScale(8), marginBottom: verticalScale(4) },
    swapButton: { width: scale(32), height: scale(32), borderRadius: scale(16), backgroundColor: '#F97316', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: scale(10), top: verticalScale(-7), zIndex: 1, ...THEME.shadows.light },

    searchButton: { borderRadius: scale(14), overflow: 'hidden', marginTop: verticalScale(20), width: '85%', alignSelf: 'center' },
    gradientButton: { paddingVertical: verticalScale(16), alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: '#FFF', fontSize: ms(18), fontWeight: 'bold' },

    // Recent searches styles
    recentSection: { marginTop: verticalScale(24), paddingHorizontal: scale(24) },
    recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(16) },
    recentTitle: { fontSize: ms(18), fontWeight: '800', color: '#000' },
    seeAll: { fontSize: ms(14), color: '#F97316', fontWeight: '600' },
    recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: scale(16), padding: scale(16), marginBottom: verticalScale(12), borderWidth: 1, borderColor: '#E5E7EB' },
    recentIconBg: { width: scale(44), height: scale(44), borderRadius: scale(10), backgroundColor: '#BAE6FD', justifyContent: 'center', alignItems: 'center', marginRight: scale(16) },
    recentInfo: { flex: 1 },
    recentRouteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: verticalScale(2) },
    recentRoute: { fontSize: ms(16), fontWeight: '700', color: '#1A1A2E' },
    recentRouteArrow: {
        fontSize: ms(15),
        fontWeight: 'bold',
        color: '#000000ff',
        marginTop: verticalScale(-3)
    },
    recentDate: { fontSize: ms(12), color: '#64748B', fontWeight: '500' },

    // City Selection Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: scale(24), borderTopRightRadius: scale(24), padding: scale(20), maxHeight: '70%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: verticalScale(16) },
    modalTitle: { fontSize: ms(18), fontWeight: 'bold', color: '#1A1A2E' },
    cityOption: { paddingVertical: verticalScale(14), borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    cityOptionText: { fontSize: ms(16), color: '#1A1A2E' },
});

export default SearchScreen;
