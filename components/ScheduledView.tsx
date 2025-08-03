import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Clock, Video, Trophy, Star, MessageCircle, Calendar1, Settings, ArrowLeft, Briefcase } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Mock data for job-specific top 5 candidates
const getJobSpecificCandidates = (jobId?: string) => {
  if (!jobId) return topCandidates;
  
  // Return job-specific candidates based on job ID
  const jobSpecificData: { [key: string]: any[] } = {
    "1": [ // ML Engineer candidates
      {
        id: "ml1",
        name: "Dr. Alex Zhang",
        email: "alex.zhang@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
        overallScore: 98,
        position: "Senior ML Engineer",
        skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
        availableSlots: ["9:00 AM", "2:00 PM", "4:00 PM"],
        scheduledMeetings: 0,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 96,
          cultural: 100,
          experience: 98
        }
      },
      {
        id: "ml2",
        name: "Maya Patel",
        email: "maya.patel@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=64&h=64&fit=crop&crop=face",
        overallScore: 95,
        position: "ML Research Scientist",
        skills: ["Deep Learning", "Computer Vision", "Python"],
        availableSlots: ["10:30 AM", "1:00 PM", "3:30 PM"],
        scheduledMeetings: 1,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 98,
          cultural: 92,
          experience: 95
        }
      },
      {
        id: "ml3",
        name: "Jordan Kim",
        email: "jordan.kim@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        overallScore: 93,
        position: "AI Engineer",
        skills: ["NLP", "Transformers", "AWS", "Docker"],
        availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"],
        scheduledMeetings: 0,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 94,
          cultural: 96,
          experience: 89
        }
      },
      {
        id: "ml4",
        name: "Riley Chen",
        email: "riley.chen@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
        overallScore: 91,
        position: "Data Scientist",
        skills: ["Machine Learning", "Statistics", "Python", "R"],
        availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
        scheduledMeetings: 2,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 88,
          cultural: 94,
          experience: 91
        }
      },
      {
        id: "ml5",
        name: "Sam Rodriguez",
        email: "sam.rodriguez@email.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
        overallScore: 89,
        position: "ML Platform Engineer",
        skills: ["Kubernetes", "MLflow", "Python", "Spark"],
        availableSlots: ["10:00 AM", "3:00 PM", "6:00 PM"],
        scheduledMeetings: 1,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 90,
          cultural: 88,
          experience: 89
        }
      }
    ],
    "2": [ // Frontend Developer candidates
      {
        id: "fe1",
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=64&h=64&fit=crop&crop=face",
        overallScore: 96,
        position: "Senior Frontend Developer",
        skills: ["React", "TypeScript", "Design Systems", "Figma"],
        availableSlots: ["9:00 AM", "2:00 PM", "4:00 PM"],
        scheduledMeetings: 1,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 98,
          cultural: 95,
          experience: 95
        }
      },
      {
        id: "fe2",
        name: "Liam Taylor",
        email: "liam.taylor@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
        overallScore: 94,
        position: "UI/UX Developer",
        skills: ["Vue.js", "CSS3", "Animation", "Adobe Creative"],
        availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM"],
        scheduledMeetings: 0,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 92,
          cultural: 97,
          experience: 93
        }
      },
      {
        id: "fe3",
        name: "Zoe Martinez",
        email: "zoe.martinez@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
        overallScore: 92,
        position: "Frontend Architect",
        skills: ["React", "Next.js", "Performance", "Accessibility"],
        availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"],
        scheduledMeetings: 2,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 96,
          cultural: 88,
          experience: 92
        }
      },
      {
        id: "fe4",
        name: "Oliver Chang",
        email: "oliver.chang@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        overallScore: 90,
        position: "Creative Developer",
        skills: ["Three.js", "WebGL", "Creative Coding", "React"],
        availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
        scheduledMeetings: 1,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 89,
          cultural: 92,
          experience: 89
        }
      },
      {
        id: "fe5",
        name: "Ava Johnson",
        email: "ava.johnson@email.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
        overallScore: 88,
        position: "Frontend Engineer",
        skills: ["React", "Styled Components", "Jest", "Storybook"],
        availableSlots: ["10:30 AM", "3:00 PM", "6:00 PM"],
        scheduledMeetings: 0,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 87,
          cultural: 90,
          experience: 87
        }
      }
    ],
    "3": [ // Backend Engineer candidates  
      {
        id: "be1",
        name: "Marcus Thompson",
        email: "marcus.thompson@email.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
        overallScore: 97,
        position: "Senior Backend Engineer",
        skills: ["Go", "Microservices", "Kubernetes", "PostgreSQL"],
        availableSlots: ["9:00 AM", "2:00 PM", "4:00 PM"],
        scheduledMeetings: 1,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 99,
          cultural: 93,
          experience: 98
        }
      },
      {
        id: "be2",
        name: "Isabella Garcia",
        email: "isabella.garcia@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=64&h=64&fit=crop&crop=face",
        overallScore: 95,
        position: "Distributed Systems Engineer",
        skills: ["Rust", "Apache Kafka", "Redis", "gRPC"],
        availableSlots: ["10:30 AM", "1:00 PM", "3:30 PM"],
        scheduledMeetings: 2,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 97,
          cultural: 91,
          experience: 96
        }
      },
      {
        id: "be3",
        name: "Noah Davis",
        email: "noah.davis@email.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        overallScore: 93,
        position: "API Platform Engineer",
        skills: ["Java", "Spring Boot", "AWS", "GraphQL"],
        availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"],
        scheduledMeetings: 0,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 94,
          cultural: 90,
          experience: 95
        }
      },
      {
        id: "be4",
        name: "Sophie Lee",
        email: "sophie.lee@email.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
        overallScore: 91,
        position: "Performance Engineer",
        skills: ["C++", "Performance Tuning", "Monitoring", "Linux"],
        availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
        scheduledMeetings: 1,
        isAutoBooked: false,
        jobRelevantScore: {
          technical: 96,
          cultural: 85,
          experience: 92
        }
      },
      {
        id: "be5",
        name: "Ethan Brown",
        email: "ethan.brown@email.com",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
        overallScore: 89,
        position: "Cloud Backend Engineer",
        skills: ["Node.js", "Docker", "Terraform", "MongoDB"],
        availableSlots: ["10:00 AM", "3:00 PM", "6:00 PM"],
        scheduledMeetings: 3,
        isAutoBooked: true,
        jobRelevantScore: {
          technical: 88,
          cultural: 92,
          experience: 87
        }
      }
    ]
  };
  
  return jobSpecificData[jobId] || topCandidates;
};

