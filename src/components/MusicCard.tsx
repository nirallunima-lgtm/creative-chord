import { useState, useEffect } from "react";
import { Play, Pause, Heart, Plus, Clock, Music, Volume2 } from "lucide-react";
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
  const [playProgress, setPlayProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  // Simulate play progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress(prev => prev >= 100 ? 0 : prev + 0.5);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Enhanced waveform data - more realistic looking
  const waveformBars = track.waveformData || Array.from({ length: 60 }, (_, i) => {
    const base = Math.sin(i * 0.2) * 30 + 50;
    const noise = Math.random() * 40;
    return Math.max(15, Math.min(95, base + noise));
  });

  const currentBar = Math.floor((playProgress / 100) * waveformBars.length);

  return (
    <Card className="group relative overflow-hidden bg-gradient-card border-border hover:shadow-hover transition-all duration-500 hover:scale-[1.03] cursor-pointer">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate mb-1">{track.title}</h3>
            <p className="text-sm text-muted-foreground/80 truncate">{track.artist}</p>
          </div>
          <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                toggleLike();
              }}
              className={`h-9 w-9 p-0 rounded-full transition-all duration-300 ${
                isLiked 
                  ? 'text-pink-500 bg-pink-500/10 hover:bg-pink-500/20' 
                  : 'text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10'
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={(e) => e.stopPropagation()}
              className="h-9 w-9 p-0 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Waveform Visualization */}
        <div 
          className="relative h-20 bg-muted/10 rounded-xl overflow-hidden cursor-pointer group/waveform"
          onClick={togglePlay}
        >
          {/* Background glow when playing */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse" />
          )}
          
          {/* Waveform bars */}
          <div className="absolute inset-0 flex items-end justify-center gap-0.5 px-4 py-2">
            {waveformBars.map((height, index) => {
              const isActive = isPlaying && index <= currentBar;
              const isUpcoming = index <= currentBar + 5;
              
              return (
                <div
                  key={index}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-primary shadow-sm' 
                      : isPlaying && isUpcoming
                      ? 'bg-primary/60'
                      : 'bg-muted-foreground/30 group-hover/waveform:bg-muted-foreground/50'
                  }`}
                  style={{ 
                    height: `${height}%`,
                    animationDelay: isPlaying ? `${index * 0.05}s` : '0s'
                  }}
                />
              );
            })}
          </div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              size="lg"
              className={`h-12 w-12 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-primary/90 hover:bg-primary shadow-lg scale-110'
                  : 'bg-primary/70 hover:bg-primary/90 group-hover/waveform:scale-110'
              } backdrop-blur-sm border-2 border-white/20`}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-white" />
              ) : (
                <Play className="h-5 w-5 text-white ml-0.5" />
              )}
            </Button>
          </div>

          {/* Progress indicator */}
          {isPlaying && (
            <div 
              className="absolute bottom-0 left-0 h-1 bg-primary/80 transition-all duration-100"
              style={{ width: `${playProgress}%` }}
            />
          )}
        </div>

        {/* Enhanced Metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="font-medium">{track.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Volume2 className="h-4 w-4" />
              <span className="font-medium">{track.bpm} BPM</span>
            </div>
          </div>
        </div>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2">
          {track.mood.slice(0, 3).map((mood, index) => (
            <Badge
              key={mood}
              variant="secondary"
              className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                index === 0 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {mood}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="text-xs px-3 py-1 rounded-full border-primary/40 text-primary/90 font-medium hover:bg-primary/10 transition-all duration-300"
          >
            {track.genre}
          </Badge>
        </div>
      </div>
    </Card>
  );
};