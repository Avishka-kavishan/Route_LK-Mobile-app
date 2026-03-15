import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    ImageBackground,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import LinearGradient from 'react-native-linear-gradient';
import Profile from '../assets/svg/profile.svg';
import RightArrow from '../assets/svg/rigtArrow.svg';
import { scale, verticalScale, moderateScale, wp, hp } from '../utils/responsive';

const ProfileScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* ─── Header ─── */}
                <ImageBackground
                    source={require('../assets/image/header.png')}
                    style={styles.header}
                    imageStyle={styles.headerImage}
                >
                <LinearGradient
                    colors={['transparent', 'rgba(10,20,35,0.55)', '#0f1923']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.gradientOverlay}
                >
                        <View style={styles.headerTopRow}>
                            <View style={styles.profileIconBadge}>
                                <Profile width={24} height={24} color={THEME.colors.secondary} />
                            </View>
                            <Text style={styles.headerTitle}>Profile</Text>
                        </View>
                        <View>
                            <Text style={styles.manageAccountText}>Manage your account</Text>
                        </View>
                </LinearGradient>
                </ImageBackground>

                {/* ─── Profile Info ─── */}
                <View style={styles.profileInfoContainer}>
                    <View style={styles.avatarWrapper}>
                        <Image
                            source={require('../assets/image/profile.png')} // Placeholder
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.userName}>Sherina Doe</Text>
                    <Text style={styles.userEmail}>sherinadoe@gmail.com</Text>
                </View>

                {/* ─── Account Settings ─── */}
                <View style={styles.settingsSection}>
                    <View style={styles.settingsCard}>
                        <Text style={styles.sectionTitle}>Account Settings</Text>

                        <ProfileOption label="Edit Profile" />
                        <ProfileOption
                            label="Notifications"
                            onPress={() => navigation.navigate('Notifications')}
                        />
                        <ProfileOption label="My Wallet" />
                        <ProfileOption label="Security" />
                        <ProfileOption label="Support" />
                        <ProfileOption label="Log out" isLogout />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ProfileOption = ({
    label,
    icon,
    onPress,
    isLogout,
}: {
    label: string;
    icon?: string;
    onPress?: () => void;
    isLogout?: boolean;
}) => (
    <TouchableOpacity style={styles.option} onPress={onPress} activeOpacity={0.7}>
        <View style={styles.optionLeft}>
            {icon && <Icon name={icon} size={scale(24)} color="#1A1A2E" style={styles.optionIcon} />}
            <Text style={[styles.optionLabel, isLogout && styles.logoutLabel]}>{label}</Text>
        </View>
        <RightArrow width={scale(24)} height={scale(24)} color="#1A1A2E" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollContent: {
        paddingBottom: verticalScale(40),
    },
    header: {
        width: '100%',
        height: verticalScale(170), 
        borderBottomLeftRadius: scale(20), 
        borderBottomRightRadius: scale(20), 
        overflow: 'hidden',
        alignContent:'center'
    },
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
        borderRadius: scale(20),
        height: verticalScale(170)
    },
    headerTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(4),
    },
    profileIconBadge: {
        width: scale(40),
        height: scale(40),
        backgroundColor: '#FFF',
        borderRadius: scale(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12)
    },
    headerTitle: {
        fontSize: scale(22), 
        fontWeight: 'bold', 
        color: '#FFF', 
        marginTop: verticalScale(1)
    },
    manageAccountText: {
        fontSize: scale(14), 
        color: '#0BA5EC',
        fontWeight: '500', 
        marginLeft: scale(52), 
        marginTop: verticalScale(-10)
    },
    profileInfoContainer: {
        alignItems: 'center',
        marginTop: verticalScale(-40),
        marginBottom: verticalScale(20),
    },
    avatarWrapper: {
        width: scale(120),
        height: scale(120),
        borderRadius: scale(60),
        borderWidth: scale(4),
        borderColor: '#0EA5E9',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        ...THEME.shadows.medium,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    userName: {
        fontSize: scale(22),
        fontWeight: 'bold',
        color: '#1A1A2E',
        marginTop: verticalScale(12),
    },
    userEmail: {
        fontSize: scale(15),
        color: '#1A1A2E',
        opacity: 0.7,
        marginTop: verticalScale(4),
    },
    settingsSection: {
        paddingHorizontal: scale(20),
    },
    settingsCard: {
        backgroundColor: '#F3F4F6',
        borderRadius: scale(16),
        padding: scale(20),
    },
    sectionTitle: {
        fontSize: scale(16),
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: verticalScale(16),
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: verticalScale(14),
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionIcon: {
        marginRight: scale(12),
    },
    optionLabel: {
        fontSize: scale(17),
        fontWeight: '600',
        color: '#1A1A2E',
    },
    logoutLabel: {
        color: '#EF4444',
    },
});

export default ProfileScreen;