// Original mock data for general top 5 candidates
const topCandidates = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=64&h=64&fit=crop&crop=face",
    overallScore: 96,
    position: "Senior Frontend Engineer",
    skills: ["React", "TypeScript", "Node.js"],
    availableSlots: ["9:00 AM", "2:00 PM", "4:00 PM"],
    scheduledMeetings: 2,
    isAutoBooked: false
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "marcus.j@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    overallScore: 94,
    position: "Full Stack Developer",
    skills: ["Python", "React", "AWS"],
    availableSlots: ["10:00 AM", "1:00 PM", "3:00 PM"],
    scheduledMeetings: 1,
    isAutoBooked: true
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena.r@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    overallScore: 92,
    position: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD"],
    availableSlots: ["11:00 AM", "2:30 PM", "5:00 PM"],
    scheduledMeetings: 3,
    isAutoBooked: false
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    overallScore: 91,
    position: "Backend Engineer",
    skills: ["Java", "Spring", "PostgreSQL"],
    availableSlots: ["9:30 AM", "1:30 PM", "4:30 PM"],
    scheduledMeetings: 1,
    isAutoBooked: true
  },
  {
    id: "5",
    name: "Priya Patel",
    email: "priya.patel@email.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face",
    overallScore: 89,
    position: "ML Engineer",
    skills: ["Python", "TensorFlow", "MLOps"],
    availableSlots: ["10:30 AM", "3:00 PM", "6:00 PM"],
    scheduledMeetings: 2,
    isAutoBooked: false
  }
];

const upcomingMeetings = [
  {
    id: "1",
    candidateName: "Sarah Chen",
    time: "Today, 2:00 PM",
    type: "Technical Interview",
    duration: "60 min",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: "2",
    candidateName: "Marcus Johnson",
    time: "Tomorrow, 10:00 AM",
    type: "Behavioral Interview",
    duration: "45 min",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
  },
  {
    id: "3",
    candidateName: "Elena Rodriguez",
    time: "Dec 6, 11:00 AM",
    type: "Final Round",
    duration: "90 min",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
  }
];

interface ScheduledViewProps {
  selectedJob?: any;
  onClearJob?: () => void;
}

