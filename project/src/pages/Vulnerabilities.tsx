import React, { useState } from 'react';
import { Shield, AlertCircle, Filter } from 'lucide-react';
import SearchFilter from '../components/SearchFilter';
import VulnerabilityCard from '../components/VulnerabilityCard';
import { mockVulnerabilities } from '../data/mockData';
import { Vulnerability } from '../types';

const Vulnerabilities: React.FC = () => {
  const [filteredVulnerabilities, setFilteredVulnerabilities] = useState(mockVulnerabilities);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<{
    severity: string | null;
    status: string | null;
  }>({
    severity: null,
    status: null,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, activeFilters.severity, activeFilters.status);
  };

  const handleSeverityFilter = (severity: string) => {
    const newFilters = { ...activeFilters, severity };
    setActiveFilters(newFilters);
    applyFilters(searchQuery, severity, activeFilters.status);
  };

  const handleStatusFilter = (status: string) => {
    const newFilters = { ...activeFilters, status };
    setActiveFilters(newFilters);
    applyFilters(searchQuery, activeFilters.severity, status);
  };

  const applyFilters = (query: string, severity: string | null, status: string | null) => {
    let result = [...mockVulnerabilities];

    if (query) {
      const lowerQuery = query.toLowerCase();
      result = result.filter(
        (vuln) =>
          vuln.title.toLowerCase().includes(lowerQuery) ||
          vuln.description.toLowerCase().includes(lowerQuery)
      );
    }

    if (severity && severity !== 'all') {
      result = result.filter((vuln) => vuln.severity.toLowerCase() === severity.toLowerCase());
    }

    if (status && status !== 'all') {
      result = result.filter((vuln) => vuln.status.toLowerCase() === status.toLowerCase());
    }

    setFilteredVulnerabilities(result);
  };

  const severityFilters = [
    { label: 'Severity: All', value: 'all' },
    { label: 'Severity: Critical', value: 'critical' },
    { label: 'Severity: High', value: 'high' },
    { label: 'Severity: Medium', value: 'medium' },
    { label: 'Severity: Low', value: 'low' },
    { label: 'Severity: Info', value: 'info' },
  ];

  const statusFilters = [
    { label: 'Status: All', value: 'all' },
    { label: 'Status: Open', value: 'open' },
    { label: 'Status: In Progress', value: 'in progress' },
    { label: 'Status: Resolved', value: 'resolved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Vulnerabilities</h1>
        <button
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
        >
          New Vulnerability
        </button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-red-600/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Critical</p>
            <p className="text-xl font-semibold text-white">
              {mockVulnerabilities.filter(v => v.severity === 'Critical').length}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-orange-500/10 p-2 rounded-full">
            <AlertCircle className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">High</p>
            <p className="text-xl font-semibold text-white">
              {mockVulnerabilities.filter(v => v.severity === 'High').length}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-yellow-500/10 p-2 rounded-full">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Medium</p>
            <p className="text-xl font-semibold text-white">
              {mockVulnerabilities.filter(v => v.severity === 'Medium').length}
            </p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="bg-blue-500/10 p-2 rounded-full">
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Low</p>
            <p className="text-xl font-semibold text-white">
              {mockVulnerabilities.filter(v => v.severity === 'Low').length}
            </p>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <SearchFilter 
          placeholder="Search vulnerabilities..." 
          onSearch={handleSearch}
          filters={[
            { options: severityFilters, onFilter: handleSeverityFilter },
            { options: statusFilters, onFilter: handleStatusFilter },
          ]}
        />
        
        {/* Active filters */}
        {(activeFilters.severity || activeFilters.status) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {activeFilters.severity && activeFilters.severity !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                Severity: {activeFilters.severity}
                <button 
                  className="ml-1.5 text-blue-400 hover:text-white"
                  onClick={() => handleSeverityFilter('all')}
                >
                  ×
                </button>
              </div>
            )}
            {activeFilters.status && activeFilters.status !== 'all' && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                Status: {activeFilters.status}
                <button 
                  className="ml-1.5 text-blue-400 hover:text-white"
                  onClick={() => handleStatusFilter('all')}
                >
                  ×
                </button>
              </div>
            )}
            {(activeFilters.severity || activeFilters.status) && (
              <button 
                className="text-xs text-blue-500 hover:text-blue-400"
                onClick={() => {
                  setActiveFilters({ severity: null, status: null });
                  applyFilters(searchQuery, null, null);
                }}
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Vulnerabilities list */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVulnerabilities.length > 0 ? (
          filteredVulnerabilities.map((vulnerability) => (
            <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
          ))
        ) : (
          <div className="sm:col-span-2 lg:col-span-3 text-center py-12">
            <p className="text-gray-400">No vulnerabilities found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vulnerabilities;