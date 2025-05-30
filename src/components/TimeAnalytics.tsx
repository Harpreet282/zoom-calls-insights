
import { Clock, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const timeMetrics = [
  {
    title: 'Avg. Speaking Time',
    value: '22.5 min',
    change: '+12%',
    trend: 'up',
    icon: Clock,
    description: 'Per call average',
  },
  {
    title: 'Talk Time Ratio',
    value: '65%',
    change: '+5%',
    trend: 'up',
    icon: TrendingUp,
    description: 'Sales rep vs client',
  },
  {
    title: 'Participants/Call',
    value: '3.8',
    change: '-2%',
    trend: 'down',
    icon: Users,
    description: 'Average attendees',
  },
];

export function TimeAnalytics() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Time Analytics</h3>
      
      {timeMetrics.map((metric, index) => (
        <Card key={index} className="animate-fade-in hover-scale">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <metric.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-base">Speaking Distribution</CardTitle>
          <CardDescription>Last 30 days breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sales Reps</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Clients</span>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
