import { useState } from "react";
import { CandidateCard } from "./CandidateCard";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Filter, Grid, List, SortAsc } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

// Mock data - candidates generated from simple name/contact input
const mockCandidates = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.chen@email.com", // Enriched from contact info
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=32&h=32&fit=crop&crop=face",
    overallScore: 92,
    writingScore: 88, // Generated from LinkedIn profile analysis
    speakingScore: 95, // Generated from public speaking content
    technicalScore: 93, // Generated from GitHub/portfolio analysis
    tags: ["React", "TypeScript", "Senior", "Remote"], // AI-generated from online presence
    reactions: 12,
    comments: 5,
    isShortlisted: true,
    appliedAt: "2 days ago"
  },
  {
    id: "2",
    name: "Marcus Rodriguez",
    email: "marcus.rodriguez@email.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    overallScore: 89,
    writingScore: 91,
    speakingScore: 85,
    technicalScore: 91,
    tags: ["Python", "ML", "PhD", "Full-time"],
    reactions: 8,
    comments: 3,
    isShortlisted: false,
    appliedAt: "1 day ago"
  },
  {
    id: "3",
    name: "Emily Johnson",
    email: "emily.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    overallScore: 85,
    writingScore: 87,
    speakingScore: 82,
    technicalScore: 86,
    tags: ["Vue.js", "Node.js", "Mid-level", "Hybrid"],
    reactions: 6,
    comments: 2,
    isShortlisted: true,
    appliedAt: "3 days ago"
  },
  {
    id: "4",
    name: "David Kim",
    email: "david.kim@email.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    overallScore: 78,
    writingScore: 75,
    speakingScore: 80,
    technicalScore: 79,
    tags: ["Java", "Spring", "Junior", "On-site"],
    reactions: 4,
    comments: 1,
    isShortlisted: false,
    appliedAt: "1 week ago"
  },
  {
    id: "5",
    name: "Anna Kowalski",
    email: "anna.kowalski@email.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
    overallScore: 94,
    writingScore: 96,
    speakingScore: 91,
    technicalScore: 95,
    tags: ["Angular", "C#", "Senior", "Remote"],
    reactions: 15,
    comments: 8,
    isShortlisted: true,
    appliedAt: "5 days ago"
  },
  {
    id: "6",
    name: "James Wilson",
    email: "james.wilson@email.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    overallScore: 81,
    writingScore: 83,
    speakingScore: 78,
    technicalScore: 82,
    tags: ["PHP", "Laravel", "Mid-level", "Full-time"],
    reactions: 7,
    comments: 3,
    isShortlisted: false,
    appliedAt: "4 days ago"
  }
];

export function CandidatesView() {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [sortBy, setSortBy] = useState("overall");
  const [filterBy, setFilterBy] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleToggleShortlist = (id: string) => {
    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id
          ? { ...candidate, isShortlisted: !candidate.isShortlisted }
          : candidate
      )
    );
  };

  const handleViewDetails = (id: string) => {
    console.log("View details for candidate:", id);
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    switch (sortBy) {
      case "overall":
        return b.overallScore - a.overallScore;
      case "writing":
        return b.writingScore - a.writingScore;
      case "speaking":
        return b.speakingScore - a.speakingScore;
      case "technical":
        return b.technicalScore - a.technicalScore;
      case "recent":
        return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
      default:
        return 0;
    }
  });

  const filteredCandidates = sortedCandidates.filter(candidate => {
    switch (filterBy) {
      case "shortlisted":
        return candidate.isShortlisted;
      case "high-score":
        return candidate.overallScore >= 85;
      case "recent":
        return candidate.appliedAt.includes("day");
      default:
        return true;
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Candidates</h1>
          <p className="text-muted-foreground">
            {filteredCandidates.length} of {candidates.length} candidates
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex border border-border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("overall")}>
                Overall Score
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("writing")}>
                Writing Score
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("speaking")}>
                Speaking Score
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("technical")}>
                Technical Score
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most Recent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterBy("all")}>
                All Candidates
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterBy("shortlisted")}>
                Shortlisted
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterBy("high-score")}>
                High Scores (85+)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterBy("recent")}>
                Recent Applications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
          React Developers
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
          Senior Level
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
          Remote OK
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
          Score 90+
        </Badge>
      </div>

      {/* Candidates Grid */}
      <div className={
        viewMode === "grid" 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onToggleShortlist={handleToggleShortlist}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No candidates match your current filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => setFilterBy("all")}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}