
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from './ThemeToggle';

interface DashboardHeaderProps {
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
  selectedSalesRep: string;
  setSelectedSalesRep: (value: string) => void;
}

export function DashboardHeader({ 
  selectedDateRange, 
  setSelectedDateRange, 
  selectedSalesRep, 
  setSelectedSalesRep 
}: DashboardHeaderProps) {
  return (
    <Card className="mx-6 mt-6 p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Zoom Insights Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and analyze your Zoom calls</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <div className="flex gap-3">
            <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSalesRep} onValueChange={setSelectedSalesRep}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sales Rep" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reps</SelectItem>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* <ThemeToggle /> */}
        </div>
      </div>
    </Card>
  );
}
