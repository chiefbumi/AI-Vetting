import { useState, useEffect } from "react";
import { DashboardLayout } from "./components/DashboardLayout";
import { CandidatesView } from "./components/CandidatesView";
import { UploadView } from "./components/UploadView";
import { MyJobsView } from "./components/MyJobsView";
import { ScheduledView } from "./components/ScheduledView";
import { AnalyticsView } from "./components/AnalyticsView";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";
import { Label } from "./components/ui/label";

function SettingsView() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your AI vetting platform preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <p className="text-sm text-muted-foreground">
                TechCorp Inc.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Admin Email</Label>
              <p className="text-sm text-muted-foreground">
                admin@techcorp.com
              </p>
            </div>
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>New candidate uploads</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Assessment completion</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>High-score alerts</Label>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              AI Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Minimum Score Threshold</Label>
              <p className="text-sm text-muted-foreground">
                Currently set to 70
              </p>
            </div>
            <div className="space-y-2">
              <Label>Assessment Model</Label>
              <p className="text-sm text-muted-foreground">
                GPT-4 Enhanced
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configure AI
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Storage Used</Label>
              <p className="text-sm text-muted-foreground">
                342 of 1,000 candidates
              </p>
            </div>
            <div className="space-y-2">
              <Label>Data Retention</Label>
              <p className="text-sm text-muted-foreground">
                12 months
              </p>
            </div>
            <Button variant="outline" size="sm">
              Export Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("candidates");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  // Enable dark theme for black background
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
    setActiveTab("scheduled");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "candidates":
        return <CandidatesView />;
      case "upload":
        return <UploadView />;
      case "jobs":
        return <MyJobsView onJobSelect={handleJobSelect} />;
      case "scheduled":
        return <ScheduledView selectedJob={selectedJob} onClearJob={() => setSelectedJob(null)} />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      default:
        return <CandidatesView />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
}