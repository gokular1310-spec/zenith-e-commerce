import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  const iconColorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    indigo: 'bg-indigo-100 text-indigo-600',
  }[color] || 'bg-gray-100 text-gray-600';

  return (
    <div className="bg-white p-5 rounded-lg shadow-md flex items-center">
        <div className={`rounded-full p-3 mr-4 ${iconColorClasses}`}>
            {icon}
        </div>
        <div>
            <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h4>
            <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
  );
};

export default StatCard;