import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const EmployeeDashboardContent: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    chats,
    selectedChat,
    messages,
    customQuestions,
    isLoading,
    // isSendingMessage,
    // isLoadingMoreMessages,
    error,
    selectChat,
    sendMessage,
    editMessage,
    deleteMessage,
    // loadMoreMessages,
    retry
  } = useChat();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Header */}
      <header className="border-b" style={{ 
        backgroundColor: 'var(--color-bg-header)', 
        borderColor: 'var(--color-border-primary)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)' }}>
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                AutoCare Pro - Employee Portal
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {user?.fullName}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {user?.role}
                </p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ 
                  backgroundColor: 'var(--color-bg-secondary)',
                  color: 'var(--color-text-primary)',
                  border: '1px solid var(--color-border-secondary)'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Chat List - Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border h-full flex flex-col" style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)'
            }}>
              <div className="p-6 border-b" style={{ borderColor: 'var(--color-border-primary)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Customer Chats
                  </h2>
                  {chats.length > 0 && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium" style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'white'
                    }}>
                      {chats.length}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <ChatList
                  chats={chats}
                  selectedChatId={selectedChat?.id || null}
                  onSelectChat={selectChat}
                  isLoading={isLoading}
                  error={error}
                  onRetry={retry}
                />
              </div>
            </div>
          </div>

          {/* Chat Window - Main Area */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border h-full" style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)'
            }}>
              <ChatWindow
                selectedChat={selectedChat}
                messages={messages}
                customQuestions={customQuestions}
                isLoadingMessages={isLoading}
                isLoadingQuestions={false}
                error={error}
                onSendMessage={sendMessage}
                onEditMessage={editMessage}
                onDeleteMessage={deleteMessage}
                onRetry={retry}
              />
            </div>
          </div>

          {/* Customer Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Customer Details */}
            <div className="rounded-xl border p-6" style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)'
            }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Customer Details
              </h3>
              {selectedChat ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'white'
                      }}
                    >
                      {selectedChat.customerName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {selectedChat.customerName}
                      </h4>
                      <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        {selectedChat.customerEmail}
                      </p>
                    </div>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor: 'var(--color-border-secondary)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                      Chat started: {new Date(selectedChat.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Select a chat to view customer info
                  </p>
                </div>
              )}
            </div>

            {/* Today's Stats */}
            <div className="rounded-xl border p-6" style={{ 
              backgroundColor: 'var(--color-bg-secondary)',
              borderColor: 'var(--color-border-primary)'
            }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Today's Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Active Chats</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {chats.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Unread Messages</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {chats.reduce((total, chat) => total + chat.unreadCount, 0)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Status</span>
                  <span className="text-sm font-medium flex items-center" style={{ color: 'var(--color-primary)' }}>
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: 'var(--color-primary)' }}></div>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const EmployeeDashboard: React.FC = () => {
  return (
    <ChatProvider>
      <EmployeeDashboardContent />
    </ChatProvider>
  );
};

export default EmployeeDashboard;