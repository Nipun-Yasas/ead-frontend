import React from 'react';
import type { Chat } from '../../types/chat';
import { useAuth } from '../../contexts/AuthContext';

interface ChatListProps {
  chats: Chat[];
  selectedChatId: number | null;
  onSelectChat: (chat: Chat) => void;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  isLoading,
  error,
  onRetry
}) => {
  const { user } = useAuth();

  // ✅ Helper function to get the OTHER person's info
  const getOtherPerson = (chat: Chat) => {
    const isCustomer = user?.id === chat.customerId;
    return {
      name: isCustomer ? chat.employeeName : chat.customerName,
      email: isCustomer ? chat.employeeEmail : chat.customerEmail,
      id: isCustomer ? chat.employeeId : chat.customerId,
    };
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const formatLastMessage = (content: string | null) => {
    if (!content) return 'No messages yet';
    return content.length > 40 ? `${content.substring(0, 40)}...` : content;
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="p-3 rounded-lg animate-pulse"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-full"
                style={{ backgroundColor: 'var(--color-hover-bg)' }}
              />
              <div className="flex-1">
                <div 
                  className="h-4 rounded mb-2"
                  style={{ backgroundColor: 'var(--color-hover-bg)', width: '60%' }}
                />
                <div 
                  className="h-3 rounded"
                  style={{ backgroundColor: 'var(--color-hover-bg)', width: '80%' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-xs px-3 py-1 rounded transition-colors hover:opacity-80"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          No conversations yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {chats.map((chat) => {
        const otherPerson = getOtherPerson(chat); // ✅ Get the other person's info

        return (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-3 rounded-lg cursor-pointer transition-all hover:opacity-80 ${
              selectedChatId === chat.id ? 'ring-2 ring-opacity-50' : ''
            }`}
            style={{
              backgroundColor: selectedChatId === chat.id 
                ? 'var(--color-hover-bg)' 
                : 'var(--color-bg-tertiary)',
              '--tw-ring-color': selectedChatId === chat.id ? 'var(--color-primary)' : 'transparent'
            } as React.CSSProperties}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar - Show OTHER person's initial */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--color-primary)',
                  color: 'white'
                }}
              >
                {otherPerson.name.charAt(0).toUpperCase()}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 
                    className="text-sm font-medium truncate"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {otherPerson.name}
                  </h3>
                  <span 
                    className="text-xs"
                    style={{ color: 'var(--color-text-tertiary)' }}
                  >
                    {formatTime(chat.lastMessageAt)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-1">
                  <p 
                    className="text-xs truncate"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {formatLastMessage(chat.lastMessageContent)}
                  </p>
                  
                  {/* Unread count */}
                  {chat.unreadCount > 0 && (
                    <span 
                      className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full"
                      style={{ 
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        minWidth: '20px',
                        height: '20px'
                      }}
                    >
                      {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;