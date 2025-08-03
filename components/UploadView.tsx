import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  Upload, 
  FileText, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Clock, 
  Brain,
  Calendar,
  Zap,
  Settings,
  Eye,
  Send,
  Timer,
  Target,
  MessageSquare,
  Mic,
  Code,
  Trophy
} from "lucide-react";

type UploadStep = "setup" | "uploading" | "processing" | "sending-tests" | "waiting-responses" | "scoring" | "scheduling" | "complete";

export function UploadView() {
  const [uploadStep, setUploadStep] = useState<UploadStep>("setup");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processedCandidates, setProcessedCandidates] = useState(0);
  const [totalCandidates] = useState(87);
  const [currentActivity, setCurrentActivity] = useState("");
  
  // Configuration state
  const [testDuration, setTestDuration] = useState("7");
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [emailTemplate, setEmailTemplate] = useState("Hi {name}, we're excited to invite you to complete our AI assessment. Click the link below to start your writing, speaking, and technical evaluation. You have {duration} days to complete.");
  const [selectedJob, setSelectedJob] = useState("");
  const [minScore, setMinScore] = useState("75");

  // Mock progress data
  const [testResponses, setTestResponses] = useState({ completed: 0, pending: 87 });
  const [scoringProgress, setScoringProgress] = useState({ completed: 0, total: 87 });
  const [schedulingProgress, setSchedulingProgress] = useState({ scheduled: 0, total: 5 });

  const mockJobs = [
    { id: "1", title: "Senior Machine Learning Engineer" },
    { id: "2", title: "Frontend Developer - Creative Team" },
    { id: "3", title: "Backend Engineer - High Performance Systems" }
  ];

  const handleStartProcess = () => {
    setUploadStep("uploading");
    setUploadProgress(0);
    setCurrentActivity("Uploading candidate CSV...");

    // Simulate upload
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          startProcessing();
          return 100;
        }
        return prev + 15;
      });
    }, 300);
  };

  const startProcessing = () => {
    setUploadStep("processing");
    setCurrentActivity("Enriching candidate data with AI...");
    
    const processInterval = setInterval(() => {
      setProcessedCandidates(prev => {
        if (prev >= totalCandidates) {
          clearInterval(processInterval);
          startSendingTests();
          return totalCandidates;
        }
        setCurrentActivity(`Processing candidate ${prev + 1}/${totalCandidates}...`);
        return prev + Math.floor(Math.random() * 3) + 1;
      });
    }, 400);
  };

  const startSendingTests = () => {
    setUploadStep("sending-tests");
    setCurrentActivity("Sending personalized test links via email...");
    
    setTimeout(() => {
      setUploadStep("waiting-responses");
      setCurrentActivity("Waiting for candidate responses...");
      startResponseTracking();
    }, 3000);
  };

  const startResponseTracking = () => {
    const responseInterval = setInterval(() => {
      setTestResponses(prev => {
        const newCompleted = Math.min(prev.completed + Math.floor(Math.random() * 3) + 1, totalCandidates);
        const newPending = totalCandidates - newCompleted;
        
        if (newCompleted >= Math.floor(totalCandidates * 0.8)) {
          clearInterval(responseInterval);
          startScoring();
        }
        
        return { completed: newCompleted, pending: newPending };
      });
    }, 2000);
  };

  const startScoring = () => {
    setUploadStep("scoring");
    setCurrentActivity("AI scoring candidate responses...");
    
    const scoringInterval = setInterval(() => {
      setScoringProgress(prev => {
        const newCompleted = Math.min(prev.completed + Math.floor(Math.random() * 2) + 1, testResponses.completed);
        
        if (newCompleted >= testResponses.completed) {
          clearInterval(scoringInterval);
          startScheduling();
        }
        
        return { completed: newCompleted, total: testResponses.completed };
      });
    }, 600);
  };

  const startScheduling = () => {
    setUploadStep("scheduling");
    setCurrentActivity("Auto-scheduling meetings with top 5 performers...");
    
    const schedulingInterval = setInterval(() => {
      setSchedulingProgress(prev => {
        const newScheduled = Math.min(prev.scheduled + 1, 5);
        
        if (newScheduled >= 5) {
          clearInterval(schedulingInterval);
          setUploadStep("complete");
          setCurrentActivity("Process complete!");
        }
        
        return { scheduled: newScheduled, total: 5 };
      });
    }, 1000);
  };

  const renderSetupStep = () => (
    <div className="space-y-6">
      {/* Upload Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Assessment Configuration
          </CardTitle>
          <CardDescription>
            Configure how AI will assess candidates and handle the entire pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-select">Target Job Position</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a job to assess for" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockJobs.map(job => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-1">
                  AI will tailor assessments for this specific role
                </p>
              </div>

              <div>
                <Label htmlFor="test-duration">Test Completion Window</Label>
                <Select value={testDuration} onValueChange={setTestDuration}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days (recommended)</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="min-score">Minimum Score for Auto-Scheduling</Label>
                <Input 
                  id="min-score"
                  value={minScore}
                  onChange={(e) => setMinScore(e.target.value)}
                  placeholder="75"
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Only candidates above this score get auto-scheduled
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-Schedule Top 5</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically send meeting links to top performers
                  </p>
                </div>
                <Switch checked={autoSchedule} onCheckedChange={setAutoSchedule} />
              </div>

              <div>
                <Label htmlFor="email-template">Email Template</Label>
                <Textarea
                  id="email-template"
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="mt-1 min-h-[100px]"
                  placeholder="Customize the email sent to candidates..."
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Use {"{name}"} and {"{duration}"} for personalization
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Candidate Data</CardTitle>
          <CardDescription>
            Upload CSV with name and contact info. AI handles the rest automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">Drop your CSV file here</h3>
            <p className="text-muted-foreground mb-4">or click to browse and select</p>
            <Button onClick={handleStartProcess} disabled={!selectedJob}>
              <Upload className="h-4 w-4 mr-2" />
              Start AI Assessment Pipeline
            </Button>
          </div>

          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Required CSV Format:</h4>
            <code className="text-sm bg-background p-2 rounded border block">
              name,contact<br/>
              John Smith,john@email.com<br/>
              Jane Doe,+1-555-123-4567
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <MessageSquare className="h-4 w-4 mr-2 text-blue-600" />
                <span className="font-medium">Writing Assessment</span>
              </div>
              <p className="text-muted-foreground text-xs">
                Essay prompts, technical writing, communication skills
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Mic className="h-4 w-4 mr-2 text-green-600" />
                <span className="font-medium">Speaking Assessment</span>
              </div>
              <p className="text-muted-foreground text-xs">
                Video responses, presentation skills, verbal communication
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Code className="h-4 w-4 mr-2 text-purple-600" />
                <span className="font-medium">Technical Assessment</span>
              </div>
              <p className="text-muted-foreground text-xs">
                Role-specific challenges, problem-solving, coding skills
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProgressStep = () => {
    const stepConfigs = {
      uploading: {
        title: "Uploading Candidate Data",
        icon: Upload,
        progress: uploadProgress,
        description: "Processing CSV and validating candidate information"
      },
      processing: {
        title: "AI Data Enrichment",
        icon: Brain,
        progress: (processedCandidates / totalCandidates) * 100,
        description: "Enriching profiles with public data and generating assessment links"
      },
      "sending-tests": {
        title: "Sending Assessment Links",
        icon: Send,
        progress: 100,
        description: "Sending personalized test links via email to all candidates"
      },
      "waiting-responses": {
        title: "Collecting Responses",
        icon: Timer,
        progress: (testResponses.completed / totalCandidates) * 100,
        description: `${testResponses.completed} completed, ${testResponses.pending} pending`
      },
      scoring: {
        title: "AI Scoring & Ranking",
        icon: Target,
        progress: (scoringProgress.completed / scoringProgress.total) * 100,
        description: "Analyzing writing, speaking, and technical responses"
      },
      scheduling: {
        title: "Auto-Scheduling Top 5",
        icon: Calendar,
        progress: (schedulingProgress.scheduled / schedulingProgress.total) * 100,
        description: "Sending meeting invites to highest-scoring candidates"
      }
    };

    const config = stepConfigs[uploadStep as keyof typeof stepConfigs];
    const IconComponent = config.icon;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {uploadStep === "processing" || uploadStep === "scoring" ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
            ) : (
              <IconComponent className="h-5 w-5 mr-2" />
            )}
            {config.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={config.progress} className="w-full" />
          <p className="text-sm text-muted-foreground">{config.description}</p>
          
          {uploadStep === "waiting-responses" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{testResponses.completed}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-orange-600">{testResponses.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
            </div>
          )}

          {uploadStep === "scoring" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Writing Scores</span>
                <Badge variant="secondary">Complete</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Speaking Analysis</span>
                <Badge variant="secondary">Complete</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Technical Evaluation</span>
                <div className="animate-pulse">
                  <Badge>In Progress</Badge>
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Current activity: {currentActivity}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCompleteStep = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            Assessment Pipeline Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Successfully processed {totalCandidates} candidates. Top 5 performers have been automatically scheduled for interviews.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Auto-Scheduled</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-950/30">
              <CardContent className="p-4 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold">92.3%</div>
                <div className="text-sm text-muted-foreground">Avg Top 5 Score</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/30">
              <CardContent className="p-4 text-center">
                <Mail className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold">{testResponses.completed}</div>
                <div className="text-sm text-muted-foreground">Responses Received</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Top Performers Auto-Scheduled:</h4>
              <div className="space-y-2">
                {[
                  { name: "Sarah Chen", score: 96, meeting: "Tomorrow 2:00 PM" },
                  { name: "Marcus Rodriguez", score: 94, meeting: "Thu 10:00 AM" },
                  { name: "Emma Thompson", score: 92, meeting: "Thu 3:00 PM" },
                  { name: "David Kim", score: 90, meeting: "Fri 11:00 AM" },
                  { name: "Zoe Martinez", score: 89, meeting: "Fri 2:00 PM" }
                ].map((candidate, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <div className="font-medium">{candidate.name}</div>
                      <div className="text-sm text-muted-foreground">Score: {candidate.score}</div>
                    </div>
                    <div className="text-sm text-blue-600">{candidate.meeting}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Assessment Breakdown:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Writing Assessment</span>
                  <Badge variant="secondary">Average: 78</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Speaking Evaluation</span>
                  <Badge variant="secondary">Average: 74</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Technical Skills</span>
                  <Badge variant="secondary">Average: 81</Badge>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Overall Average</span>
                    <Badge>77.6</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={() => window.location.href = '#scheduled'}>
              <Calendar className="h-4 w-4 mr-2" />
              View Scheduled Meetings
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '#candidates'}>
              <Eye className="h-4 w-4 mr-2" />
              Review All Candidates
            </Button>
            <Button variant="outline" onClick={() => setUploadStep("setup")}>
              <Upload className="h-4 w-4 mr-2" />
              Upload More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">AI Assessment Pipeline</h1>
        <p className="text-muted-foreground">
          Upload candidates and let AI handle testing, scoring, and scheduling automatically
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,000</div>
            <p className="text-xs text-muted-foreground">max candidates</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Currently Active</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">being assessed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">test completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      {uploadStep === "setup" && renderSetupStep()}
      {["uploading", "processing", "sending-tests", "waiting-responses", "scoring", "scheduling"].includes(uploadStep) && renderProgressStep()}
      {uploadStep === "complete" && renderCompleteStep()}

      {/* Process Overview */}
      {uploadStep === "setup" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="bg-blue-100 dark:bg-blue-950 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="font-medium">1. Upload & Enrich</h4>
                <p className="text-sm text-muted-foreground">CSV upload → AI enriches with public data</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="bg-green-100 dark:bg-green-950 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="h-6 w-6 text-green-600" />
                </div>
                <h4 className="font-medium">2. Test & Score</h4>
                <p className="text-sm text-muted-foreground">Automated tests → AI scoring → Rankings</p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="bg-purple-100 dark:bg-purple-950 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <h4 className="font-medium">3. Auto-Schedule</h4>
                <p className="text-sm text-muted-foreground">Top 5 get meeting links automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}