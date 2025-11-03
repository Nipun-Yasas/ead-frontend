import React, { useState } from 'react';
import type { Message } from '../../types/chat';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  onEdit?: (messageId: number, newContent: string) => Promise<void>;
  onDelete?: (messageId: number) => Promise<void>;
  isEditing?: boolean;
  isDeleting?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
  onEdit,
  onDelete,
  isEditing = false,
  isDeleting = false
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const [showActions, setShowActions] = useState(false);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEdit = async () => {
    if (!onEdit || editContent.trim() === message.content) {
      setIsEditMode(false);
      return;
    }

    try {
      await onEdit(message.id, editContent.trim());
      setIsEditMode(false);
    } catch (error) {
      console.error('Failed to edit message:', error);
      // Reset content on error
      setEditContent(message.content);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    
    try {
      await onDelete(message.id);
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  if (message.isDeleted) {
    return (
      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
        <div 
          className="max-w-xs lg:max-w-md px-3 py-2 rounded-lg opacity-60"
          style={{ 
            backgroundColor: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-tertiary)'
          }}
        >
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="text-sm italic">Message deleted</span>
          </div>
          <p className="text-xs mt-1">
            {formatTime(message.createdAt)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div 
          className={`px-4 py-2 rounded-lg ${
            isOwnMessage 
              ? 'rounded-br-none' 
              : 'rounded-bl-none'
          } ${isDeleting ? 'opacity-50' : ''}`}
          style={{ 
            backgroundColor: isOwnMessage 
              ? 'var(--color-primary)' 
              : 'var(--color-bg-secondary)',
            color: isOwnMessage 
              ? 'white' 
              : 'var(--color-text-primary)',
            border: isOwnMessage 
              ? 'none' 
              : '1px solid var(--color-border-primary)'
          }}
        >
          {/* Message Type Indicator */}
          {message.type === 'CUSTOM_QUESTION' && (
            <div className="flex items-center space-x-1 mb-2 opacity-75">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs">Quick Response</span>
            </div>
          )}

          {/* Edit Mode */}
          {isEditMode ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 text-sm rounded border resize-none"
                style={{ 
                  backgroundColor: isOwnMessage ? 'rgba(255,255,255,0.1)' : 'var(--color-bg-tertiary)',
                  color: isOwnMessage ? 'white' : 'var(--color-text-primary)',
                  borderColor: 'var(--color-border-primary)'
                }}
                rows={3}
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  disabled={isEditing}
                  className="px-3 py-1 text-xs rounded transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-primary)',
                    color: 'white'
                  }}
                >
                  {isEditing ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setIsEditMode(false);
                    setEditContent(message.content);
                  }}
                  className="px-3 py-1 text-xs rounded transition-colors"
                  style={{ 
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-secondary)'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Message Info */}
        <div className={`flex items-center space-x-2 mt-1 px-1 ${
          isOwnMessage ? 'justify-end' : 'justify-start'
        }`}>
          <span 
            className="text-xs"
            style={{ color: 'var(--color-text-tertiary)' }}
          >
            {formatTime(message.createdAt)}
          </span>
          
          {message.isEdited && (
            <span 
              className="text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              (edited)
            </span>
          )}

          {!isOwnMessage && (
            <span 
              className="text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {message.sender?.fullName}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        {isOwnMessage && showActions && !isEditMode && (
          <div className="flex space-x-1 mt-1 justify-end">
            {/* Edit Button - only if not already edited */}
            {!message.isEdited && onEdit && (
              <button
                onClick={() => setIsEditMode(true)}
                className="p-1 rounded transition-colors hover:opacity-70"
                style={{ 
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-text-secondary)'
                }}
                title="Edit message"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
            )}

            {/* Delete Button */}
            {onDelete && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 rounded transition-colors hover:opacity-70"
                style={{ 
                  backgroundColor: 'var(--color-bg-tertiary)',
                  color: 'var(--color-primary)'
                }}
                title="Delete message"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;