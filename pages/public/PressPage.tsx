import React, { useEffect, useState } from 'react';
import { PressRelease } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

const PressPage = () => {
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPressReleases = async () => {
      setLoading(true);
      try {
        const data = await api.getPressReleases();
        setPressReleases(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      } catch (error) {
        console.error("Failed to fetch press releases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPressReleases();
  }, []);

  return (
    <div className="bg-white p-8 sm:p-12 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Press & Media</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Welcome to the Zenith press room. Here you'll find the latest news, press releases, and resources for media inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content: Press Releases */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">Recent News</h2>
          {loading ? (
            <div className="flex justify-center py-12"><Spinner /></div>
          ) : pressReleases.length > 0 ? (
            <div className="space-y-8">
              {pressReleases.map(release => (
                <div key={release.id}>
                  <p className="text-sm text-gray-500">{new Date(release.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <h3 className="mt-2 text-xl font-bold text-primary-700 hover:text-primary-800">
                    <a href="#">{release.title}</a>
                  </h3>
                  <p className="mt-2 text-base text-gray-600">{release.excerpt}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No recent press releases found.</p>
          )}
        </div>

        {/* Sidebar: Media Contact & Kit */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Inquiries</h3>
            <p className="text-gray-600 mb-1">For all media and press-related questions, please contact:</p>
            <a href="mailto:press@zenith.com" className="font-semibold text-primary-600 hover:underline">
              press@zenith.com
            </a>
          </div>
          <div className="mt-8 bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Media Kit</h3>
            <p className="text-gray-600 mb-4">Download our media kit for logos, brand guidelines, and official images.</p>
            <Button className="w-full">Download Media Kit (.zip)</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
