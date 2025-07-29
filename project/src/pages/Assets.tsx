import React, { useState } from 'react';
import { Server, Search, Database, List, Grid3X3 } from 'lucide-react';
import AssetCard from '../components/AssetCard';
import SearchFilter from '../components/SearchFilter';
import { mockAssets } from '../data/mockData';
import { Asset } from '../types';

const Assets: React.FC = () => {
  const [filteredAssets, setFilteredAssets] = useState(mockAssets);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query);
  };

  const applyFilters = (query: string) => {
    if (!query) {
      setFilteredAssets(mockAssets);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const result = mockAssets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(lowerQuery) ||
        asset.ipAddress.toLowerCase().includes(lowerQuery) ||
        asset.type.toLowerCase().includes(lowerQuery) ||
        asset.os.toLowerCase().includes(lowerQuery)
    );

    setFilteredAssets(result);
  };

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Assets</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
          Add Asset
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-blue-500/10 p-2 rounded-full">
            <Server className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Assets</p>
            <p className="text-xl font-semibold text-white">{mockAssets.length}</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-green-500/10 p-2 rounded-full">
            <Server className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Active</p>
            <p className="text-xl font-semibold text-white">
              {mockAssets.filter(a => a.isActive).length}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-red-500/10 p-2 rounded-full">
            <Database className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">With Vulnerabilities</p>
            <p className="text-xl font-semibold text-white">
              {mockAssets.filter(a => a.vulnerabilitiesCount > 0).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-800 rounded-lg p-4 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2">
          <SearchFilter 
            placeholder="Search assets by name, IP, or type..." 
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">View:</span>
          <button
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
            onClick={() => setViewMode('list')}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Assets list */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} onClick={() => handleAssetClick(asset)} />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-3 text-center py-12">
              <p className="text-gray-400">No assets found matching your criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  IP Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  OS
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Vulns
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    className="hover:bg-gray-700 cursor-pointer transition-colors"
                    onClick={() => handleAssetClick(asset)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                          <Server className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-white">{asset.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {asset.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {asset.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {asset.os}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${asset.isActive ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {asset.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {asset.vulnerabilitiesCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                    No assets found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Asset detail modal would go here */}
    </div>
  );
};

export default Assets;