
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const speakingData = [
  { name: 'John Doe', speaking: 25, listening: 20, total: 45 },
  { name: 'Jane Smith', speaking: 18, listening: 12, total: 30 },
  { name: 'Mike Johnson', speaking: 15, listening: 10, total: 25 },
  { name: 'Sarah Wilson', speaking: 30, listening: 30, total: 60 },
];

const pieData = [
  { name: 'Sales Reps', value: 68, color: '#3B82F6' },
  { name: 'Clients', value: 32, color: '#10B981' },
];

export function SpeakingTimeChart() {
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Speaking Time Analysis</CardTitle>
        <CardDescription>Detailed breakdown of call participation</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={speakingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    fontSize={12}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value, name) => [`${value} min`, name === 'speaking' ? 'Speaking' : 'Listening']}
                    labelFormatter={(label) => `Rep: ${label}`}
                  />
                  <Bar dataKey="speaking" fill="#3B82F6" name="speaking" />
                  <Bar dataKey="listening" fill="#94A3B8" name="listening" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="pie" className="mt-4">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
