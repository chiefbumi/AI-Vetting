import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  DollarSign, 
  Clock,
  Send,
  Sparkles,
  Eye,
  Copy
} from "lucide-react";

// Mock data for posted jobs
const mockJobs = [
  {
    id: "1",
    title: "Senior Machine Learning Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote OK)",
    salary: "$150k - $200k",
    type: "Full-time",
    department: "Engineering",
    postedDate: "2 days ago",
    applicants: 47,
    status: "Active",
    originalPrompt: "I want a machine learning engineer with good vibes chill",
    description: "We're looking for a Senior Machine Learning Engineer who brings positive energy and collaborative spirit to our team. You'll work on cutting-edge AI projects in a relaxed, supportive environment.",
    requirements: [
      "5+ years of experience in machine learning",
      "Strong Python and TensorFlow/PyTorch skills",
      "Excellent communication and teamwork abilities", 
      "Positive attitude and cultural fit mindset",
      "Experience with MLOps and deployment"
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible work arrangements",
      "Unlimited PTO",
      "Chill, collaborative team culture"
    ]
  },
  {
    id: "2", 
    title: "Frontend Developer - Creative Team",
    company: "TechCorp Inc.",
    location: "New York, NY (Hybrid)",
    salary: "$100k - $130k",
    type: "Full-time",
    department: "Engineering",
    postedDate: "1 week ago",
    applicants: 23,
    status: "Active",
    originalPrompt: "need a frontend dev who's creative and loves design",
    description: "Join our creative team as a Frontend Developer! We need someone who's passionate about beautiful user interfaces and loves collaborating with designers to bring creative visions to life.",
    requirements: [
      "3+ years frontend development experience",
      "React, TypeScript, CSS mastery",
      "Eye for design and UX principles",
      "Creative problem-solving mindset",
      "Experience with design tools (Figma, etc.)"
    ],
    benefits: [
      "Creative freedom in projects",
      "Design tool subscriptions",
      "Flexible hybrid schedule",
      "Collaborative design team"
    ]
  },
  {
    id: "3",
    title: "Backend Engineer - High Performance Systems",
    company: "TechCorp Inc.", 
    location: "Austin, TX (Remote)",
    salary: "$130k - $170k",
    type: "Full-time",
    department: "Engineering",
    postedDate: "3 days ago",
    applicants: 31,
    status: "Active",
    originalPrompt: "backend engineer who can handle scale and is super technical",
    description: "We need a highly technical Backend Engineer to build and optimize high-performance systems that can handle massive scale. You'll work on challenging technical problems with cutting-edge technologies.",
    requirements: [
      "Strong system design and architecture skills",
      "Experience with distributed systems",
      "Proficiency in Go, Rust, or similar languages",
      "Database optimization expertise",
      "Performance tuning and monitoring"
    ],
    benefits: [
      "Technical excellence focus",
      "Latest hardware and tools",
      "Conference and learning budget",
      "Remote-first culture"
    ]
  }
];

interface MyJobsViewProps {
  onJobSelect: (job: any) => void;
}

export function MyJobsView({ onJobSelect }: MyJobsViewProps) {
  const [jobPrompt, setJobPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobPreview, setShowJobPreview] = useState(false);
  
  const handleGenerateJob = async () => {
    if (!jobPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock generated job (in real app, this would come from AI)
    const generatedJob = {
      title: "AI-Generated Job Title",
      description: `Based on your prompt: "${jobPrompt}"`,
      requirements: ["Generated requirement 1", "Generated requirement 2"],
      benefits: ["Generated benefit 1", "Generated benefit 2"]
    };
    
    setSelectedJob(generatedJob);
    setShowJobPreview(true);
    setIsGenerating(false);
  };

  const handlePostJob = () => {
    // Mock job posting
    console.log("Posting job:", selectedJob);
    setShowJobPreview(false);
    setJobPrompt("");
    setSelectedJob(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Jobs</h1>
        <p className="text-muted-foreground">
          Post jobs using natural language and manage your open positions
        </p>
      </div>

      {/* AI Job Posting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            AI Job Posting
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="job-prompt">Describe the role you want to hire for</Label>
              <Textarea
                id="job-prompt"
                placeholder="e.g., I want a machine learning engineer with good vibes chill, or need a frontend dev who's creative and loves design"
                value={jobPrompt}
                onChange={(e) => setJobPrompt(e.target.value)}
                className="mt-2 min-h-[100px]"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                onClick={handleGenerateJob} 
                disabled={!jobPrompt.trim() || isGenerating}
                className="flex items-center"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Job Post
                  </>
                )}
              </Button>
              
              <div className="text-sm text-muted-foreground">
                AI will create a professional job posting from your description
              </div>
            </div>

            <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <p className="font-medium mb-1">💡 Pro tips:</p>
              <ul className="space-y-1">
                <li>• Be casual and specific: "need a React dev who loves coffee and debugging"</li>
                <li>• Include vibe/culture: "startup energy", "chill team", "fast-paced"</li>
                <li>• Mention what matters: "remote-first", "work-life balance", "cutting-edge tech"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Preview Dialog */}
      <Dialog open={showJobPreview} onOpenChange={setShowJobPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Generated Job Post</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div>
                <Label>Job Title</Label>
                <Input value={selectedJob.title} className="mt-1" />
              </div>
              
              <div>
                <Label>Description</Label>
                <Textarea value={selectedJob.description} className="mt-1 min-h-[100px]" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <Input placeholder="e.g., San Francisco, CA (Remote)" className="mt-1" />
                </div>
                <div>
                  <Label>Salary Range</Label>
                  <Input placeholder="e.g., $120k - $160k" className="mt-1" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button onClick={handlePostJob} className="flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Post Job
                </Button>
                <Button variant="outline" onClick={() => setShowJobPreview(false)}>
                  Edit More
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Active Jobs List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Job Postings</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{mockJobs.length} active</Badge>
            <Badge variant="outline">{mockJobs.reduce((sum, job) => sum + job.applicants, 0)} total applicants</Badge>
          </div>
        </div>

        <div className="grid gap-4">
          {mockJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold">{job.title}</h3>
                      <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                        {job.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.applicants} applicants
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.postedDate}
                      </div>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-lg mb-3">
                      <p className="text-sm">
                        <span className="font-medium">Original prompt:</span> "{job.originalPrompt}"
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onJobSelect(job)}
                      className="text-sm"
                    >
                      <Users className="h-4 w-4 mr-1" />
                      View Top 5
                    </Button>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{job.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Location:</strong> {job.location}</div>
                            <div><strong>Salary:</strong> {job.salary}</div>
                            <div><strong>Type:</strong> {job.type}</div>
                            <div><strong>Department:</strong> {job.department}</div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Job Description</h4>
                            <p className="text-sm">{job.description}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Requirements</h4>
                            <ul className="text-sm space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Benefits</h4>
                            <ul className="text-sm space-y-1">
                              {job.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex space-x-2">
                            <Button className="flex-1">
                              <Users className="h-4 w-4 mr-2" />
                              View {job.applicants} Applicants
                            </Button>
                            <Button variant="outline">
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Job Link
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Total Applicants</h3>
            <p className="text-2xl font-bold text-primary">
              {mockJobs.reduce((sum, job) => sum + job.applicants, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Briefcase className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Active Jobs</h3>
            <p className="text-2xl font-bold text-primary">{mockJobs.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-semibold">Avg. Time to Fill</h3>
            <p className="text-2xl font-bold text-primary">12 days</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}