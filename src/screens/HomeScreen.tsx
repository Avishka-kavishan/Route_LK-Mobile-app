import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
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
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { MainTabParamList } from '../navigation/TabNavigator';

import Logo from "../assets/svg/logo.svg";
import CitySelect from "../assets/svg/city select.svg";
import Dropdown from "../assets/svg/dropdown.svg";
import Change from "../assets/svg/change.svg";
import Calander from "../assets/svg/calander.svg";
import Net from "../assets/svg/net.svg";
import Sheild from "../assets/svg/sheild.svg";
import Time from "../assets/svg/time.svg";
import Bus from "../assets/svg/bus1.svg";
import Notification from "../assets/svg/Notification icon.svg";


// ─── Navigation Types ─────────────────────────────────────────────────────────
type HomeScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, 'Home'>,
    StackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
    navigation: HomeScreenNavigationProp;
};

const SRI_LANKA_CITIES = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Chilaw', 'Colombo',
    'Dambulla', 'Galle', 'Gampaha', 'Hambantota', 'Hatton', 'Jaffna',
    'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala',
    'Mannar', 'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Negombo',
    'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee',
    'Vavuniya', 'Welisara'
];

// ─── Main Component ───────────────────────────────────────────────────────────
const HomeScreen = ({ navigation }: HomeScreenProps) => {
    // State for selected form values
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState<Date | null>(null);
    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [cityModalVisible, setCityModalVisible] = useState(false);
    const [selectingFor, setSelectingFor] = useState<'from' | 'to' | null>(null);

    // Swap the From and To cities
    const swapLocations = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    // Navigate to bus list with search parameters
    const handleSearch = () => {
        navigation.navigate('BusList', {
            startPoint: from || 'Colombo',
            endPoint: to || 'Kandy',
            date: date ? date.toLocaleDateString() : new Date().toLocaleDateString(),
            time: date ? date.toLocaleTimeString() : new Date().toLocaleTimeString(),
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
                {/* Bus photo background — replace require() path with your actual image */}
                <ImageBackground
                    source={require('../assets/image/header.png')}   // ← swap with your bus image
                    style={styles.header}
                    imageStyle={styles.headerImage}
                    resizeMode="cover"
                >
                    {/* Bottom-only gradient overlay: transparent at top → dark at bottom */}
                    <LinearGradient
                        colors={['transparent', 'rgba(25, 39, 61, 0.55)', '#0f1923']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradientOverlay}
                    >
                        {/* Top bar: Logo + Notification */}
                        <View style={styles.topBar}>
                            {/* App logo badge + brand name */}
                            <View style={styles.logoRow}>
                                <View style={styles.logoBadge}>
                                    <Logo width={35} height={35} />
                                </View>
                                <Text style={styles.brandText}>
                                    Route<Text style={styles.brandHighlight}>LK</Text>
                                </Text>
                            </View>

                            {/* Notification bell */}
                            <TouchableOpacity 
                                style={styles.bellButton}
                                onPress={() => {
                                    console.log('Notification button pressed');
                                    navigation.navigate('Notifications');
                                }}
                                hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                activeOpacity={0.7}
                            >
                                <Notification width={40} height={40} />
                            </TouchableOpacity>
                        </View>

                        {/* Hero tagline */}
                        <Text style={styles.heroTitle}>Book your{'\n'}Bus Journey</Text>
                        <Text style={styles.heroSub}>Fast, safe & comfortable travel</Text>
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
                            <CitySelect width={35} height={35} />
                        </View>
                        <Text style={[styles.fieldText, !from && styles.fieldPlaceholder]}>
                            {from || 'Select City'}
                        </Text>
                        <Dropdown width={35} height={35} />
                    </TouchableOpacity>

                    {/* TO field with swap button */}
                    <View style={styles.toRow}>
                        <Text style={styles.fieldLabel}>To</Text>
                        {/* Orange swap icon */}
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
                            <CitySelect width={35} height={35} />
                        </View>
                        <Text style={[styles.fieldText, !to && styles.fieldPlaceholder]}>
                            {to || 'Select City'}
                        </Text>
                        <Dropdown width={35} height={35} />
                    </TouchableOpacity>

                    {/* DATE field */}
                    <Text style={[styles.fieldLabel, { marginTop: 16 }]}>Date</Text>
                    <TouchableOpacity
                        style={styles.dropdownField}
                        onPress={() => setDatePickerOpen(true)}
                    >
                        <View style={styles.fieldIconBg}>
                            <Calander width={35} height={35} />
                        </View>
                        <Text style={[styles.fieldText, !date && styles.fieldPlaceholder]}>
                            {date ? date.toDateString() : 'Select Date'}
                        </Text>
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
                        <Text style={styles.searchButtonText}>Search Route</Text>
                    </TouchableOpacity>
                </View>

                {/* ─── WHY CHOOSE US ────────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Why choose us</Text>
                    <View style={styles.choiceRow}>
                        <ChoiceCard icon={<Sheild width={45} height={45} />} label="Safe Travel" sub="GPS Tracked" />
                        <ChoiceCard icon={<Time width={45} height={45} />} label="On Time" sub="99% punctual" />
                        <ChoiceCard icon={<Net width={45} height={45} />} label="Wide Network" sub="50+ routes" />
                    </View>
                </View>

                {/* ─── POPULAR ROUTES ───────────────────────────────────────────── */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular Routes</Text>
                    <RouteCard from="Colombo" to="Kandy" sub="Multiple buses daily" price="1,500" />
                    <RouteCard from="Colombo" to="Galle" sub="Multiple buses daily" price="900" />
                    <RouteCard from="Kandy" to="Jaffna" sub="Multiple buses daily" price="2,800" />
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

// ─── Sub-Components ───────────────────────────────────────────────────────────

/** Card for the "Why Choose Us" grid */
const ChoiceCard = ({ icon, label, sub }: { icon: React.ReactNode | string; label: string; sub: string }) => (
    <View style={styles.choiceCard}>
        <View style={styles.choiceIconBg}>
            {typeof icon === 'string'
                ? <Icon name={icon} size={26} color="#0EA5E9" />
                : icon}
        </View>
        <Text style={styles.choiceLabel}>{label}</Text>
        <Text style={styles.choiceSub}>{sub}</Text>
    </View>
);

/** Row card for each popular route */
const RouteCard = ({ from, to, sub, price }: { from: string; to: string; sub: string; price: string }) => (
    <TouchableOpacity style={styles.routeCard}>
        {/* Dark bus icon on left */}
        <View style={styles.routeIconBg}>
            <Bus width={45} height={45} />
        </View>
        {/* Route text */}
        <View style={styles.routeInfo}>
            <Text style={styles.routeTitle}>{from} → {to}</Text>
            <Text style={styles.routeSub}>{sub}</Text>
        </View>
        {/* Price on right in orange */}
        <Text style={styles.routePrice}>Rs. {price}</Text>
    </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

    // Layout
    container: {
        flex: 1,
        backgroundColor: '#F8F9FE',
    },
    scrollContent: {
        paddingBottom: 48,
    },

    // ─── Header ───────────────────────────────────────────────────────────────
    // ImageBackground itself — no padding here, the gradient overlay handles it
    // ImageBackground itself
    header: {
        width: '100%',
        minHeight: 240,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: 'hidden',
    },
    // The actual bus photo styling (covers the full ImageBackground)
    // The actual bus photo styling
    headerImage: {
    },
    gradientOverlay: {
        paddingTop: 52,
        paddingBottom: 60,        // Extra bottom padding so search card overlaps nicely
        paddingHorizontal: 24,
        flex: 1,
        justifyContent: 'flex-start',
    },

    // Top bar: logo row + bell
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoBadge: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#1e3a50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    brandText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF',
    },
    brandHighlight: {
        color: '#0EA5E9',          // Teal highlight for "LK"
    },
    bellButton: {
        width: 44,                  // Increased from 38 for better hit area
        height: 44,                 // Increased from 38
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,                 // Ensure it's on top
    },

    // Hero text
    heroTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFF',
        lineHeight: 30,
        marginBottom: 5,
    },
    heroSub: {
        fontSize: 14,
        color: '#0EA5E9',
        fontWeight: '500',
    },

    // ─── Search Card ──────────────────────────────────────────────────────────
    searchCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: -50,            // Pull up over header
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.10,
        shadowRadius: 16,
        elevation: 8,
    },

    // Field labels
    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0EA5E9',
        marginBottom: 8,
    },

    // Dropdown-style field row
    dropdownField: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F5F9',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 13,
        marginBottom: 4,
    },
    fieldIconBg: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#0f1923',   // Dark icon background matching header
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    fieldText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A2E',
    },
    fieldPlaceholder: {
        color: '#94A3B8',
        fontWeight: '400',
    },

    // To/Swap row
    toRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        marginBottom: 8,
    },
    swapButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#F97316',   // Orange swap button matching mockup
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Search button
    searchButton: {
        backgroundColor: '#0EA5E9',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '85%',
        alignSelf: 'center',
    },
    searchButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.3,
    },

    // ─── Sections ─────────────────────────────────────────────────────────────
    section: {
        paddingHorizontal: 20,
        marginTop: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A2E',
        marginBottom: 16,
    },

    // ─── Why Choose Us ────────────────────────────────────────────────────────
    choiceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    choiceCard: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 8,
        alignItems: 'center',
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    choiceIconBg: {
        width: 48,
        height: 48,
        borderRadius: 14,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    choiceLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1A1A2E',
        textAlign: 'center',
    },
    choiceSub: {
        fontSize: 11,
        color: '#94A3B8',
        textAlign: 'center',
        marginTop: 3,
    },

    // ─── Popular Routes ───────────────────────────────────────────────────────
    routeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    routeIconBg: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#1e293b',   // Dark icon background
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    routeInfo: {
        flex: 1,
    },
    routeTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000ff',
        marginTop: -3
    },
    routeSub: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 2,
    },
    routePrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#F97316',             // Orange price to match mockup
    },

    // City Selection Modal
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, maxHeight: '70%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A2E' },
    cityOption: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
    cityOptionText: { fontSize: 16, color: '#1A1A2E' },
});

export default HomeScreen;