export function ScheduledView({ selectedJob, onClearJob }: ScheduledViewProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [meetingType, setMeetingType] = useState<string>("");
  const [autoBookingEnabled, setAutoBookingEnabled] = useState(false);
  
  // Get candidates based on selected job
  const candidatesToShow = selectedJob ? getJobSpecificCandidates(selectedJob.id) : topCandidates;

  const handleQuickBook = (candidateId: string, timeSlot: string) => {
    // Mock booking functionality
    console.log(`Booking ${timeSlot} slot for candidate ${candidateId}`);
  };

  const handleAutoBook = (candidateId: string) => {
    // Mock auto-booking functionality
    console.log(`Enabling auto-booking for candidate ${candidateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        {selectedJob ? (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearJob}
                className="p-1"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Briefcase className="h-5 w-5" />
              <h1 className="text-2xl font-semibold">{selectedJob.title}</h1>
            </div>
            <p className="text-muted-foreground">
              Top 5 candidates for this position • {selectedJob.applicants} total applicants
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-semibold">Interview Scheduling</h1>
            <p className="text-muted-foreground">
              Manage meetings with top-performing candidates
            </p>
          </div>
        )}
      </div>

      {selectedJob && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium">Job Match Score</div>
                <div className="text-2xl font-bold text-primary">
                  {Math.round(candidatesToShow.reduce((sum, c) => sum + c.overallScore, 0) / candidatesToShow.length)}%
                </div>
              </div>
              <div>
                <div className="font-medium">Auto-Booked</div>
                <div className="text-2xl font-bold text-green-600">
                  {candidatesToShow.filter(c => c.isAutoBooked).length}/5
                </div>
              </div>
              <div>
                <div className="font-medium">Available Now</div>
                <div className="text-2xl font-bold text-blue-600">
                  {candidatesToShow.filter(c => c.scheduledMeetings === 0).length}
                </div>
              </div>
              <div>
                <div className="font-medium">Total Slots</div>
                <div className="text-2xl font-bold text-orange-600">
                  {candidatesToShow.reduce((sum, c) => sum + c.availableSlots.length, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top 5 Leaderboard */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                {selectedJob ? `Top 5 for ${selectedJob.title}` : 'Top 5 Performers'}
              </CardTitle>
              {selectedJob && (
                <div className="text-sm text-muted-foreground">
                  Candidates ranked specifically for this role based on technical skills, cultural fit, and experience
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidatesToShow.map((candidate, index) => (
                  <div key={candidate.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                          {index + 1}
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{candidate.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            Score: {candidate.overallScore}
                          </Badge>
                          {selectedJob && candidate.jobRelevantScore && (
                            <div className="flex space-x-1">
                              <Badge variant="outline" className="text-xs">
                                Tech: {candidate.jobRelevantScore.technical}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Culture: {candidate.jobRelevantScore.cultural}
                              </Badge>
                            </div>
                          )}
                          {candidate.isAutoBooked && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                              Auto-booked
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{candidate.position}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          {candidate.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                        {selectedJob && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Perfect match for: {selectedJob.originalPrompt}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="text-right text-sm text-muted-foreground mr-4">
                        <p>{candidate.scheduledMeetings} meetings</p>
                        <p className="text-xs">{candidate.availableSlots.length} slots available</p>
                      </div>
                      
                      {/* Quick Book Dropdown */}
                      <Select onValueChange={(value) => handleQuickBook(candidate.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Book" />
                        </SelectTrigger>
                        <SelectContent>
                          {candidate.availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {/* Auto-Book Button */}
                      <Button
                        size="sm"
                        variant={candidate.isAutoBooked ? "secondary" : "outline"}
                        onClick={() => handleAutoBook(candidate.id)}
                        className="text-xs"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {candidate.isAutoBooked ? "Auto On" : "Auto Book"}
                      </Button>

                      {/* Detailed Booking Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost">
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Schedule Interview - {candidate.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="date">Date</Label>
                                <Input type="date" id="date" />
                              </div>
                              <div>
                                <Label htmlFor="time">Time</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {candidate.availableSlots.map((slot) => (
                                      <SelectItem key={slot} value={slot}>
                                        {slot}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="type">Interview Type</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="technical">Technical Interview</SelectItem>
                                  <SelectItem value="behavioral">Behavioral Interview</SelectItem>
                                  <SelectItem value="final">Final Round</SelectItem>
                                  <SelectItem value="culture">Culture Fit</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="duration">Duration</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select duration" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="30">30 minutes</SelectItem>
                                  <SelectItem value="45">45 minutes</SelectItem>
                                  <SelectItem value="60">60 minutes</SelectItem>
                                  <SelectItem value="90">90 minutes</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea id="notes" placeholder="Add any special instructions..." />
                            </div>

                            <div className="flex space-x-2">
                              <Button className="flex-1">
                                <Video className="h-4 w-4 mr-2" />
                                Schedule Video Call
                              </Button>
                              <Button variant="outline" className="flex-1">
                                <Calendar1 className="h-4 w-4 mr-2" />
                                Send Calendar Invite
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={meeting.avatar} />
                      <AvatarFallback>{meeting.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{meeting.candidateName}</p>
                      <p className="text-xs text-muted-foreground">{meeting.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium">{meeting.time}</p>
                      <p className="text-xs text-muted-foreground">{meeting.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
            </CardContent>
          </Card>

          {/* Auto-Booking Settings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Auto-Booking Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm">Default Interview Duration</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="60 minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm">Auto-book candidates scoring</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="90+ points" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="85">85+ points</SelectItem>
                      <SelectItem value="90">90+ points</SelectItem>
                      <SelectItem value="95">95+ points</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm">Preferred time slots</Label>
                  <div className="mt-1 text-xs text-muted-foreground">
                    9:00 AM - 5:00 PM (weekdays)
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full text-sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure Auto-Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}