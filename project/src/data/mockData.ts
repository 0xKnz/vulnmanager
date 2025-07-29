import { Vulnerability, Asset } from '../types';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Web Server 01',
    ipAddress: '192.168.1.10',
    type: 'Server',
    os: 'Ubuntu 20.04',
    isActive: true,
    vulnerabilitiesCount: 12,
  },
  {
    id: '2',
    name: 'Database Server',
    ipAddress: '192.168.1.20',
    type: 'Database',
    os: 'CentOS 8',
    isActive: true,
    vulnerabilitiesCount: 8,
  },
  {
    id: '3',
    name: 'API Gateway',
    ipAddress: '192.168.1.30',
    type: 'Gateway',
    os: 'Ubuntu 22.04',
    isActive: true,
    vulnerabilitiesCount: 5,
  },
  {
    id: '4',
    name: 'Load Balancer',
    ipAddress: '192.168.1.40',
    type: 'Network',
    os: 'NGINX',
    isActive: true,
    vulnerabilitiesCount: 3,
  },
  {
    id: '5',
    name: 'File Server',
    ipAddress: '192.168.1.50',
    type: 'Storage',
    os: 'Windows Server 2019',
    isActive: false,
    vulnerabilitiesCount: 0,
  },
  {
    id: '6',
    name: 'Authentication Server',
    ipAddress: '192.168.1.60',
    type: 'Service',
    os: 'Ubuntu 20.04',
    isActive: true,
    vulnerabilitiesCount: 7,
  },
];

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: '1',
    title: 'SQL Injection in Login Form',
    description: 'The login form is vulnerable to SQL injection attacks due to improper input sanitization. An attacker could potentially bypass authentication or extract sensitive data from the database.',
    severity: 'Critical',
    status: 'Open',
    assetId: '1',
    discoveredAt: '2025-01-10',
    discoveredBy: 'John Smith',
    cvssScore: 9.8,
    tags: ['SQL Injection', 'Authentication', 'Web Application'],
    steps: [
      'Navigate to the login page',
      'Enter \' OR 1=1-- in the username field',
      'Enter any password',
      'Click login button',
      'Observe successful authentication bypass'
    ],
    recommendation: 'Implement parameterized queries and input validation. Use prepared statements to prevent SQL injection attacks.',
    references: [
      'https://owasp.org/www-community/attacks/SQL_Injection',
      'https://cwe.mitre.org/data/definitions/89.html'
    ]
  },
  {
    id: '2',
    title: 'Cross-Site Scripting (XSS) in User Profile',
    description: 'The user profile page allows stored XSS attacks through the bio field. Malicious scripts can be executed in other users\' browsers.',
    severity: 'High',
    status: 'In Progress',
    assetId: '1',
    discoveredAt: '2025-01-08',
    discoveredBy: 'Alice Johnson',
    cvssScore: 7.4,
    tags: ['XSS', 'Web Application', 'User Input'],
    steps: [
      'Log into the application',
      'Navigate to user profile settings',
      'Enter <script>alert("XSS")</script> in the bio field',
      'Save the profile',
      'Visit another user\'s profile to see the script execute'
    ],
    recommendation: 'Implement proper output encoding and Content Security Policy (CSP). Sanitize all user inputs before storing and displaying.',
    references: [
      'https://owasp.org/www-community/attacks/xss/',
      'https://cwe.mitre.org/data/definitions/79.html'
    ]
  },
  {
    id: '3',
    title: 'Weak Password Policy',
    description: 'The application allows weak passwords with no complexity requirements, making accounts vulnerable to brute force attacks.',
    severity: 'Medium',
    status: 'Open',
    assetId: '6',
    discoveredAt: '2025-01-05',
    discoveredBy: 'Bob Wilson',
    cvssScore: 5.3,
    tags: ['Authentication', 'Password Policy', 'Brute Force'],
    recommendation: 'Implement strong password requirements including minimum length, complexity, and account lockout policies.',
    references: [
      'https://owasp.org/www-community/controls/Password_Policy',
      'https://cwe.mitre.org/data/definitions/521.html'
    ]
  },
  {
    id: '4',
    title: 'Outdated SSL Certificate',
    description: 'The SSL certificate for the main domain has expired, causing security warnings and potential man-in-the-middle attacks.',
    severity: 'High',
    status: 'Open',
    assetId: '3',
    discoveredAt: '2025-01-12',
    discoveredBy: 'Security Scanner',
    cvssScore: 6.8,
    tags: ['SSL/TLS', 'Certificate', 'Encryption'],
    recommendation: 'Renew the SSL certificate immediately and implement automated certificate renewal to prevent future expirations.',
    references: [
      'https://owasp.org/www-community/controls/Certificate_and_Public_Key_Pinning'
    ]
  },
  {
    id: '5',
    title: 'Directory Traversal Vulnerability',
    description: 'The file download functionality is vulnerable to directory traversal attacks, allowing access to sensitive system files.',
    severity: 'Critical',
    status: 'Open',
    assetId: '1',
    discoveredAt: '2025-01-09',
    discoveredBy: 'Penetration Tester',
    cvssScore: 8.6,
    tags: ['Directory Traversal', 'File Access', 'Path Manipulation'],
    steps: [
      'Navigate to the file download page',
      'Modify the filename parameter to ../../../etc/passwd',
      'Submit the request',
      'Observe access to system files'
    ],
    recommendation: 'Implement proper input validation and use a whitelist of allowed files. Restrict file access to designated directories only.',
    references: [
      'https://owasp.org/www-community/attacks/Path_Traversal',
      'https://cwe.mitre.org/data/definitions/22.html'
    ]
  },
  {
    id: '6',
    title: 'Missing Security Headers',
    description: 'The application is missing important security headers like X-Frame-Options, X-Content-Type-Options, and Content-Security-Policy.',
    severity: 'Medium',
    status: 'Resolved',
    assetId: '1',
    discoveredAt: '2025-01-03',
    discoveredBy: 'Security Audit',
    cvssScore: 4.3,
    tags: ['Security Headers', 'HTTP Headers', 'Defense in Depth'],
    recommendation: 'Implement all recommended security headers to prevent various client-side attacks.',
    references: [
      'https://owasp.org/www-project-secure-headers/',
      'https://securityheaders.com/'
    ]
  },
  {
    id: '7',
    title: 'Insecure Direct Object Reference',
    description: 'Users can access other users\' data by manipulating object references in URLs without proper authorization checks.',
    severity: 'High',
    status: 'In Progress',
    assetId: '1',
    discoveredAt: '2025-01-07',
    discoveredBy: 'Code Review',
    cvssScore: 7.1,
    tags: ['IDOR', 'Authorization', 'Access Control'],
    recommendation: 'Implement proper authorization checks for all object access and use indirect references or UUIDs.',
    references: [
      'https://owasp.org/www-community/attacks/Insecure_Direct_Object_Reference',
      'https://cwe.mitre.org/data/definitions/639.html'
    ]
  },
  {
    id: '8',
    title: 'Unencrypted Database Connection',
    description: 'The application connects to the database without encryption, potentially exposing sensitive data in transit.',
    severity: 'Medium',
    status: 'Open',
    assetId: '2',
    discoveredAt: '2025-01-06',
    discoveredBy: 'Network Analysis',
    cvssScore: 5.9,
    tags: ['Database', 'Encryption', 'Data in Transit'],
    recommendation: 'Enable SSL/TLS encryption for all database connections and verify certificate validity.',
    references: [
      'https://owasp.org/www-community/controls/Cryptographic_Storage_Cheat_Sheet'
    ]
  }
];