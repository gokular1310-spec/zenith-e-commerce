import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Conversation, Message } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const ConversationDetailPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversation, setConversation] = useState<Conversation | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation?.messages]);

  useEffect(() => {
    if (!conversationId) return;
    const fetchConversation = async () => {
      setLoading(true);
      try {
        const data = await api.getConversationById(conversationId);
        setConversation(data);
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversation();
  }, [conversationId]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !conversationId || !user) return;

    setIsSending(true);
    try {
      const updatedConversation = await api.addReplyToConversation(conversationId, {
        author: 'customer',
        text: replyText
      });
      if (updatedConversation) {
        setConversation(updatedConversation);
        setReplyText('');
      }
    } catch (error) {
      console.error("Failed to send reply:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }

  if (!conversation) {
    return <div className="text-center text-xl">Conversation not found.</div>;
  }
  
  if (user?.email !== conversation.customerEmail) {
    return <Navigate to="/my-messages" replace />;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">{conversation.subject}</h1>
        <p className="text-sm text-gray-500">Conversation with Support</p>
      </div>
      
      <div className="space-y-4 h-96 overflow-y-auto pr-4 mb-4 bg-gray-50 p-4 rounded-lg">
        {conversation.messages.map((message: Message, index: number) => (
          <div key={index} className={`flex items-end gap-2 ${message.author === 'customer' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-sm ${message.author === 'customer' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 opacity-75 ${message.author === 'customer' ? 'text-right' : 'text-left'}`}>{new Date(message.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleReplySubmit}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply here..."
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          rows={4}
          disabled={isSending}
        />
        <div className="mt-4 flex justify-between items-center">
            <Link to="/my-messages" className="font-medium text-primary-600 hover:text-primary-500 text-sm">
                &larr; Back to all messages
            </Link>
            <Button type="submit" disabled={isSending || !replyText.trim()}>
                {isSending ? 'Sending...' : 'Send Reply'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ConversationDetailPage;