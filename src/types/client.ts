export interface HealthMetric {
  name: string;
  score: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface FinancialHealth {
  score: number;
  metrics: HealthMetric[];
  lastUpdated: string;
}

export interface Client {
  email: string;
  phone: string;
  company?: string;
  address?: string; // Added address property
  website?: string;
  createdAt: string;
  status: 'active' | 'inactive';
  notes?: string;
  recentActivity?: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    description: string;
    timestamp: string;
  }[];
}