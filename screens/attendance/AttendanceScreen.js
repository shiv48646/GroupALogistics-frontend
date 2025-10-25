// screens/attendance/AttendanceScreen.js - Main Attendance Management
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');
const isAndroid = Platform.OS === 'android';

const AttendanceScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [checkInStatus, setCheckInStatus] = useState({
    isCheckedIn: false,
    checkInTime: null,
    checkOutTime: null,
    workDuration: null
  });

  // Mock attendance data
  const [attendanceData] = useState({
    todayStatus: 'checked_in',
    checkInTime: '09:05 AM',
    location: 'HQ - Main Office',
    workHours: '7h 45m',
    thisWeek: {
      present: 4,
      absent: 0,
      late: 1,
      totalDays: 5
    },
    thisMonth: {
      present: 18,
      absent: 1,
      late: 2,
      leaves: 1,
      totalDays: 22
    },
    geofence: {
      name: 'GroupA Logistics HQ',
      radius: 100,
      status: 'inside',
      distance: 45
    },
    team: [
      { id: 1, name: 'Sarah Chen', role: 'Driver', status: 'on_route', time: '08:45 AM', location: 'Route 15' },
      { id: 2, name: 'Mike Rodriguez', role: 'Supervisor', status: 'checked_in', time: '08:30 AM', location: 'HQ' },
      { id: 3, name: 'Lisa Johnson', role: 'Dispatcher', status: 'checked_in', time: '09:00 AM', location: 'HQ' },
      { id: 4, name: 'David Kim', role: 'Driver', status: 'on_route', time: '07:30 AM', location: 'Highway 101' }
    ]
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updateWorkDuration();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        Alert.alert('Permission Required', 'Location permission is needed for attendance tracking.');
      }
    } catch (error) {
      console.log('Location permission error:', error);
    }
  };

  const getCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation(location.coords);
      setLocationLoading(false);
    } catch (error) {
      console.log('Location error:', error);
      setLocationLoading(false);
    }
  };

  const updateWorkDuration = () => {
    if (checkInStatus.isCheckedIn && checkInStatus.checkInTime) {
      const now = new Date();
      const checkIn = new Date(checkInStatus.checkInTime);
      const diff = now - checkIn;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCheckInStatus(prev => ({
        ...prev,
        workDuration: `${hours}h ${minutes}m`
      }));
    }
  };

  const handleCheckIn = async () => {
    await getCurrentLocation();
    
    if (!location) {
      Alert.alert('Location Required', 'Please enable location services to check in.');
      return;
    }

    Alert.alert(
      'Check In',
      `Check in at current location?\n\nTime: ${currentTime.toLocaleTimeString()}\nLocation: GPS verified`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check In',
          onPress: () => {
            setCheckInStatus({
              isCheckedIn: true,
              checkInTime: new Date(),
              checkOutTime: null,
              workDuration: '0h 0m'
            });
            Alert.alert('Success', 'You have been checked in successfully!');
          }
        }
      ]
    );
  };

  const handleCheckOut = () => {
    Alert.alert(
      'Check Out',
      `Check out now?\n\nWork Duration: ${checkInStatus.workDuration}\nTime: ${currentTime.toLocaleTimeString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Check Out',
          onPress: () => {
            setCheckInStatus(prev => ({
              ...prev,
              isCheckedIn: false,
              checkOutTime: new Date()
            }));
            Alert.alert('Success', `Checked out successfully!\n\nTotal work time: ${checkInStatus.workDuration}`);
          }
        }
      ]
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentLocation();
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderTouchable = (onPress, children, style = {}) => {
    if (isAndroid) {
      return (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple('#e3f2fd', false)}
        >
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={onPress} style={style} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'checked_in': return '#388e3c';
      case 'on_route': return '#1976d2';
      case 'checked_out': return '#757575';
      case 'late': return '#f57c00';
      case 'absent': return '#d32f2f';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'checked_in': return 'checkmark-circle';
      case 'on_route': return 'car';
      case 'checked_out': return 'log-out';
      case 'late': return 'time';
      case 'absent': return 'close-circle';
      default: return 'remove-circle';
    }
  };

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            {renderTouchable(
              () => navigation.goBack(),
              <Ionicons name="arrow-back" size={24} color="#fff" />,
              styles.backButton
            )}
            <View>
              <Text style={styles.headerTitle}>Attendance</Text>
              <Text style={styles.headerSubtitle}>{formatDate()}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            {renderTouchable(
              () => navigation.navigate('AttendanceHistory'),
              <Ionicons name="calendar" size={20} color="#fff" />,
              styles.headerButton
            )}
            {renderTouchable(
              () => navigation.navigate('GeofenceSettings'),
              <Ionicons name="location" size={20} color="#fff" />,
              styles.headerButton
            )}
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1976d2']}
          />
        }
      >
        {/* Current Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View style={styles.statusInfo}>
              <Text style={styles.statusLabel}>Current Status</Text>
              <View style={styles.statusBadge}>
                <Ionicons 
                  name={getStatusIcon(checkInStatus.isCheckedIn ? 'checked_in' : 'checked_out')} 
                  size={16} 
                  color={getStatusColor(checkInStatus.isCheckedIn ? 'checked_in' : 'checked_out')} 
                />
                <Text style={[
                  styles.statusText,
                  { color: getStatusColor(checkInStatus.isCheckedIn ? 'checked_in' : 'checked_out') }
                ]}>
                  {checkInStatus.isCheckedIn ? 'Checked In' : 'Not Checked In'}
                </Text>
              </View>
            </View>
            <Text style={styles.currentTime}>{currentTime.toLocaleTimeString()}</Text>
          </View>

          {checkInStatus.isCheckedIn && (
            <View style={styles.workInfo}>
              <View style={styles.workInfoItem}>
                <Text style={styles.workInfoLabel}>Check-In Time</Text>
                <Text style={styles.workInfoValue}>
                  {checkInStatus.checkInTime?.toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.workInfoItem}>
                <Text style={styles.workInfoLabel}>Work Duration</Text>
                <Text style={styles.workInfoValue}>{checkInStatus.workDuration}</Text>
              </View>
            </View>
          )}

          {/* Check In/Out Button */}
          <View style={styles.checkButtonWrapper}>
            {renderTouchable(
              checkInStatus.isCheckedIn ? handleCheckOut : handleCheckIn,
              <View style={[
                styles.checkButton,
                { backgroundColor: checkInStatus.isCheckedIn ? '#d32f2f' : '#388e3c' }
              ]}>
                {locationLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Ionicons 
                      name={checkInStatus.isCheckedIn ? 'log-out' : 'log-in'} 
                      size={24} 
                      color="#fff" 
                    />
                    <Text style={styles.checkButtonText}>
                      {checkInStatus.isCheckedIn ? 'Check Out' : 'Check In'}
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        </View>

        {/* Location & Geofence */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Status</Text>
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <View style={[
                styles.geofenceIndicator,
                { backgroundColor: attendanceData.geofence.status === 'inside' ? '#388e3c' : '#f57c00' }
              ]} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{attendanceData.geofence.name}</Text>
                <Text style={styles.locationDetail}>
                  {attendanceData.geofence.status === 'inside' ? 'Inside' : 'Outside'} geofence • {attendanceData.geofence.distance}m away
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#bdbdbd" />
            </View>
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.summaryGrid}>
            <SummaryCard
              title="Present"
              value={attendanceData.thisWeek.present}
              total={attendanceData.thisWeek.totalDays}
              icon="checkmark-circle"
              color="#388e3c"
            />
            <SummaryCard
              title="Late"
              value={attendanceData.thisWeek.late}
              total={attendanceData.thisWeek.totalDays}
              icon="time"
              color="#f57c00"
            />
            <SummaryCard
              title="Absent"
              value={attendanceData.thisWeek.absent}
              total={attendanceData.thisWeek.totalDays}
              icon="close-circle"
              color="#d32f2f"
            />
          </View>
        </View>

        {/* Monthly Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>This Month</Text>
            {renderTouchable(
              () => navigation.navigate('AttendanceHistory'),
              <Text style={styles.viewAllText}>View All</Text>
            )}
          </View>
          <View style={styles.monthlyCard}>
            <View style={styles.monthlyStats}>
              <MonthlyStatItem
                label="Present Days"
                value={attendanceData.thisMonth.present}
                color="#388e3c"
              />
              <MonthlyStatItem
                label="Absent Days"
                value={attendanceData.thisMonth.absent}
                color="#d32f2f"
              />
              <MonthlyStatItem
                label="Late Arrivals"
                value={attendanceData.thisMonth.late}
                color="#f57c00"
              />
              <MonthlyStatItem
                label="Leaves Taken"
                value={attendanceData.thisMonth.leaves}
                color="#1976d2"
              />
            </View>
            <View style={styles.attendanceRate}>
              <Text style={styles.attendanceRateLabel}>Attendance Rate</Text>
              <Text style={styles.attendanceRateValue}>
                {Math.round((attendanceData.thisMonth.present / attendanceData.thisMonth.totalDays) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Team Attendance (for managers) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Team Status</Text>
            {renderTouchable(
              () => navigation.navigate('TeamAttendance'),
              <Text style={styles.viewAllText}>View All</Text>
            )}
          </View>
          <View style={styles.teamList}>
            {attendanceData.team.map((member) => (
              <View key={member.id} style={styles.teamMemberWrapper}>
                {renderTouchable(
                  () => console.log(`View ${member.name} details`),
                  <View style={styles.teamMember}>
                    <View style={styles.teamMemberAvatar}>
                      <Text style={styles.teamMemberAvatarText}>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <View style={styles.teamMemberInfo}>
                      <Text style={styles.teamMemberName}>{member.name}</Text>
                      <Text style={styles.teamMemberRole}>{member.role}</Text>
                      <Text style={styles.teamMemberLocation}>
                        <Ionicons name="location" size={12} color="#757575" /> {member.location}
                      </Text>
                    </View>
                    <View style={styles.teamMemberStatus}>
                      <View style={[
                        styles.teamMemberStatusBadge,
                        { backgroundColor: getStatusColor(member.status) + '15' }
                      ]}>
                        <Ionicons 
                          name={getStatusIcon(member.status)} 
                          size={14} 
                          color={getStatusColor(member.status)} 
                        />
                      </View>
                      <Text style={styles.teamMemberTime}>{member.time}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// Reusable Components
const SummaryCard = ({ title, value, total, icon, color }) => (
  <View style={styles.summaryCard}>
    <View style={[styles.summaryIcon, { backgroundColor: color + '15' }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.summaryValue}>{value}/{total}</Text>
    <Text style={styles.summaryTitle}>{title}</Text>
  </View>
);

const MonthlyStatItem = ({ label, value, color }) => (
  <View style={styles.monthlyStatItem}>
    <View style={[styles.monthlyStatDot, { backgroundColor: color }]} />
    <Text style={styles.monthlyStatLabel}>{label}</Text>
    <Text style={[styles.monthlyStatValue, { color }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  header: {
    backgroundColor: '#1976d2',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
    elevation: 4
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  backButton: {
    marginRight: 16,
    padding: 8
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff'
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2
  },
  headerRight: {
    flexDirection: 'row'
  },
  headerButton: {
    padding: 12,
    marginLeft: 4
  },
  content: {
    flex: 1
  },
  statusCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 2
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16
  },
  statusInfo: {
    flex: 1
  },
  statusLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8
  },
  currentTime: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121'
  },
  workInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5'
  },
  workInfoItem: {
    flex: 1
  },
  workInfoLabel: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4
  },
  workInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121'
  },
  checkButtonWrapper: {
    overflow: 'hidden',
    borderRadius: 12
  },
  checkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121'
  },
  viewAllText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '500'
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  geofenceIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12
  },
  locationInfo: {
    flex: 1
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4
  },
  locationDetail: {
    fontSize: 13,
    color: '#757575'
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  summaryCard: {
    width: (width - 64) / 3,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4
  },
  summaryTitle: {
    fontSize: 12,
    color: '#757575',
    textAlign: 'center'
  },
  monthlyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2
  },
  monthlyStats: {
    marginBottom: 20
  },
  monthlyStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  monthlyStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12
  },
  monthlyStatLabel: {
    flex: 1,
    fontSize: 14,
    color: '#757575'
  },
  monthlyStatValue: {
    fontSize: 16,
    fontWeight: '600'
  },
  attendanceRate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5'
  },
  attendanceRateLabel: {
    fontSize: 14,
    color: '#757575'
  },
  attendanceRateValue: {
    fontSize: 24,
    fontWeight: '600',
    color: '#388e3c'
  },
  teamList: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2
  },
  teamMemberWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  teamMember: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  teamMemberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1976d2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  teamMemberAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  },
  teamMemberInfo: {
    flex: 1
  },
  teamMemberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 2
  },
  teamMemberRole: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 2
  },
  teamMemberLocation: {
    fontSize: 11,
    color: '#757575'
  },
  teamMemberStatus: {
    alignItems: 'flex-end'
  },
  teamMemberStatusBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4
  },
  teamMemberTime: {
    fontSize: 11,
    color: '#757575'
  },
  bottomSpacing: {
    height: 24
  }
});

export default AttendanceScreen;