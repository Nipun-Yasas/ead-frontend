import React, { useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useAuth } from '../../contexts/AuthContext';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const chatContext = useChat();

  useEffect(() => {
    if (user) {
      try {
        chatContext.loadConversations();
        chatContext.loadCustomQuestions();
      } catch (error) {
        console.error('Error loading chat data:', error);
      }
    }
  }, [user, chatContext.loadConversations, chatContext.loadCustomQuestions]);

  // Loading state
  if (!user) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Authentication Required
          </h2>
          <p>Please log in to access the chat system.</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="h-screen flex"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      {/* Chat List Sidebar */}
      <div 
        className="w-80 border-r flex flex-col"
        style={{ 
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-primary)'
        }}
      >
        {/* Header */}
        <div 
          className="p-4 border-b"
          style={{ borderColor: 'var(--color-border-primary)' }}
        >
          <h1 className="text-xl font-bold">
            Messages
          </h1>
          <p className="text-sm mt-1">
            {user.fullName}
          </p>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-3">
          <ChatList
            chats={chatContext.chats}
            selectedChatId={chatContext.selectedChat?.id || null}
            onSelectChat={chatContext.selectChat}
            isLoading={chatContext.isLoading}
            error={chatContext.error}
            onRetry={chatContext.retry}
          />
        </div>

        {/* WebSocket Status */}
        <div 
          className="p-3 border-t text-xs flex items-center justify-between"
          style={{ 
            backgroundColor: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border-primary)'
          }}
        >
          <span>Status:</span>
          <span className="flex items-center">
            <span 
              className={`w-2 h-2 rounded-full mr-2 ${
                chatContext.isConnected ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            {chatContext.isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        <ChatWindow
          selectedChat={chatContext.selectedChat}
          messages={chatContext.messages}
          customQuestions={chatContext.customQuestions}
          isLoadingMessages={chatContext.isLoading}
          isLoadingQuestions={chatContext.isLoading}
          error={chatContext.error}
          onSendMessage={chatContext.sendMessage}
          onEditMessage={chatContext.editMessage}
          onDeleteMessage={chatContext.deleteMessage}
          onRetry={chatContext.retry}
        />
      </div>
    </div>
  );
};

export default ChatInterface;