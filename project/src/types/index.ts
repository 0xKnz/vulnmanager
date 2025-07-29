export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  status: 'Open' | 'In Progress' | 'Resolved';
  assetId: string;
  discoveredAt?: string;
  discoveredBy?: string;
  cvssScore?: number;
  tags: string[];
  steps?: string[];
  recommendation?: string;
  evidenceImage?: string;
  references?: string[];
}

export interface Asset {
  id: string;
  name: string;
  ipAddress: string;
  type: string;
  os: string;
  isActive: boolean;
  vulnerabilitiesCount: number;
}