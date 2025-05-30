import { useState } from 'react';
import { CallsSection } from '@/components/CallsSection';
import { TimeAnalytics } from '@/components/TimeAnalytics';
import { SpeakingTimeChart } from '@/components/SpeakingTimeChart';
import { DashboardHeader } from '@/components/DashboardHeader';

const Index = () => {
  const [selectedDateRange, setSelectedDateRange] = useState('last-7-days');
  const [selectedSalesRep, setSelectedSalesRep] = useState('all');

  return (
    <>
      <DashboardHeader
        selectedDateRange={selectedDateRange}
        setSelectedDateRange={setSelectedDateRange}
        selectedSalesRep={selectedSalesRep}
        setSelectedSalesRep={setSelectedSalesRep}
      />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CallsSection 
              dateRange={selectedDateRange}
              salesRep={selectedSalesRep}
            />
          </div>
          <div>
            <TimeAnalytics />
          </div>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SpeakingTimeChart />
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Timeline View</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Timeline visualization coming soon
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Index;
