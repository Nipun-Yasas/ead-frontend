import React, { useState, useEffect, useRef } from 'react';
import type { Chat, Message, CustomQuestion } from '../../types/chat';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import { MessageSkeleton, ChatHeaderSkeleton } from '../ui/LoadingComponents';
import { useAuth } from '../../contexts/AuthContext';

interface ChatWindowProps {
  selectedChat: Chat | null;
  messages: Message[];
  customQuestions: CustomQuestion[];
  isLoadingMessages: boolean;
  isLoadingQuestions: boolean;
  error: string | null;
  onSendMessage: (content: string, type?: 'TEXT' | 'CUSTOM_QUESTION', customQuestionId?: number) => Promise<void>;
  onEditMessage: (messageId: number, newContent: string) => Promise<void>;
  onDeleteMessage: (messageId: number) => Promise<void>;
  onRetry?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  messages,
  customQuestions,
  isLoadingMessages,
  isLoadingQuestions,
  error,
  onSendMessage,
  onEditMessage,
  onDeleteMessage,
  onRetry
}) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [deletingMessageId, setDeletingMessageId] = useState<number | null>(null);

  // ✅ Helper function to get the OTHER person's info
  const getOtherPerson = (chat: Chat) => {
    const isCustomer = user?.id === chat.customerId;
    return {
      name: isCustomer ? chat.employeeName : chat.customerName,
      email: isCustomer ? chat.employeeEmail : chat.customerEmail,
      id: isCustomer ? chat.employeeId : chat.customerId,
    };
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditMessage = async (messageId: number, newContent: string) => {
    setEditingMessageId(messageId);
    try {
      await onEditMessage(messageId, newContent);
    } finally {
      setEditingMessageId(null);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    setDeletingMessageId(messageId);
    try {
      await onDeleteMessage(messageId);
    } finally {
      setDeletingMessageId(null);
    }
  };

  // No chat selected
  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg 
              className="w-8 h-8" 
              style={{ color: 'var(--color-text-tertiary)' }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </div>
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Select a conversation
          </h3>
          <p 
            className="text-sm"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Choose a chat from the list to start messaging
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
          >
            <svg 
              className="w-8 h-8" 
              style={{ color: 'var(--color-primary)' }} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h3 
            className="text-lg font-medium mb-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Something went wrong
          </h3>
          <p 
            className="text-sm mb-4"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:opacity-90"
              style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'white'
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }


const otherPerson = getOtherPerson(selectedChat); // ✅ Get the other person's info

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      {isLoadingMessages ? (
        <ChatHeaderSkeleton />
      ) : (
        <div 
          className="p-4 border-b flex items-center space-x-3"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)'
          }}
        >
          {/* Other Person Avatar */}
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'white'
            }}
          >
            {otherPerson.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Other Person Info */}
          <div className="flex-1">
            <h2 
              className="text-lg font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {otherPerson.name}
            </h2>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {otherPerson.email}
            </p>
          </div>

          {/* Chat Actions */}
          <div className="flex space-x-2">
            <button 
              className="p-2 rounded-lg transition-colors hover:opacity-80"
              style={{ 
                backgroundColor: 'var(--color-bg-tertiary)',
                color: 'var(--color-text-secondary)'
              }}
              title="Chat settings"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoadingMessages ? (
          <MessageSkeleton />
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <div 
              className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-bg-tertiary)' }}
            >
              <svg 
                className="w-6 h-6" 
                style={{ color: 'var(--color-text-tertiary)' }} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                />
              </svg>
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isOwnMessage={message.senderId === user?.id}
              onEdit={handleEditMessage}
              onDelete={handleDeleteMessage}
              isEditing={editingMessageId === message.id}
              isDeleting={deletingMessageId === message.id}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInput
        onSendMessage={onSendMessage}
        customQuestions={customQuestions}
        disabled={isLoadingMessages || isLoadingQuestions}
        placeholder={
          isLoadingQuestions 
            ? "Loading quick responses..." 
            : `Message ${otherPerson.name}...`
        }
      />
    </div>
  );
};

export default ChatWindow;