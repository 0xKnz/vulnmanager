import React from 'react';
import { Shield, AlertTriangle, CheckCircle2, Clock, Bell, Award, Target, Calendar, FileText, Search, Zap } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { Link } from 'react-router-dom';
import { mockVulnerabilities } from '../data/mockData';

const Dashboard: React.FC = () => {
  // Memoize calculations to prevent unnecessary re-renders
  const statsData = React.useMemo(() => [
    { title: 'Total Vulnerabilities', value: mockVulnerabilities.length, icon: <Shield className="h-6 w-6" /> },
    { title: 'Critical Issues', value: mockVulnerabilities.filter(v => v.severity === 'Critical').length, icon: <AlertTriangle className="h-6 w-6" /> },
    { title: 'Open Issues', value: mockVulnerabilities.filter(v => v.status === 'Open').length, icon: <Clock className="h-6 w-6" /> },
    { title: 'Resolved Issues', value: mockVulnerabilities.filter(v => v.status === 'Resolved').length, icon: <CheckCircle2 className="h-6 w-6" /> },
  ], []);

  // Memoize critical alerts
  const criticalAlerts = React.useMemo(() => 
    mockVulnerabilities.filter(v => v.severity === 'Critical' && v.status === 'Open'),
    []
  );

  // Memoize calculations
  const { totalVulns, resolvedVulns, inProgressVulns, complianceScore, remediationProgress } = React.useMemo(() => {
    const total = mockVulnerabilities.length;
    const resolved = mockVulnerabilities.filter(v => v.status === 'Resolved').length;
    const inProgress = mockVulnerabilities.filter(v => v.status === 'In Progress').length;
    const compliance = Math.round((resolved / total) * 100);
    const remediation = Math.round(((resolved + inProgress) / total) * 100);
    
    return {
      totalVulns: total,
      resolvedVulns: resolved,
      inProgressVulns: inProgress,
      complianceScore: compliance,
      remediationProgress: remediation
    };
  }, []);

  // Memoize roadmap phases
  const roadmapPhases = React.useMemo(() => [
    { 
      name: 'Kickoff', 
      status: 'completed', 
      date: '2025-01-05',
      icon: <Target className="h-5 w-5" />,
      description: 'Project initiation and scope definition'
    },
    { 
      name: 'Pentest', 
      status: 'completed', 
      date: '2025-01-08 - 2025-01-12',
      icon: <Search className="h-5 w-5" />,
      description: 'Security testing and vulnerability discovery'
    },
    { 
      name: 'Results Delivery', 
      status: 'completed', 
      date: '2025-01-15',
      icon: <FileText className="h-5 w-5" />,
      description: 'Initial findings and vulnerability report'
    },
    { 
      name: 'Remediation Plan', 
      status: 'current', 
      date: '2025-01-16 - 2025-03-15',
      icon: <Zap className="h-5 w-5" />,
      description: 'Fix vulnerabilities with ongoing support'
    },
    { 
      name: 'Retest', 
      status: 'pending', 
      date: '2025-03-16 - 2025-03-20',
      icon: <Shield className="h-5 w-5" />,
      description: 'Verify fixes and test remaining issues'
    },
    { 
      name: 'Final Report', 
      status: 'pending', 
      date: '2025-03-22',
      icon: <Award className="h-5 w-5" />,
      description: 'Final security assessment results'
    },
    { 
      name: 'Project Closure', 
      status: 'pending', 
      date: '2025-03-25',
      icon: <CheckCircle2 className="h-5 w-5" />,
      description: 'Project completion and handover'
    }
  ], []);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-blue-500';
      case 'info':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPhaseStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-blue-500';
      case 'pending':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <span className="text-sm text-gray-400">Last updated: {new Date().toLocaleString()}</span>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Alerts */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-red-500 mr-2" />
              <h2 className="text-lg font-medium text-white">Critical Alerts</h2>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-900 text-red-300 rounded-full">
                {criticalAlerts.length}
              </span>
            </div>
          </div>
          <div className="p-6">
            {criticalAlerts.length > 0 ? (
              <div className="space-y-3">
                {criticalAlerts.slice(0, 3).map((vuln) => (
                  <div key={vuln.id} className="flex items-center justify-between p-3 bg-red-900/20 border border-red-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{vuln.title}</h3>
                        <p className="text-xs text-gray-400">CVSS: {vuln.cvssScore}</p>
                      </div>
                    </div>
                    <Link
                      to={`/vulnerabilities/${vuln.id}`}
                      className="text-xs text-red-400 hover:text-red-300"
                    >
                      View →
                    </Link>
                  </div>
                ))}
                {criticalAlerts.length > 3 && (
                  <Link
                    to="/vulnerabilities"
                    className="block text-center text-sm text-blue-500 hover:text-blue-400 mt-3"
                  >
                    View {criticalAlerts.length - 3} more critical alerts
                  </Link>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No critical alerts</p>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Status */}
        <div className="bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-700">
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-medium text-white">Compliance Status</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-white mb-1">{complianceScore}%</div>
              <p className="text-sm text-gray-400">Security Compliance Score</p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">OWASP Top 10</span>
                <span className="text-white">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">ISO 27001</span>
                <span className="text-white">78%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">NIST Framework</span>
                <span className="text-white">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Remediation Progress */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center">
            <Zap className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-medium text-white">Remediation Progress</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{resolvedVulns}</div>
              <p className="text-sm text-gray-400">Resolved</p>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(resolvedVulns / totalVulns) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{inProgressVulns}</div>
              <p className="text-sm text-gray-400">In Progress</p>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${(inProgressVulns / totalVulns) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{mockVulnerabilities.filter(v => v.status === 'Open').length}</div>
              <p className="text-sm text-gray-400">Pending</p>
              <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(mockVulnerabilities.filter(v => v.status === 'Open').length / totalVulns) * 100}%` }}></div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white font-medium">{remediationProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-3 rounded-full" style={{ width: `${remediationProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pentest Roadmap */}
      <div className="bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-700">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
            <h2 className="text-lg font-medium text-white">Pentest Roadmap</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            
            <div className="space-y-6">
              {roadmapPhases.map((phase, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Timeline dot */}
                  <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${getPhaseStatus(phase.status)} text-white`}>
                    {phase.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`text-lg font-medium ${phase.status === 'current' ? 'text-blue-400' : 'text-white'}`}>
                        {phase.name}
                      </h3>
                      <span className="text-sm text-gray-400">{phase.date}</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{phase.description}</p>
                    {phase.status === 'current' && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                          Current Phase
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;