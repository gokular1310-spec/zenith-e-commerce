import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Conversation } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';

const AdminMessagesPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const data = await api.getConversations();
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
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-100 mb-6">Customer Conversations</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-400 text-center py-8">There are no customer conversations.</p>
      ) : (
        <div className="space-y-4">
          {conversations.map(convo => (
            <Link key={convo.id} to={`/admin/messages/${convo.id}`} className="block bg-gray-700 rounded-lg p-4 shadow-md hover:bg-gray-600 transition-colors duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-white">{convo.subject}</p>
                  <p className="text-sm text-primary-400">{convo.customerEmail}</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${convo.status === 'open' ? 'bg-green-500 text-green-900' : 'bg-gray-500 text-gray-900'}`}>
                    {convo.status}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{new Date(convo.lastUpdatedAt).toLocaleString()}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessagesPage;