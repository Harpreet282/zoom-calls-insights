import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Clock, Users, TrendingUp, Mail, Calendar } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';

const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Sales Representative',
    email: 'john.doe@company.com',
    stats: {
      totalCalls: 45,
      avgDuration: '35 min',
      successRate: '85%',
      totalDeals: 12
    },
    recentActivity: 'Last call: Product Demo - Acme Corp',
    status: 'active'
  },
  {
    id: '2',
    name: 'John Smith',
    role: 'Sales Representative',
    email: 'john.smith@company.com',
    stats: {
      totalCalls: 38,
      avgDuration: '28 min',
      successRate: '78%',
      totalDeals: 8
    },
    recentActivity: 'Last call: Discovery Call - TechStart Inc',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    role: 'Sales Representative',
    email: 'mike.johnson@company.com',
    stats: {
      totalCalls: 42,
      avgDuration: '32 min',
      successRate: '82%',
      totalDeals: 10
    },
    recentActivity: 'Last call: Follow-up - Global Solutions',
    status: 'active'
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    role: 'Sales Representative',
    email: 'sarah.wilson@company.com',
    stats: {
      totalCalls: 50,
      avgDuration: '40 min',
      successRate: '88%',
      totalDeals: 15
    },
    recentActivity: 'Last call: Quarterly Review - Enterprise Co',
    status: 'active'
  }
];

export default function Team() {
  const [selectedDateRange, setSelectedDateRange] = useState('last-7-days');
  const [selectedSalesRep, setSelectedSalesRep] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
      
        <div className="mb-6">
         
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  representative
                </h1>
                
              </div>
              
            </div>
          </div>
        </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                    {member.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{member.email}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">{member.stats.totalCalls}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Total Calls</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">{member.stats.avgDuration}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Avg Duration</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-medium">{member.stats.successRate}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Success Rate</p>
                    </div>
                    <div className="bg-orange-50 dark:bg-orange-950 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-sm font-medium">{member.stats.totalDeals}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Total Deals</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{member.recentActivity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 