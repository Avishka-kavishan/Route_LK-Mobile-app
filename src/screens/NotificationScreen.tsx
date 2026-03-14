import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { THEME } from '../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Back from '../assets/svg/back.svg'

type NotificationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Notifications'>;

type Props = {
    navigation: NotificationScreenNavigationProp;
};

interface NotificationItem {
    id: string;
    title: string;
    description: string;
    time: string;
    type: 'booking' | 'promo' | 'system';
    isRead: boolean;
}

const NOTIFICATIONS: NotificationItem[] = [
    {
        id: '1',
        title: 'Booking Confirmed!',
        description: 'Your trip from Colombo to Kandy is confirmed for tomorrow.',
        time: '2 mins ago',
        type: 'booking',
        isRead: false,
    },
    {
        id: '2',
        title: 'Special Offer Just for You!',
        description: 'Get 20% off on your next trip to Galle using code ROUTE20.',
        time: '1 hour ago',
        type: 'promo',
        isRead: false,
    },
    {
        id: '3',
        title: 'Trip Reminder',
        description: 'Your bus to Jaffna leaves in 3 hours. Don\'t be late!',
        time: '3 hours ago',
        type: 'booking',
        isRead: true,
    },
    {
        id: '4',
        title: 'System Update',
        description: 'We have updated our terms and conditions. Please review them.',
        time: 'Yesterday',
        type: 'system',
        isRead: true,
    },
];

const NotificationScreen = ({ navigation }: Props) => {
    const getIconName = (type: string) => {
        switch (type) {
            case 'booking': return 'ticket-confirmation-outline';
            case 'promo': return 'tag-outline';
            default: return 'bell-outline';
        }
    };

    const getIconColor = (type: string) => {
        switch (type) {
            case 'booking': return THEME.colors.primary;
            case 'promo': return '#F97316'; // Orange
            default: return THEME.colors.secondary;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Back width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {NOTIFICATIONS.length > 0 ? (
                    <>
                        <Text style={styles.sectionTitle}>Recent</Text>
                        {NOTIFICATIONS.map((item) => (
                            <TouchableOpacity 
                                key={item.id} 
                                style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.iconContainer, { backgroundColor: getIconColor(item.type) + '15' }]}>
                                    <Icon name={getIconName(item.type)} size={24} color={getIconColor(item.type)} />
                                </View>
                                
                                <View style={styles.contentContainer}>
                                    <View style={styles.row}>
                                        <Text style={styles.notifTitle}>{item.title}</Text>
                                        {!item.isRead && <View style={styles.unreadDot} />}
                                    </View>
                                    <Text style={styles.notifDescription} numberOfLines={2}>
                                        {item.description}
                                    </Text>
                                    <Text style={styles.notifTime}>{item.time}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <View style={styles.emptyIconCircle}>
                            <Icon name="bell-off-outline" size={48} color={THEME.colors.textSecondary} />
                        </View>
                        <Text style={styles.emptyTitle}>No Notifications Yet</Text>
                        <Text style={styles.emptySub}>We'll notify you when something important happens.</Text>
                    </View>
                )}
            </ScrollView>
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
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F5F9',
        marginTop:60
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F8F9FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.text,
        textAlign:"center",
        flex:1,
        marginLeft:-52
    },
    markReadButton: {
        paddingVertical: 4,
    },
    markReadText: {
        fontSize: 13,
        color: THEME.colors.secondary,
        fontWeight: '600',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: THEME.colors.textSecondary,
        marginBottom: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    notificationCard: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#F8F9FE',
        marginBottom: 12,
        alignItems: 'center',
    },
    unreadCard: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: THEME.colors.secondary + '20',
        ...THEME.shadows.light,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    contentContainer: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    notifTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: THEME.colors.text,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: THEME.colors.secondary,
    },
    notifDescription: {
        fontSize: 13,
        color: THEME.colors.textSecondary,
        lineHeight: 18,
        marginBottom: 6,
    },
    notifTime: {
        fontSize: 12,
        color: THEME.colors.textSecondary,
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F8F9FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: THEME.colors.text,
        marginBottom: 8,
    },
    emptySub: {
        fontSize: 14,
        color: THEME.colors.textSecondary,
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 20,
    },
});

export default NotificationScreen;
