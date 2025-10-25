// screens/chat/ChatScreen.js - Updated with Attachments
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, addAttachment } from '../../store/slices/chatSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const ChatScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const flatListRef = useRef(null);
  const currentUser = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.chat.messages);
  const [messageText, setMessageText] = useState('');
  const [selectedAttachments, setSelectedAttachments] = useState([]);

  useEffect(() => {
    // Request permissions
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Please allow access to your photos');
        }
      }
    })();
  }, []);

  const handleSend = () => {
    if (!messageText.trim() && selectedAttachments.length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: messageText.trim(),
      senderId: currentUser?.id || 'user1',
      senderName: currentUser?.name || 'You',
      timestamp: new Date().toISOString(),
      attachments: selectedAttachments,
      read: false,
    };

    dispatch(sendMessage(newMessage));
    setMessageText('');
    setSelectedAttachments([]);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const attachment = {
          id: Date.now().toString(),
          type: 'image',
          uri: result.assets[0].uri,
          name: `Image_${Date.now()}.jpg`,
          size: result.assets[0].fileSize || 0,
        };
        setSelectedAttachments([...selectedAttachments, attachment]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to your camera');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const attachment = {
          id: Date.now().toString(),
          type: 'image',
          uri: result.assets[0].uri,
          name: `Photo_${Date.now()}.jpg`,
          size: result.assets[0].fileSize || 0,
        };
        setSelectedAttachments([...selectedAttachments, attachment]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        const attachment = {
          id: Date.now().toString(),
          type: 'document',
          uri: result.uri,
          name: result.name,
          size: result.size,
        };
        setSelectedAttachments([...selectedAttachments, attachment]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const showAttachmentOptions = () => {
    Alert.alert('Add Attachment', 'Choose an option', [
      { text: 'Take Photo', onPress: takePhoto },
      { text: 'Choose from Gallery', onPress: pickImage },
      { text: 'Choose Document', onPress: pickDocument },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removeAttachment = (attachmentId) => {
    setSelectedAttachments(
      selectedAttachments.filter((a) => a.id !== attachmentId)
    );
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const renderAttachment = (attachment) => {
    if (attachment.type === 'image') {
      return (
        <Image source={{ uri: attachment.uri }} style={styles.attachmentImage} />
      );
    }

    return (
      <View style={styles.documentAttachment}>
        <Icon name="file-document" size={24} color="#2563EB" />
        <View style={styles.documentInfo}>
          <Text style={styles.documentName} numberOfLines={1}>
            {attachment.name}
          </Text>
          <Text style={styles.documentSize}>{formatFileSize(attachment.size)}</Text>
        </View>
      </View>
    );
  };

  const renderMessage = ({ item: message }) => {
    const isMyMessage = message.senderId === (currentUser?.id || 'user1');

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
      >
        {!isMyMessage && (
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{message.senderName}</Text>
          </View>
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <View style={styles.attachmentsContainer}>
            {message.attachments.map((attachment) => (
              <View key={attachment.id} style={styles.attachmentWrapper}>
                {renderAttachment(attachment)}
              </View>
            ))}
          </View>
        )}

        {/* Message Text */}
        {message.text && (
          <View
            style={[
              styles.messageBubble,
              isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                isMyMessage ? styles.myMessageText : styles.otherMessageText,
              ]}
            >
              {message.text}
            </Text>
          </View>
        )}

        <Text style={styles.timestamp}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />

      {/* Selected Attachments Preview */}
      {selectedAttachments.length > 0 && (
        <View style={styles.attachmentPreview}>
          {selectedAttachments.map((attachment) => (
            <View key={attachment.id} style={styles.previewItem}>
              {attachment.type === 'image' ? (
                <Image
                  source={{ uri: attachment.uri }}
                  style={styles.previewImage}
                />
              ) : (
                <View style={styles.previewDocument}>
                  <Icon name="file-document" size={20} color="#2563EB" />
                </View>
              )}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeAttachment(attachment.id)}
              >
                <Icon name="close-circle" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.attachButton}
          onPress={showAttachmentOptions}
        >
          <Icon name="paperclip" size={24} color="#6B7280" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={messageText}
          onChangeText={setMessageText}
          multiline
          maxLength={1000}
        />

        <TouchableOpacity
          style={[
            styles.sendButton,
            (!messageText.trim() && selectedAttachments.length === 0) &&
              styles.sendButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!messageText.trim() && selectedAttachments.length === 0}
        >
          <Icon name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  messagesList: {
    padding: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  senderInfo: {
    marginBottom: 4,
  },
  senderName: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
  },
  myMessageBubble: {
    backgroundColor: '#2563EB',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  messageText: {
    fontSize: 15,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  otherMessageText: {
    color: '#111827',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  attachmentsContainer: {
    marginBottom: 8,
  },
  attachmentWrapper: {
    marginBottom: 8,
  },
  attachmentImage: {
    width: 200,
    height: 150,
    borderRadius: 8,
  },
  documentAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    gap: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  documentSize: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  attachmentPreview: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  previewItem: {
    position: 'relative',
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  previewDocument: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 8,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sendButton: {
    backgroundColor: '#2563EB',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

export default ChatScreen;