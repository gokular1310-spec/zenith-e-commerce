import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Conversation } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import { useAuth } from '../../hooks/useAuth';

const SubAdminMessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchConversations = async () => {
      try {
        const data = await api.getConversations(user.id);
        const sortedData = data.sort((a, b) => {
            if (a.status === 'open' && b.status !== 'open') return -1;
            if (a.status !== 'open' && b.status === 'open') return 1;
            return new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime();
        });
        setConversations(sortedData);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [user]);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Conversations</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No conversations found related to your products.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map(convo => (
            <Link key={convo.id} to={`/sub-admin/messages/${convo.id}`} className="block bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-800">{convo.subject}</p>
                  <p className="text-sm text-primary-600">{convo.customerEmail}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${convo.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {convo.status}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{new Date(convo.lastUpdatedAt).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubAdminMessagesPage;