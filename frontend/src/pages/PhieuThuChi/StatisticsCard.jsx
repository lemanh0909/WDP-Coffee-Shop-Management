import React from 'react';

const StatisticsCard = ({ icon, title, value, valueColor, bgColor, iconColor }) => {
  return (
    <div className={`${bgColor} w-70 h-15 rounded flex items-center`}>
      <div className={`${iconColor} rounded-full w-20 h-20 flex justify-center items-center mr-4`}>
        {icon}
      </div>
      <div>
        <h1 className="text-2xl font-bold mr-2">{title}</h1>
        <h1 className={`text-4xl font-bold ${valueColor}`}>{value}</h1>
      </div>
    </div>
  );
};

export default StatisticsCard;