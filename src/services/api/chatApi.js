import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ChatApi {
  constructor() {
    this.baseURL = `${API_BASE_URL}/chat`;
  }

  // Get all conversations for a user
  async getUserConversations(userId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/conversations/${userId}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Conversations fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch conversations'
      };
    }
  }

  // Get conversation by ID
  async getConversationById(conversationId) {
    try {
      const response = await axios.get(`${this.baseURL}/conversations/single/${conversationId}`);
      return {
        success: true,
        data: response.data,
        message: 'Conversation fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch conversation'
      };
    }
  }

  // Create new conversation
  async createConversation(conversationData) {
    try {
      const response = await axios.post(`${this.baseURL}/conversations`, conversationData);
      return {
        success: true,
        data: response.data,
        message: 'Conversation created successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to create conversation'
      };
    }
  }

  // Update conversation
  async updateConversation(conversationId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/conversations/${conversationId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Conversation updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update conversation'
      };
    }
  }

  // Delete conversation
  async deleteConversation(conversationId) {
    try {
      const response = await axios.delete(`${this.baseURL}/conversations/${conversationId}`);
      return {
        success: true,
        data: response.data,
        message: 'Conversation deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to delete conversation'
      };
    }
  }

  // Get messages in a conversation
  async getMessages(conversationId, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/messages/${conversationId}`, { params });
      return {
        success: true,
        data: response.data,
        message: 'Messages fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch messages'
      };
    }
  }

  // Send message
  async sendMessage(messageData) {
    try {
      const response = await axios.post(`${this.baseURL}/messages`, messageData);
      return {
        success: true,
        data: response.data,
        message: 'Message sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to send message'
      };
    }
  }

  // Send message with file attachment
  async sendMessageWithFile(formData) {
    try {
      const response = await axios.post(`${this.baseURL}/messages/with-file`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return {
        success: true,
        data: response.data,
        message: 'Message with file sent successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to send message with file'
      };
    }
  }

  // Update message
  async updateMessage(messageId, updateData) {
    try {
      const response = await axios.put(`${this.baseURL}/messages/single/${messageId}`, updateData);
      return {
        success: true,
        data: response.data,
        message: 'Message updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update message'
      };
    }
  }

  // Delete message
  async deleteMessage(messageId) {
    try {
      const response = await axios.delete(`${this.baseURL}/messages/single/${messageId}`);
      return {
        success: true,
        data: response.data,
        message: 'Message deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to delete message'
      };
    }
  }

  // Mark message as read
  async markMessageAsRead(messageId, userId) {
    try {
      const response = await axios.patch(`${this.baseURL}/messages/${messageId}/read`, { userId });
      return {
        success: true,
        data: response.data,
        message: 'Message marked as read'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to mark message as read'
      };
    }
  }

  // Mark all messages in conversation as read
  async markConversationAsRead(conversationId, userId) {
    try {
      const response = await axios.patch(`${this.baseURL}/conversations/${conversationId}/read`, { userId });
      return {
        success: true,
        data: response.data,
        message: 'Conversation marked as read'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to mark conversation as read'
      };
    }
  }

  // Get unread message count
  async getUnreadCount(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/unread-count/${userId}`);
      return {
        success: true,
        data: response.data,
        message: 'Unread count fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch unread count'
      };
    }
  }

  // Search messages
  async searchMessages(searchTerm, params = {}) {
    try {
      const response = await axios.get(`${this.baseURL}/search`, {
        params: { q: searchTerm, ...params }
      });
      return {
        success: true,
        data: response.data,
        message: 'Message search completed successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to search messages'
      };
    }
  }

  // Get online users
  async getOnlineUsers() {
    try {
      const response = await axios.get(`${this.baseURL}/online-users`);
      return {
        success: true,
        data: response.data,
        message: 'Online users fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch online users'
      };
    }
  }

  // Update user online status
  async updateOnlineStatus(userId, status) {
    try {
      const response = await axios.patch(`${this.baseURL}/online-status/${userId}`, { status });
      return {
        success: true,
        data: response.data,
        message: 'Online status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to update online status'
      };
    }
  }

  // Get user typing status
  async getTypingStatus(conversationId) {
    try {
      const response = await axios.get(`${this.baseURL}/typing/${conversationId}`);
      return {
        success: true,
        data: response.data,
        message: 'Typing status fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch typing status'
      };
    }
  }

  // Set typing status
  async setTypingStatus(conversationId, userId, isTyping) {
    try {
      const response = await axios.post(`${this.baseURL}/typing`, {
        conversationId,
        userId,
        isTyping
      });
      return {
        success: true,
        data: response.data,
        message: 'Typing status set successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to set typing status'
      };
    }
  }

  // Block user
  async blockUser(userId, blockedUserId) {
    try {
      const response = await axios.post(`${this.baseURL}/block`, { userId, blockedUserId });
      return {
        success: true,
        data: response.data,
        message: 'User blocked successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to block user'
      };
    }
  }

  // Unblock user
  async unblockUser(userId, blockedUserId) {
    try {
      const response = await axios.post(`${this.baseURL}/unblock`, { userId, blockedUserId });
      return {
        success: true,
        data: response.data,
        message: 'User unblocked successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to unblock user'
      };
    }
  }

  // Get blocked users
  async getBlockedUsers(userId) {
    try {
      const response = await axios.get(`${this.baseURL}/blocked/${userId}`);
      return {
        success: true,
        data: response.data,
        message: 'Blocked users fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error.response?.data?.message || 'Failed to fetch blocked users'
      };
    }
  }
}

export default new ChatApi();