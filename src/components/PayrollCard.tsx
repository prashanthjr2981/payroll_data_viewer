import React from 'react';

interface PayrollCardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PayrollCard: React.FC<PayrollCardProps> = ({ title, children, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center gap-3">
        {icon && <div className="text-white">{icon}</div>}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

interface DataRowProps {
  label: string;
  value: string | number;
  highlight?: boolean;
}

export const DataRow: React.FC<DataRowProps> = ({ label, value, highlight = false }) => {
  return (
    <div className={`flex justify-between py-3 border-b border-gray-100 last:border-b-0 ${
      highlight ? 'bg-blue-50 -mx-6 px-6' : ''
    }`}>
      <span className={`font-medium ${highlight ? 'text-blue-900' : 'text-gray-700'}`}>
        {label}
      </span>
      <span className={`${highlight ? 'text-blue-900 font-bold text-lg' : 'text-gray-900 font-semibold'}`}>
        {value}
      </span>
    </div>
  );
};
