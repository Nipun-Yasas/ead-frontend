import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const EmployeeChatInterface: React.FC = () => {
  // ✅ Removed unused 'user' variable
  const chatContext = useChat();

  return (
    <div 
      className="h-full flex"
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
        <div 
          className="p-4 border-b"
          style={{ borderColor: 'var(--color-border-primary)' }}
        >
          <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Customer Chats
          </h2>
          {chatContext.chats.length > 0 && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mt-2" style={{
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}>
              {chatContext.chats.length}
            </div>
          )}
        </div>

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

      {/* Optional: Customer Info Sidebar */}
      {chatContext.selectedChat && (
        <div 
          className="w-64 border-l p-4"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)'
          }}
        >
          <h3 className="font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
            Customer Details
          </h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Name</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {chatContext.selectedChat.customerName}
              </p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>Email</p>
              <p className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                {chatContext.selectedChat.customerEmail}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeChatInterface;