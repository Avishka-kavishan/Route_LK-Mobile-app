import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';

const ProfileScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <LinearGradient
                    colors={[THEME.colors.primary, THEME.colors.secondary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.profileHeader}>
                        <View style={styles.avatarContainer}>
                            <Icon name="account" size={50} color={THEME.colors.primary} />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>Guest User</Text>
                            <Text style={styles.userEmail}>guest@routelk.com</Text>
                        </View>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>

                    <ProfileOption icon="account-edit" label="Edit Profile" />
                    <ProfileOption icon="bell" label="Notifications" />
                    <ProfileOption icon="wallet" label="My Wallet" />
                    <ProfileOption icon="shield-check" label="Security" />
                    <ProfileOption icon="help-circle" label="Support" />

                    <TouchableOpacity style={styles.logoutButton}>
                        <Icon name="logout" size={20} color="#FF3B30" />
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const ProfileOption = ({ icon, label }: { icon: string; label: string }) => (
    <TouchableOpacity style={styles.option}>
        <View style={styles.optionLeft}>
            <Icon name={icon} size={24} color={THEME.colors.primary} />
            <Text style={styles.optionLabel}>{label}</Text>
        </View>
        <Icon name="chevron-right" size={24} color={THEME.colors.textSecondary} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.colors.background,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
        borderBottomLeftRadius: THEME.radius.xl,
        borderBottomRightRadius: THEME.radius.xl,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        ...THEME.shadows.medium,
    },
    profileInfo: {
        marginLeft: 20,
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 4,
    },
    content: {
        padding: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginBottom: 16,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: THEME.radius.md,
        marginBottom: 12,
        ...THEME.shadows.light,
    },
    optionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionLabel: {
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500',
        color: THEME.colors.text,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        padding: 16,
    },
    logoutText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF3B30',
    },
});

export default ProfileScreen;
