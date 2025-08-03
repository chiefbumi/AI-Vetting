import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { TrendingUp, Users, Star, Clock, FileText, MessageSquare } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const scoreDistribution = [
  { range: "90-100", count: 23, color: "#10b981" },
  { range: "80-89", count: 45, color: "#3b82f6" },
  { range: "70-79", count: 89, color: "#f59e0b" },
  { range: "60-69", count: 67, color: "#ef4444" },
  { range: "50-59", count: 18, color: "#6b7280" },
];

const skillsData = [
  { skill: "React", count: 156 },
  { skill: "Python", count: 134 },
  { skill: "TypeScript", count: 98 },
  { skill: "Node.js", count: 87 },
  { skill: "AWS", count: 76 },
  { skill: "Vue.js", count: 54 },
];

const weeklyTrends = [
  { week: "Week 1", applications: 45, assessed: 42 },
  { week: "Week 2", applications: 67, assessed: 61 },
  { week: "Week 3", applications: 89, assessed: 87 },
  { week: "Week 4", applications: 78, assessed: 76 },
];

export function AnalyticsView() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-muted-foreground">
          Insights into your candidate pipeline and AI assessment performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+23 from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.4</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1 from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.4m from last week</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8 from last week</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>
              How candidates are performing across all assessments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
            <CardDescription>
              Most common skills among candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <div key={skill.skill} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-muted-foreground">{skill.count} candidates</span>
                  </div>
                  <Progress value={(skill.count / 156) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Writing Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">78.2</div>
            <p className="text-sm text-muted-foreground">Average writing score</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Excellent (90+)</span>
                <Badge variant="secondary">34 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Good (70-89)</span>
                <Badge variant="secondary">156 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Needs Work (&lt;70)</span>
                <Badge variant="secondary">152 candidates</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Speaking Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">74.8</div>
            <p className="text-sm text-muted-foreground">Average speaking score</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Clear & Confident</span>
                <Badge variant="secondary">28 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Good Communication</span>
                <Badge variant="secondary">134 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Needs Practice</span>
                <Badge variant="secondary">67 candidates</Badge>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              *113 candidates provided video content
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Technical Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-2xl font-bold">76.1</div>
            <p className="text-sm text-muted-foreground">Average technical score</p>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Expert Level</span>
                <Badge variant="secondary">41 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Proficient</span>
                <Badge variant="secondary">189 candidates</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Learning</span>
                <Badge variant="secondary">112 candidates</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Trends</CardTitle>
          <CardDescription>
            Application volume and assessment completion over the past month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Applications"
              />
              <Line 
                type="monotone" 
                dataKey="assessed" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Assessed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Pipeline Health</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 13.7% of candidates score 85+ overall</li>
                <li>• 62% complete assessments within 24 hours</li>
                <li>• React developers have highest avg. scores</li>
                <li>• Speaking assessments show 89% accuracy</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Recommendations</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Focus sourcing on React/TypeScript roles</li>
                <li>• Encourage video submissions for better assessment</li>
                <li>• Consider lowering technical bar for junior roles</li>
                <li>• Review candidates scoring 80-84 for hidden gems</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}