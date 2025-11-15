import React, { useEffect, useState } from 'react';
import { JobOpening } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';
import Button from '../../components/common/Button';

// Benefit Icons
const HealthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21a9 9 0 01-9-9 9 9 0 019-9m9 9a9 9 0 01-9 9m-9-9h18" /></svg>;
const PtoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const RemoteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const GrowthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;


const CareersPage = () => {
  const [jobOpenings, setJobOpenings] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await api.getJobOpenings();
        setJobOpenings(data);
      } catch (error) {
        console.error("Failed to fetch job openings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="bg-white p-12 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Join Our Team</h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          Be a part of a passionate team that's building the future of e-commerce. We're looking for talented individuals who are ready to make an impact.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="bg-white p-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Perks & Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                  <HealthIcon />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">Health & Wellness</h3>
                  <p className="mt-1 text-gray-600">Comprehensive medical, dental, and vision insurance.</p>
              </div>
              <div className="flex flex-col items-center">
                  <PtoIcon />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">Flexible PTO</h3>
                  <p className="mt-1 text-gray-600">Take the time you need to rest and recharge.</p>
              </div>
               <div className="flex flex-col items-center">
                  <RemoteIcon />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">Remote-First Culture</h3>
                  <p className="mt-1 text-gray-600">Work from anywhere with a flexible and supportive environment.</p>
              </div>
               <div className="flex flex-col items-center">
                  <GrowthIcon />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">Career Growth</h3>
                  <p className="mt-1 text-gray-600">Opportunities for professional development and learning.</p>
              </div>
          </div>
      </div>

      {/* Job Openings Section */}
      <div className="bg-white p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Current Openings</h2>
        {loading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : jobOpenings.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {jobOpenings.map(job => (
              <div key={job.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold text-primary-700">{job.title}</h3>
                    <p className="mt-1 text-gray-600">{job.department} &middot; {job.location}</p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Button>Apply Now</Button>
                  </div>
                </div>
                 <p className="mt-4 text-gray-700">{job.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">There are no open positions at this time. Please check back later!</p>
        )}
      </div>
    </div>
  );
};

export default CareersPage;
