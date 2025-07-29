import React from 'react';
import { CheckCircle2, XCircle, Server } from 'lucide-react';
import { Asset } from '../types';

type AssetCardProps = {
  asset: Asset;
  onClick?: () => void;
};

const AssetCard: React.FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <div 
      className="overflow-hidden rounded-lg bg-gray-800 shadow hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-2 rounded-md bg-blue-500/10 text-blue-500">
              <Server className="h-5 w-5" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-white">{asset.name}</h3>
              <p className="text-sm text-gray-400">{asset.ipAddress}</p>
            </div>
          </div>
          <div className="flex items-center">
            {asset.isActive ? (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Type</p>
            <p className="text-white">{asset.type}</p>
          </div>
          <div>
            <p className="text-gray-400">OS</p>
            <p className="text-white">{asset.os}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Vulnerabilities</span>
            <span className="font-medium text-white">{asset.vulnerabilitiesCount}</span>
          </div>
          <div className="mt-1 overflow-hidden rounded-full bg-gray-700">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" 
              style={{ width: `${Math.min(100, asset.vulnerabilitiesCount * 2)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;