
import { Phone, Clock, Users, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
interface CallsSectionProps {
  dateRange: string;
  salesRep: string;
}

const mockCalls = [
  {
    id: '1',
    title: 'Product Demo - Acme Corp',
    salesRep: 'John Doe',
    date: '2024-05-29',
    time: '10:00 AM',
    duration: '45 min',
    participants: 4,
    status: 'completed',
    speakingTime: {
      'John Doe': 25,
      'Client Lead': 15,
      'Technical Contact': 5,
    }
  },
  {
    id: '2',
    title: 'Discovery Call - TechStart Inc',
    salesRep: 'Jane Smith',
    date: '2024-05-29',
    time: '2:00 PM',
    duration: '30 min',
    participants: 3,
    status: 'completed',
    speakingTime: {
      'Jane Smith': 18,
      'Prospect': 12,
    }
  },
  {
    id: '3',
    title: 'Follow-up - Global Solutions',
    salesRep: 'Mike Johnson',
    date: '2024-05-28',
    time: '11:30 AM',
    duration: '25 min',
    participants: 2,
    status: 'completed',
    speakingTime: {
      'Mike Johnson': 15,
      'Client': 10,
    }
  },
  {
    id: '4',
    title: 'Quarterly Review - Enterprise Co',
    salesRep: 'Sarah Wilson',
    date: '2024-05-28',
    time: '3:30 PM',
    duration: '60 min',
    participants: 6,
    status: 'completed',
    speakingTime: {
      'Sarah Wilson': 30,
      'VP Sales': 20,
      'Product Manager': 10,
    }
  },
];

export function CallsSection({ dateRange, salesRep }: CallsSectionProps) {
  const navigate = useNavigate();
  
  const filteredCalls = mockCalls.filter(call => {
    if (salesRep !== 'all' && call.salesRep.toLowerCase().replace(' ', '-') !== salesRep) {
      return false;
    }
    return true;
  });

  const handleCallClick = (callId: string) => {
    navigate(`/call/${callId}`);
  };

  return (
    <Card className="animate-fade-in">
      <CardContent>
       <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-blue-600" />
            <span>Recent Calls</span>
          </CardTitle>
          <CardDescription>
            Showing {filteredCalls.length} calls for the selected filters
          </CardDescription>
        </div>
        <Button
          variant="outline"
          className="flex items-center space-x-2"
          onClick={() => navigate('/calls')}
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardHeader>
        <div className="space-y-4">
          {filteredCalls.map((call) => (
            <div
              key={call.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300"
              onClick={() => handleCallClick(call.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {call.title}
                  </h4>
                  <p className="text-sm text-gray-600">{call.salesRep}</p>
                </div>
                <Badge variant={call.status === 'completed' ? 'default' : 'secondary'}>
                  {call.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{call.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{call.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{call.participants} participants</span>
                </div>
                <div className="text-right">
                  <span className="text-blue-600 font-medium">{call.time}</span>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-2">Speaking Time:</h5>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(call.speakingTime).map(([speaker, minutes]) => (
                    <div key={speaker} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                      {speaker}: {minutes}m
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
