import { TrendingUp, AlertCircle, Calendar, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card'; // use alias if configured

export function ClientDashboard() {
  const healthScore = 85;

  const metrics = [
    { label: 'Savings', score: 92 },
    { label: 'Investments', score: 78 },
    { label: 'Tax Planning', score: 85 }
  ];

  const actionItems = [
    {
      icon: AlertCircle,
      title: 'Required Actions',
      value: '3',
      description: 'Tasks needing attention'
    },
    {
      icon: Calendar,
      title: 'Upcoming Deadlines',
      value: '2',
      description: 'In the next 30 days'
    },
    {
      icon: TrendingUp,
      title: 'Investment Growth',
      value: '+12.5%',
      description: 'Last 30 days'
    },
    {
      icon: FileText,
      title: 'Pending Documents',
      value: '5',
      description: 'Awaiting review'
    }
  ];

  const documents = [
    {
      title: 'Tax Return 2023',
      type: 'PDF',
      date: '2024-03-15',
      status: 'pending'
    },
    {
      title: 'W-2 Form',
      type: 'PDF',
      date: '2024-03-14',
      status: 'approved'
    },
    {
      title: 'Investment Statement',
      type: 'PDF',
      date: '2024-03-13',
      status: 'pending'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Health Score */}
      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Health Score</h3>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full">
              <div
                className="h-4 bg-green-500 rounded-full"
                style={{ width: `${healthScore}%` }}
              />
            </div>
          </div>
          <span className="ml-4 text-2xl font-bold text-green-500">{healthScore}/100</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-sm font-medium text-gray-500">{metric.label}</div>
              <div className="text-lg font-semibold text-gray-900">{metric.score}/100</div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Items */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {actionItems.map((item) => (
          <Card
            key={item.title}
            icon={item.icon}
            title={item.title}
            value={item.value}
            description={item.description}
          />
        ))}
      </section>

      {/* Document Timeline */}
      <section className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Documents</h3>
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-400 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">{doc.title}</p>
                  <p className="text-sm text-gray-500">
                    {doc.type} • {doc.date}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  doc.status === 'approved'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {doc.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}