import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Calendar, Play, Pause, Volume2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ParticipantChart } from '@/components/ParticipantChart';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState, useRef } from 'react';
import { Slider } from '@/components/ui/slider';

// Mock data - in a real app, this would come from an API
const mockCallDetails = {
  '1': {
    id: '1',
    title: 'Product Demo - Acme Corp',
    date: '2024-05-29',
    time: '10:00 AM',
    duration: '45 min',
    status: 'completed',
    participants: [
      { name: 'John Doe', role: 'Sales Rep', speakingTime: 25, color: '#3B82F6' },
      { name: 'Client Lead', role: 'Decision Maker', speakingTime: 15, color: '#10B981' },
      { name: 'Technical Contact', role: 'Technical', speakingTime: 5, color: '#F59E0B' },
    ]
  },
  '2': {
    id: '2',
    title: 'Discovery Call - TechStart Inc',
    date: '2024-05-29',
    time: '2:00 PM',
    duration: '30 min',
    status: 'completed',
    participants: [
      { name: 'Jane Smith', role: 'Sales Rep', speakingTime: 18, color: '#3B82F6' },
      { name: 'Prospect', role: 'Prospect', speakingTime: 12, color: '#10B981' },
    ]
  },
  '3': {
    id: '3',
    title: 'Follow-up - Global Solutions',
    date: '2024-05-28',
    time: '11:30 AM',
    duration: '25 min',
    status: 'completed',
    participants: [
      { name: 'Mike Johnson', role: 'Sales Rep', speakingTime: 15, color: '#3B82F6' },
      { name: 'Client', role: 'Client', speakingTime: 10, color: '#10B981' },
    ]
  },
  '4': {
    id: '4',
    title: 'Quarterly Review - Enterprise Co',
    date: '2024-05-28',
    time: '3:30 PM',
    duration: '60 min',
    status: 'completed',
    participants: [
      { name: 'Sarah Wilson', role: 'Sales Rep', speakingTime: 30, color: '#3B82F6' },
      { name: 'VP Sales', role: 'Executive', speakingTime: 20, color: '#10B981' },
      { name: 'Product Manager', role: 'Product', speakingTime: 10, color: '#F59E0B' },
    ]
  },
};

const CallDetail = () => {
  const { callId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(2700); // 45 minutes in seconds
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const callDetail = callId ? mockCallDetails[callId as keyof typeof mockCallDetails] : null;

  if (!callDetail) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Call Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">The requested call could not be found.</p>
            <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalSpeakingTime = callDetail.participants.reduce((sum, p) => sum + p.speakingTime, 0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 lg:p-6">
      {/* <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div> */}
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {callDetail.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{callDetail.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{callDetail.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{callDetail.participants.length} participants</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={callDetail.status === 'completed' ? 'default' : 'secondary'}>
                  {callDetail.status}
                </Badge>
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">{callDetail.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Participants & Speaking Time</CardTitle>
              <CardDescription>Detailed breakdown of call participation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {callDetail.participants.map((participant, index) => {
                  const percentage = Math.round((participant.speakingTime / totalSpeakingTime) * 100);
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{participant.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{participant.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">{participant.speakingTime}m</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: participant.color,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <ParticipantChart participants={callDetail.participants} />
        </div>

        {/* Meeting Recording Card */}
        <Card className="dark:bg-gray-900 dark:border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Meeting Recording</CardTitle>
            <CardDescription>Listen to the full meeting recording</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handlePlayPause}
                    className="w-10 h-10 rounded-full"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="w-full"
                />
              </div>

              <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
                src="https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav"
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="dark:text-gray-100">Call Summary</CardTitle>
            <CardDescription>Key metrics and insights from this call</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Duration</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{callDetail.duration}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">Total Speaking</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{totalSpeakingTime}m</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Participants</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{callDetail.participants.length}</p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">Avg. Talk Time</p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {Math.round(totalSpeakingTime / callDetail.participants.length)}m
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CallDetail;
