// components/communication/GroupChat.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Reusable Components
const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const Button = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  style,
  disabled = false,
  icon
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button,
        styles[`button${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
        styles[`button${size.charAt(0).toUpperCase() + size.slice(1)}`],
        disabled && styles.buttonDisabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && (
        <Ionicons 
          name={icon} 
          size={16} 
          color={variant === 'primary' ? 'white' : '#374151'} 
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[
        styles.buttonText, 
        styles[`buttonText${variant.charAt(0).toUpperCase() + variant.slice(1)}`]
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const Avatar = ({ user, size = 'md', showStatus = true }) => {
  const avatarSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
  
  return (
    <View style={{ position: 'relative' }}>
      <View style={[
        styles.avatar, 
        { 
          width: avatarSize, 
          height: avatarSize,
          borderRadius: avatarSize / 2
        }
      ]}>
        <Text style={[styles.avatarText, { fontSize: avatarSize * 0.35 }]}>
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </Text>
      </View>
      {showStatus && (
        <View style={[
          styles.statusDot,
          { 
            backgroundColor: 
              user.status === 'online' ? '#10b981' :
              user.status === 'busy' ? '#ef4444' :
              user.status === 'away' ? '#f59e0b' : '#6b7280'
          }
        ]} />
      )}
    </View>
  );
};

const Badge = ({ count, variant = 'danger' }) => {
  if (count === 0) return null;
  
  return (
    <View style={[styles.badge, styles[`badge${variant.charAt(0).toUpperCase() + variant.slice(1)}`]]}>
      <Text style={styles.badgeText}>{count}</Text>
    </View>
  );
};

const GroupChat = ({ navigation }) => {
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showChannelSettings, setShowChannelSettings] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const messagesRef = useRef(null);

  // Logistics-focused channels and data
  const channels = [
    { 
      id: 'general', 
      name: 'General', 
      type: 'public',
      icon: 'chatbubbles',
      description: 'General team discussions and announcements',
      members: 42,
      unread: 3
    },
    { 
      id: 'dispatchers', 
      name: 'Dispatch Center', 
      type: 'public',
      icon: 'radio',
      description: 'Real-time dispatch coordination',
      members: 8,
      unread: 5
    },
    { 
      id: 'drivers', 
      name: 'Driver Network', 
      type: 'public',
      icon: 'car',
      description: 'Driver communications and updates',
      members: 35,
      unread: 2
    },
    { 
      id: 'operations', 
      name: 'Operations', 
      type: 'private',
      icon: 'settings',
      description: 'Operations team coordination',
      members: 12,
      unread: 0
    },
    { 
      id: 'maintenance', 
      name: 'Fleet Maintenance', 
      type: 'public',
      icon: 'build',
      description: 'Vehicle maintenance and repairs',
      members: 15,
      unread: 1
    },
    { 
      id: 'emergency', 
      name: 'Emergency', 
      type: 'private',
      icon: 'warning',
      description: 'Emergency communications only',
      members: 25,
      unread: 0
    }
  ];

  const onlineUsers = [
    { id: 1, name: 'John Martinez', role: 'Dispatch Manager', status: 'online', location: 'HQ' },
    { id: 2, name: 'Sarah Chen', role: 'Senior Driver', status: 'online', location: 'Route 45' },
    { id: 3, name: 'Mike Rodriguez', role: 'Fleet Supervisor', status: 'busy', location: 'Maintenance Bay' },
    { id: 4, name: 'Lisa Johnson', role: 'Operations Coordinator', status: 'online', location: 'HQ' },
    { id: 5, name: 'David Kim', role: 'Driver', status: 'away', location: 'Downtown Route' },
    { id: 6, name: 'Emma Wilson', role: 'Logistics Manager', status: 'online', location: 'HQ' },
    { id: 7, name: 'Carlos Mendez', role: 'Mechanic', status: 'online', location: 'Workshop' },
    { id: 8, name: 'Ana Torres', role: 'Customer Service', status: 'online', location: 'Call Center' }
  ];

  const [messages, setMessages] = useState({
    general: [
      {
        id: 1,
        user: { id: 1, name: 'John Martinez', role: 'Dispatch Manager', status: 'online' },
        message: 'Good morning team! Weather alert: Heavy rain expected 2-4 PM. Please adjust delivery schedules accordingly.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'alert',
        reactions: [
          { emoji: '☔', count: 8, users: ['Sarah Chen', 'Mike Rodriguez', 'Lisa Johnson', 'David Kim', 'Emma Wilson', 'Carlos Mendez', 'Ana Torres', 'Operations'] }
        ],
        replies: []
      },
      {
        id: 2,
        user: { id: 2, name: 'Sarah Chen', role: 'Senior Driver', status: 'online' },
        message: 'Copy that. Currently on Highway 101, no issues yet. ETA Downtown depot: 45 minutes.',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        type: 'status',
        reactions: [
          { emoji: '✅', count: 3, users: ['John Martinez', 'Lisa Johnson', 'Emma Wilson'] }
        ],
        replies: []
      },
      {
        id: 3,
        user: { id: 4, name: 'Lisa Johnson', role: 'Operations Coordinator', status: 'online' },
        message: 'Reminder: Safety meeting tomorrow 9 AM. Topics: New route protocols and emergency procedures. Attendance mandatory.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        type: 'announcement',
        reactions: [
          { emoji: '📋', count: 12, users: ['All Staff'] }
        ],
        replies: [
          {
            id: 31,
            user: { id: 7, name: 'Carlos Mendez', role: 'Mechanic', status: 'online' },
            message: 'Will the maintenance team protocols be covered too?',
            timestamp: new Date(Date.now() - 55 * 60 * 1000)
          },
          {
            id: 32,
            user: { id: 4, name: 'Lisa Johnson', role: 'Operations Coordinator', status: 'online' },
            message: 'Yes Carlos, maintenance protocols will be part of the agenda.',
            timestamp: new Date(Date.now() - 50 * 60 * 1000)
          }
        ]
      }
    ],
    dispatchers: [
      {
        id: 101,
        user: { id: 1, name: 'John Martinez', role: 'Dispatch Manager', status: 'online' },
        message: 'PRIORITY: Order #DL-2024-1156 needs immediate pickup from Metro Warehouse. Driver needed ASAP.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        type: 'urgent',
        reactions: [],
        replies: []
      },
      {
        id: 102,
        user: { id: 5, name: 'David Kim', role: 'Driver', status: 'away' },
        message: 'Can take it. Currently 10 minutes from Metro Warehouse. ETA 15 minutes.',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        type: 'response',
        reactions: [
          { emoji: '🚛', count: 2, users: ['John Martinez', 'Lisa Johnson'] }
        ],
        replies: []
      }
    ],
    drivers: [
      {
        id: 201,
        user: { id: 2, name: 'Sarah Chen', role: 'Senior Driver', status: 'online' },
        message: 'Traffic update: I-95 North has 20-minute delays due to construction. Taking alternate Route 1.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        type: 'traffic',
        reactions: [
          { emoji: '🚧', count: 5, users: ['David Kim', 'Mike Rodriguez', 'John Martinez', 'Emma Wilson', 'Ana Torres'] }
        ],
        replies: []
      }
    ],
    operations: [],
    maintenance: [
      {
        id: 301,
        user: { id: 7, name: 'Carlos Mendez', role: 'Mechanic', status: 'online' },
        message: 'Vehicle TRUCK-05 scheduled maintenance completed. Oil change, brake inspection, tire rotation done. Ready for service.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'maintenance',
        reactions: [
          { emoji: '🔧', count: 4, users: ['Mike Rodriguez', 'John Martinez', 'Lisa Johnson', 'Emma Wilson'] }
        ],
        replies: []
      }
    ],
    emergency: []
  });

  const emojis = ['👍', '👎', '❤️', '😂', '😮', '😢', '🚛', '✅', '⚠️', '🔧', '📋', '☔', '🚧', '📍', '⏰', '💡'];

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeChannel]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: { id: 99, name: 'You', role: 'Current User', status: 'online' },
      message: message.trim(),
      timestamp: new Date(),
      type: 'text',
      reactions: [],
      replies: []
    };

    setMessages(prev => ({
      ...prev,
      [activeChannel]: [...(prev[activeChannel] || []), newMessage]
    }));

    setMessage('');
    setShowEmojiPicker(false);
  };

  const addReaction = (messageId, emoji) => {
    setMessages(prev => ({
      ...prev,
      [activeChannel]: prev[activeChannel].map(msg => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji);
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions.map(r =>
                r.emoji === emoji
                  ? { ...r, count: r.count + 1, users: [...r.users, 'You'] }
                  : r
              )
            };
          } else {
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, count: 1, users: ['You'] }]
            };
          }
        }
        return msg;
      })
    }));
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return time.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'urgent': return '#ef4444';
      case 'alert': return '#f59e0b';
      case 'announcement': return '#3b82f6';
      case 'maintenance': return '#8b5cf6';
      case 'traffic': return '#f97316';
      case 'status': return '#10b981';
      default: return '#374151';
    }
  };

  const currentChannel = channels.find(c => c.id === activeChannel);
  const currentMessages = messages[activeChannel] || [];
  const onlineCount = onlineUsers.filter(u => u.status === 'online').length;

  const renderMessage = ({ item: msg }) => (
    <View style={styles.messageContainer}>
      <Avatar user={msg.user} showStatus={false} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{msg.user.name}</Text>
          <Text style={styles.userRole}>{msg.user.role}</Text>
          <Text style={styles.timestamp}>{formatTime(msg.timestamp)}</Text>
          {msg.type !== 'text' && (
            <View style={[styles.messageTypeIndicator, { backgroundColor: getMessageTypeColor(msg.type) }]}>
              <Text style={styles.messageTypeText}>{msg.type.toUpperCase()}</Text>
            </View>
          )}
        </View>
        
        <Card style={[styles.messageCard, msg.type === 'urgent' && styles.urgentMessage]}>
          <Text style={styles.messageText}>{msg.message}</Text>
          
          {msg.reactions.length > 0 && (
            <View style={styles.reactionsContainer}>
              {msg.reactions.map((reaction, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.reactionButton}
                  onPress={() => addReaction(msg.id, reaction.emoji)}
                >
                  <Text style={styles.reactionEmoji}>{reaction.emoji}</Text>
                  <Text style={styles.reactionCount}>{reaction.count}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {msg.replies.length > 0 && (
            <View style={styles.repliesContainer}>
              {msg.replies.map((reply) => (
                <View key={reply.id} style={styles.replyItem}>
                  <Avatar user={reply.user} size="sm" showStatus={false} />
                  <View style={styles.replyContent}>
                    <Text style={styles.replyUser}>{reply.user.name}</Text>
                    <Text style={styles.replyText}>{reply.message}</Text>
                    <Text style={styles.replyTime}>{formatTime(reply.timestamp)}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </Card>
      </View>
    </View>
  );

  const renderChannel = ({ item: channel }) => (
    <TouchableOpacity 
      style={[
        styles.channelButton,
        activeChannel === channel.id && styles.channelButtonActive
      ]}
      onPress={() => setActiveChannel(channel.id)}
    >
      <View style={styles.channelInfo}>
        <Ionicons 
          name={channel.icon} 
          size={18} 
          color={activeChannel === channel.id ? '#3498db' : '#6b7280'} 
        />
        <Text style={[
          styles.channelName,
          activeChannel === channel.id && styles.channelNameActive
        ]}>
          {channel.name}
        </Text>
      </View>
      <Badge count={channel.unread} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Ionicons name={currentChannel?.icon} size={20} color="#3498db" />
            <Text style={styles.headerTitle}>#{currentChannel?.name}</Text>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setShowUserList(true)}
            >
              <Ionicons name="people" size={20} color="#6b7280" />
              <Text style={styles.onlineCount}>{onlineCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setShowChannelSettings(true)}
            >
              <Ionicons name="settings" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Channel Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.channelSelector}
          contentContainerStyle={styles.channelSelectorContent}
        >
          {channels.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={[
                styles.channelChip,
                activeChannel === channel.id && styles.channelChipActive
              ]}
              onPress={() => setActiveChannel(channel.id)}
            >
              <Ionicons 
                name={channel.icon} 
                size={16} 
                color={activeChannel === channel.id ? 'white' : '#6b7280'} 
              />
              <Text style={[
                styles.channelChipText,
                activeChannel === channel.id && styles.channelChipTextActive
              ]}>
                {channel.name}
              </Text>
              {channel.unread > 0 && (
                <View style={styles.channelChipBadge}>
                  <Text style={styles.channelChipBadgeText}>{channel.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Messages */}
        <FlatList
          ref={messagesRef}
          data={currentMessages}
          renderItem={renderMessage}
          keyExtractor={item => item.id.toString()}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={scrollToBottom}
        />

        {/* Emoji Picker */}
        {showEmojiPicker && (
          <View style={styles.emojiPicker}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {emojis.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  onPress={() => {
                    setMessage(message + emoji);
                    setShowEmojiPicker(false);
                  }}
                  style={styles.emojiButton}
                >
                  <Text style={styles.emojiText}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.messageInput}
              value={message}
              onChangeText={setMessage}
              placeholder={`Message #${currentChannel?.name}`}
              multiline
              maxLength={500}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity 
                style={styles.inputAction}
                onPress={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Ionicons name="happy" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>
          <Button
            title="Send"
            onPress={sendMessage}
            disabled={!message.trim()}
            icon="send"
            style={styles.sendButton}
          />
        </View>

        {/* Online Users Modal */}
        <Modal
          visible={showUserList}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Team Online ({onlineCount})</Text>
                <TouchableOpacity onPress={() => setShowUserList(false)}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={onlineUsers.filter(u => u.status === 'online')}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item: user }) => (
                  <View style={styles.userListItem}>
                    <Avatar user={user} />
                    <View style={styles.userListInfo}>
                      <Text style={styles.userListName}>{user.name}</Text>
                      <Text style={styles.userListRole}>{user.role}</Text>
                      <Text style={styles.userListLocation}>{user.location}</Text>
                    </View>
                    <TouchableOpacity style={styles.messageUserButton}>
                      <Ionicons name="chatbubble" size={16} color="#3498db" />
                    </TouchableOpacity>
                  </View>
                )}
                style={styles.userList}
              />
            </View>
          </View>
        </Modal>

        {/* Channel Settings Modal */}
        <Modal
          visible={showChannelSettings}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Channel Settings</Text>
                <TouchableOpacity onPress={() => setShowChannelSettings(false)}>
                  <Ionicons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <View style={styles.modalBody}>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Channel Name</Text>
                  <Text style={styles.settingValue}>{currentChannel?.name}</Text>
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Description</Text>
                  <Text style={styles.settingValue}>{currentChannel?.description}</Text>
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Members</Text>
                  <Text style={styles.settingValue}>{currentChannel?.members} members</Text>
                </View>
                <View style={styles.settingItem}>
                  <Text style={styles.settingLabel}>Type</Text>
                  <Text style={styles.settingValue}>
                    {currentChannel?.type === 'private' ? 'Private Channel' : 'Public Channel'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 8
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  onlineCount: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 4
  },
  channelSelector: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0'
  },
  channelSelectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  channelChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8
  },
  channelChipActive: {
    backgroundColor: '#3498db'
  },
  channelChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 6
  },
  channelChipTextActive: {
    color: 'white'
  },
  channelChipBadge: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6
  },
  channelChipBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600'
  },
  messagesContainer: {
    flex: 1
  },
  messagesContent: {
    padding: 16
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start'
  },
  messageContent: {
    flex: 1,
    marginLeft: 12
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap'
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b'
  },
  userRole: {
    fontSize: 11,
    color: '#64748b',
    marginLeft: 8
  },
  timestamp: {
    fontSize: 11,
    color: '#94a3b8',
    marginLeft: 8
  },
  messageTypeIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8
  },
  messageTypeText: {
    fontSize: 9,
    fontWeight: '700',
    color: 'white'
  },
  messageCard: {
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  urgentMessage: {
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444'
  },
  messageText: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4
  },
  reactionEmoji: {
    fontSize: 12,
    marginRight: 4
  },
  reactionCount: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500'
  },
  repliesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  replyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8
  },
  replyContent: {
    flex: 1,
    marginLeft: 8
  },
  replyUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569'
  },
  replyText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2
  },
  replyTime: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 2
  },
  inputContainer: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
    marginRight: 12
  },
  messageInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingRight: 50,
    fontSize: 14,
    maxHeight: 100,
    minHeight: 44
  },
  inputActions: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row'
  },
  inputAction: {
    padding: 4
  },
  sendButton: {
    alignSelf: 'flex-end'
  },
  emojiPicker: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    padding: 12
  },
  emojiButton: {
    padding: 8,
    marginRight: 4
  },
  emojiText: {
    fontSize: 20
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  buttonPrimary: {
    backgroundColor: '#3498db'
  },
  buttonSecondary: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  buttonMd: {
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  buttonDisabled: {
    opacity: 0.5
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500'
  },
  buttonTextPrimary: {
    color: 'white'
  },
  buttonTextSecondary: {
    color: '#64748b'
  },
  avatar: {
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: 'white',
    fontWeight: '600'
  },
  statusDot: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'white',
    bottom: -2,
    right: -2
  },
  badge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6
  },
  badgeDanger: {
    backgroundColor: '#ef4444'
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600'
  },
  channelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 4
  },
  channelButtonActive: {
    backgroundColor: '#eff6ff'
  },
  channelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  channelName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginLeft: 12
  },
  channelNameActive: {
    color: '#3498db'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingTop: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b'
  },
  modalBody: {
    padding: 20
  },
  userList: {
    maxHeight: 400
  },
  userListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12
  },
  userListInfo: {
    flex: 1,
    marginLeft: 12
  },
  userListName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b'
  },
  userListRole: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2
  },
  userListLocation: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 1
  },
  messageUserButton: {
    padding: 8
  },
  settingItem: {
    marginBottom: 16
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4
  },
  settingValue: {
    fontSize: 14,
    color: '#6b7280'
  }
});

export default GroupChat;