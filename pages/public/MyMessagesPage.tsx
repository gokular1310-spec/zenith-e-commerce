import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Conversation } from '../../types';
import { api } from '../../services/mockApiService';
import { useAuth } from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const MyMessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchConversations = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const data = await api.getConversationsByCustomerEmail(user.email);
        setConversations(data.sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime()));
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-96"><Spinner /></div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (conversations.length === 0) {
    return (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">No Messages Found</h1>
            <p className="text-gray-600 mb-6">You haven't started any conversations with us yet.</p>
            <Link to="/contact"><Button>Contact Us</Button></Link>
        </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Messages</h1>
      <div className="space-y-4">
        {conversations.map(convo => (
          <Link key={convo.id} to={`/my-messages/${convo.id}`} className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{convo.subject}</p>
                <p className="text-sm text-gray-500">Last updated: {new Date(convo.lastUpdatedAt).toLocaleString()}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${convo.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {convo.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyMessagesPage;