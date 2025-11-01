import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Conversation, Message } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const SubAdminConversationDetailPage = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversation, setConversation] = useState<Conversation | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
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
    if (!replyText.trim() || !conversationId) return;

    setIsSending(true);
    try {
      const updatedConversation = await api.addReplyToConversation(conversationId, {
        author: 'admin',
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
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  if (!conversation) {
    return <div className="text-center text-xl text-gray-400">Conversation not found.</div>;
  }

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
      <div className="mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold text-white">{conversation.subject}</h1>
        <p className="text-sm text-gray-400">
          Conversation with <span className="font-medium text-primary-400">{conversation.customerEmail}</span>
        </p>
      </div>

      <div className="space-y-4 h-96 overflow-y-auto pr-4 mb-4 bg-gray-900 p-4 rounded-lg">
        {conversation.messages.map((message: Message, index: number) => (
          <div key={index} className={`flex items-end gap-2 ${message.author === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-lg ${message.author === 'admin' ? 'bg-primary-700 text-white' : 'bg-gray-600 text-gray-200'}`}>
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 opacity-75 ${message.author === 'admin' ? 'text-right' : 'text-left'}`}>{new Date(message.timestamp).toLocaleString()}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleReplySubmit}>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Type your reply as an admin..."
          className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white"
          rows={4}
          disabled={isSending}
        />
        <div className="mt-4 flex justify-between items-center">
            <Link to="/sub-admin/messages" className="font-medium text-primary-400 hover:text-primary-300 text-sm">
                &larr; Back to all conversations
            </Link>
            <Button type="submit" disabled={isSending || !replyText.trim()}>
                {isSending ? 'Sending...' : 'Send Reply'}
            </Button>
        </div>
      </form>
    </div>
  );
};

export default SubAdminConversationDetailPage;