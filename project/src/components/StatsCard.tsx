import React, { memo } from 'react';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const StatsCard: React.FC<StatsCardProps> = memo(({ title, value, icon }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-800 shadow transition-all duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-3 rounded-md bg-blue-500/10 text-blue-500">
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-400 truncate">{title}</dt>
            <dd className="text-2xl font-semibold text-white">{value}</dd>
          </div>
        </div>
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';

export default StatsCard;