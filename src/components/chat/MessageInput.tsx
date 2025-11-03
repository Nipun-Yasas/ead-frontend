import React, { useState, useRef } from 'react';
import type { CustomQuestion } from '../../types/chat';

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'TEXT' | 'CUSTOM_QUESTION', customQuestionId?: number) => Promise<void>;
  customQuestions: CustomQuestion[];
  disabled?: boolean;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  customQuestions,
  disabled = false,
  placeholder = "Type your message..."
}) => {
  const [message, setMessage] = useState('');
  const [showQuestions, setShowQuestions] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async (content: string, type: 'TEXT' | 'CUSTOM_QUESTION' = 'TEXT', customQuestionId?: number) => {
    if (isSending || disabled) return;
    
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    setIsSending(true);
    try {
      await onSendMessage(trimmedContent, type, customQuestionId);
      setMessage('');
      setShowQuestions(false);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(message);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  const groupedQuestions = customQuestions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, CustomQuestion[]>);

  const categoryLabels = {
    SERVICE_STATUS: 'Service Status',
    PICKUP_READY: 'Pickup Ready',
    FEEDBACK: 'Feedback',
    GENERAL: 'General'
  };

  return (
    <div className="relative">
      {/* Quick Questions Dropdown */}
      {showQuestions && customQuestions.length > 0 && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-2 rounded-lg border shadow-lg max-h-64 overflow-y-auto z-10"
          style={{ 
            backgroundColor: 'var(--color-bg-secondary)',
            borderColor: 'var(--color-border-primary)'
          }}
        >
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                Quick Responses
              </h3>
              <button
                onClick={() => setShowQuestions(false)}
                className="p-1 rounded hover:opacity-70"
                style={{ color: 'var(--color-text-tertiary)' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {Object.entries(groupedQuestions).map(([category, questions]) => (
              <div key={category} className="mb-4 last:mb-0">
                <h4 
                  className="text-xs font-medium mb-2 uppercase tracking-wide"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {categoryLabels[category as keyof typeof categoryLabels] || category}
                </h4>
                <div className="space-y-1">
                  {questions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleSend(question.question, 'CUSTOM_QUESTION', question.id)}
                      disabled={isSending}
                      className="w-full text-left p-2 text-sm rounded transition-colors hover:opacity-80"
                      style={{ 
                        backgroundColor: 'var(--color-bg-tertiary)',
                        color: 'var(--color-text-primary)'
                      }}
                    >
                      {question.question}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message Input */}
      <div 
        className="flex items-end space-x-3 p-4 border-t"
        style={{ 
          backgroundColor: 'var(--color-bg-secondary)',
          borderColor: 'var(--color-border-primary)'
        }}
      >
        {/* Quick Questions Button */}
        {customQuestions.length > 0 && (
          <button
            onClick={() => setShowQuestions(!showQuestions)}
            disabled={disabled || isSending}
            className="p-2 rounded-lg transition-colors hover:opacity-80 flex-shrink-0"
            style={{ 
              backgroundColor: showQuestions ? 'var(--color-primary)' : 'var(--color-bg-tertiary)',
              color: showQuestions ? 'white' : 'var(--color-text-secondary)'
            }}
            title="Quick responses"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || isSending}
            rows={1}
            className="w-full px-4 py-3 rounded-lg border resize-none focus:outline-none focus:ring-2 transition-all"
            style={{ 
              backgroundColor: 'var(--color-bg-primary)',
              color: 'var(--color-text-primary)',
              borderColor: 'var(--color-border-secondary)'
            }}
          />
          
          {/* Character count for long messages */}
          {message.length > 200 && (
            <div 
              className="absolute -top-6 right-2 text-xs"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {message.length}/1000
            </div>
          )}
        </div>

        {/* Send Button */}
        <button
          onClick={() => handleSend(message)}
          disabled={disabled || isSending || !message.trim()}
          className="p-3 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-shrink-0"
          style={{ 
            backgroundColor: 'var(--color-primary)',
            color: 'white'
          }}
        >
          {isSending ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default MessageInput;