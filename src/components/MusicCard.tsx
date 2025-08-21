import { useState } from "react";
import { Play, Pause, Heart, Plus, Clock, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
  mood: string[];
  genre: string;
  waveformData?: number[];
}

interface MusicCardProps {
  track: Track;
}

export const MusicCard = ({ track }: MusicCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Generate mock waveform data if not provided
  const waveformBars = track.waveformData || Array.from({ length: 40 }, () => Math.random() * 100 + 20);

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:shadow-hover transition-all duration-300 hover:scale-[1.02]">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
            <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleLike}
              className={`h-8 w-8 p-0 ${isLiked ? 'text-primary' : 'text-muted-foreground'} hover:text-primary`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-primary">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Waveform Visualization */}
        <div className="relative h-16 bg-muted/20 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center gap-0.5 px-2">
            {waveformBars.map((height, index) => (
              <div
                key={index}
                className={`w-1 rounded-sm transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-primary animate-waveform' 
                    : 'bg-muted-foreground/40'
                }`}
                style={{ 
                  height: `${height}%`,
                  animationDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={togglePlay}
              size="sm"
              className="h-10 w-10 rounded-full bg-primary/20 hover:bg-primary/30 backdrop-blur-sm border border-primary/30"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{track.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="h-3 w-3" />
              <span>{track.bpm} BPM</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {track.mood.slice(0, 3).map((mood) => (
            <Badge
              key={mood}
              variant="secondary"
              className="text-xs bg-secondary/50 hover:bg-secondary/70 transition-colors"
            >
              {mood}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="text-xs border-primary/30 text-primary"
          >
            {track.genre}
          </Badge>
        </div>
      </div>
    </Card>
  );
};