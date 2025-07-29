import React, { useState } from 'react';
import { FileText, Download, Calendar, Clock, User, Filter, PieChart } from 'lucide-react';
import SearchFilter from '../components/SearchFilter';
import Chart from '../components/Chart';

const Reports: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const reports = [
    {
      id: '1',
      name: 'Monthly Vulnerability Summary',
      description: 'Overview of vulnerabilities discovered in the last month',
      createdAt: '2025-04-01',
      createdBy: 'John Smith',
      type: 'summary',
    },
    {
      id: '2',
      name: 'Critical Vulnerabilities Report',
      description: 'Detailed analysis of all critical and high severity vulnerabilities',
      createdAt: '2025-03-28',
      createdBy: 'Alice Johnson',
      type: 'detailed',
    },
    {
      id: '3',
      name: 'Web Application Security Assessment',
      description: 'Results from the quarterly web application penetration test',
      createdAt: '2025-03-15',
      createdBy: 'John Smith',
      type: 'assessment',
    },
    {
      id: '4',
      name: 'Cloud Infrastructure Audit',
      description: 'Security audit of AWS cloud infrastructure',
      createdAt: '2025-03-10',
      createdBy: 'Bob Wilson',
      type: 'audit',
    },
    {
      id: '5',
      name: 'Compliance Status Report',
      description: 'Overview of compliance status against industry standards',
      createdAt: '2025-03-05',
      createdBy: 'Alice Johnson',
      type: 'compliance',
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleReportClick = (id: string) => {
    setSelectedReport(id);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Example data for report preview
  const severityData = {
    labels: ['Critical', 'High', 'Medium', 'Low', 'Info'],
    datasets: [
      {
        label: 'Vulnerabilities by Severity',
        data: [8, 24, 45, 53, 13],
        backgroundColor: [
          '#DC2626', // Red for Critical
          '#F97316', // Orange for High
          '#FBBF24', // Yellow for Medium
          '#3B82F6', // Blue for Low
          '#9CA3AF', // Gray for Info
        ],
        borderWidth: 1,
        borderColor: '#1F2937',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Reports</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
          Generate New Report
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-gray-800 rounded-lg p-4">
        <SearchFilter 
          placeholder="Search reports by name or type..." 
          onSearch={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Reports list */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4 h-fit">
          <h2 className="text-lg font-medium text-white mb-4">Available Reports</h2>
          <div className="space-y-3">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <div 
                  key={report.id}
                  className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedReport === report.id ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  onClick={() => handleReportClick(report.id)}
                >
                  <div className="flex-shrink-0 p-2 rounded-md bg-blue-500/10 text-blue-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{report.name}</p>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{report.description}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {report.createdAt}
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <User className="h-3 w-3 mr-1" />
                        {report.createdBy}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No reports found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Report preview */}
        <div className="lg:col-span-2">
          {selectedReport ? (
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {reports.find(r => r.id === selectedReport)?.name}
                    </h2>
                    <p className="text-gray-400 mt-1">
                      {reports.find(r => r.id === selectedReport)?.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {reports.find(r => r.id === selectedReport)?.createdAt}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <User className="h-4 w-4 mr-1" />
                        {reports.find(r => r.id === selectedReport)?.createdBy}
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Executive Summary</h3>
                    <p className="text-gray-300">
                      This report summarizes the security posture as of April 2025. A total of 143 vulnerabilities 
                      were identified across all systems, with 8 critical issues requiring immediate attention.
                      Overall security score has improved by 12% since the last assessment.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Vulnerability Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-md font-medium text-white mb-3">By Severity</h4>
                        <Chart type="doughnut" data={severityData} height={220} />
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-md font-medium text-white mb-3">Top Affected Systems</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Web Application Server</span>
                              <span className="text-white font-medium">32 vulnerabilities</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Database Server</span>
                              <span className="text-white font-medium">24 vulnerabilities</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">API Gateway</span>
                              <span className="text-white font-medium">18 vulnerabilities</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-300">Authentication Server</span>
                              <span className="text-white font-medium">12 vulnerabilities</span>
                            </div>
                            <div className="w-full bg-gray-600 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Key Findings</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Critical SQL injection vulnerability in the customer portal requires immediate patching</li>
                      <li>Outdated SSL certificates on 3 public-facing services</li>
                      <li>Weak password policies allowing brute force attacks</li>
                      <li>Unpatched systems vulnerable to recently disclosed CVEs</li>
                      <li>Improper access controls in the admin dashboard</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li>Apply security patches to all affected systems within 7 days</li>
                      <li>Implement stronger password policies and multi-factor authentication</li>
                      <li>Update SSL certificates and configure proper HTTPS</li>
                      <li>Review and strengthen access control mechanisms</li>
                      <li>Schedule a follow-up assessment in 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg shadow h-full flex items-center justify-center p-12">
              <div className="text-center">
                <FileText className="h-12 w-12 text-gray-500 mx-auto" />
                <h3 className="mt-2 text-lg font-medium text-white">Select a report</h3>
                <p className="mt-1 text-gray-400">Choose a report from the left panel to preview its content</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;