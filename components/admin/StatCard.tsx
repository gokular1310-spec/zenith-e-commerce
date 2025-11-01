import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard = ({ title, value }: StatCardProps) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h4>
      <p className="mt-2 text-3xl font-extrabold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
