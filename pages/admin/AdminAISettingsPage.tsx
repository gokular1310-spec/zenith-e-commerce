import React, { useEffect, useState, useCallback } from 'react';
import { AITopic } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const AdminAISettingsPage = () => {
  const [topics, setTopics] = useState<AITopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopic, setNewTopic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAITopics();
      setTopics(data);
    } catch (error) {
      console.error("Failed to fetch AI topics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);
  
  const handleToggleEnabled = async (topic: AITopic) => {
    try {
      const updatedTopic = await api.updateAITopic(topic.id, { enabled: !topic.enabled });
      if (updatedTopic) {
        setTopics(currentTopics =>
          currentTopics.map(t => (t.id === updatedTopic.id ? updatedTopic : t))
        );
      }
    } catch (error) {
      console.error("Failed to toggle topic status:", error);
      alert("Failed to update topic status.");
    }
  };
  
  const handleDelete = async (topicId: string) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
        try {
            const success = await api.deleteAITopic(topicId);
            if(success) {
                setTopics(currentTopics => currentTopics.filter(t => t.id !== topicId));
            }
        } catch (error) {
            console.error("Failed to delete topic:", error);
            alert("Failed to delete topic.");
        }
    }
  };
  
  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    setIsSubmitting(true);
    try {
        const addedTopic = await api.addAITopic(newTopic.trim());
        setTopics(currentTopics => [...currentTopics, addedTopic]);
        setNewTopic('');
    } catch (error) {
        console.error("Failed to add new topic:", error);
        alert("Failed to add topic.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner /></div>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-gray-700 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Assistant Settings</h2>
        <p className="text-gray-500">Manage the topics and questions your AI support assistant is allowed to answer. Enabled topics will be used by the AI to determine if it can respond to a customer's query.</p>
      </div>

      {/* Add New Topic Form */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <form onSubmit={handleAddTopic} className="flex items-center gap-4">
            <input 
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter a new topic (e.g., Warranty Information)"
                className="flex-grow bg-white border border-gray-300 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-gray-900"
            />
            <Button type="submit" disabled={isSubmitting || !newTopic.trim()}>
                {isSubmitting ? "Adding..." : "Add Topic"}
            </Button>
        </form>
      </div>

      {/* Topics List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Topic</th>
              <th scope="col" className="px-6 py-3 text-center">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(topic => (
              <tr key={topic.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{topic.topic}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${topic.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {topic.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center justify-end space-x-2">
                  <Button variant="secondary" className={`!px-3 !py-1 ${topic.enabled ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`} onClick={() => handleToggleEnabled(topic)}>
                    {topic.enabled ? 'Disable' : 'Enable'}
                  </Button>
                  <Button variant="secondary" className="!px-3 !py-1 bg-red-100 text-red-700 hover:bg-red-200" onClick={() => handleDelete(topic.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAISettingsPage;