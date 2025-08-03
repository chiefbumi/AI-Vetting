import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Star } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";

interface Candidate {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  overallScore: number;
  writingScore: number;
  speakingScore: number;
  technicalScore: number;
  tags: string[];
  reactions: number;
  comments: number;
  isShortlisted: boolean;
  appliedAt: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  onToggleShortlist: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function CandidateCard({ candidate, onToggleShortlist, onViewDetails }: CandidateCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onViewDetails(candidate.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={candidate.avatar} />
              <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="font-medium">{candidate.name}</h3>
              <p className="text-sm text-muted-foreground">{candidate.email}</p>
              <p className="text-xs text-muted-foreground">Applied {candidate.appliedAt}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full ${getScoreBg(candidate.overallScore)}`}>
              <span className={`text-sm font-medium ${getScoreColor(candidate.overallScore)}`}>
                {candidate.overallScore}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Test Scores */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Writing</span>
            <span className="text-sm font-medium">{candidate.writingScore}%</span>
          </div>
          <Progress value={candidate.writingScore} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Speaking</span>
            <span className="text-sm font-medium">{candidate.speakingScore}%</span>
          </div>
          <Progress value={candidate.speakingScore} className="h-2" />
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Technical</span>
            <span className="text-sm font-medium">{candidate.technicalScore}%</span>
          </div>
          <Progress value={candidate.technicalScore} className="h-2" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {candidate.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Collaboration Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <Heart className="h-4 w-4 mr-1" />
              {candidate.reactions}
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-4 w-4 mr-1" />
              {candidate.comments}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleShortlist(candidate.id);
            }}
            className={candidate.isShortlisted ? "text-yellow-600" : "text-muted-foreground"}
          >
            <Bookmark className={`h-4 w-4 ${candidate.isShortlisted ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}