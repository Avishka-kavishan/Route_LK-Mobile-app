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

            {/* ─── Scrollable Content ─── */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* ─── HERO HEADER ─────────────────────────────────────────────── */}
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
                                <Search width={24} height={24} />
                            </View>
                            <View style={styles.headerTextContainer}>
                                <Text style={styles.heroTitle}>Search Buses</Text>
                            </View>
                        </View>
                        <View><Text style={styles.heroSub}>Find your perfect ride</Text></View>
                    </LinearGradient>
                </ImageBackground>

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
                            <Location width={35} height={35} />
                        </View>
                        <Text style={[styles.fieldText, !from && styles.fieldPlaceholder]}>{from || 'Select City'}</Text>
                        <Dropdown width={35} height={35} />
                    </TouchableOpacity>

                    {/* TO field with swap button */}
                    <View style={styles.toRow}>
                        <Text style={styles.fieldLabel}>To</Text>
                        <TouchableOpacity style={styles.swapButton} onPress={swapLocations}>
                            <Change width={35} height={35} />
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
                            <Location width={35} height={35} />
                        </View>
                        <Text style={[styles.fieldText, !to && styles.fieldPlaceholder]}>{to || 'Select City'}</Text>
                        <Dropdown width={35} height={35} />
                    </TouchableOpacity>

                    {/* DATE field */}
                    <Text style={[styles.fieldLabel, { marginTop: 16 }]}>Date</Text>
                    <TouchableOpacity style={styles.dropdownField} onPress={() => setDatePickerOpen(true)}>
                        <View style={styles.fieldIconBg}>
                            <Calender width={35} height={35} />
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
                                <Time width={35} height={35} />
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
                                <Cancel width={25} height={25} />
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
    scrollContent: { paddingBottom: 20 },
    header: { width: '100%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, overflow: 'hidden',alignContent:'center' },
    headerImage: {width:"100%",},

    gradientOverlay: {
        paddingTop: 60,
        paddingBottom: 80,
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

    // Search card styles
    searchCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: -70,            // Pull up over header
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 8,
    },

    fieldLabel: { fontSize: 14, fontWeight: '700', color: '#0EA5E9', marginBottom: 8 }, // Teal-ish color from image

    dropdownField: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
    fieldIconBg: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#0f1923', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    fieldText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#1A1A2E' },
    fieldPlaceholder: { color: '#94A3B8', fontWeight: '400' },
    toRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 4 },
    swapButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F97316', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, top: -7, zIndex: 1, ...THEME.shadows.light },

    searchButton: { borderRadius: 14, overflow: 'hidden', marginTop: 20, width: '85%', alignSelf: 'center' },
    gradientButton: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },

    // Recent searches styles
    recentSection: { marginTop: 24, paddingHorizontal: 24 },
    recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    recentTitle: { fontSize: 18, fontWeight: '800', color: '#000' },
    seeAll: { fontSize: 14, color: '#F97316', fontWeight: '600' },
    recentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E5E7EB' },
    recentIconBg: { width: 44, height: 44, borderRadius: 10, backgroundColor: '#BAE6FD', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    recentInfo: { flex: 1 },
    recentRouteRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
    recentRoute: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
    recentRouteArrow: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000ff',
        marginTop: -3
    },
    recentDate: { fontSize: 12, color: '#64748B', fontWeight: '500' },

    // City Selection Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '70%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A2E' },
    cityOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    cityOptionText: { fontSize: 16, color: '#1A1A2E' },
});

export default SearchScreen;
