import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MoodTagsProps {
  selectedMoods: string[];
  onMoodToggle: (mood: string) => void;
}

const moods = [
  { label: "Relax", emoji: "🧘" },
  { label: "Cinematic", emoji: "🎬" },
  { label: "Energetic", emoji: "⚡" },
  { label: "Emotional", emoji: "💫" },
  { label: "Lo-Fi", emoji: "📻" },
  { label: "Travel", emoji: "✈️" },
  { label: "Focus", emoji: "🎯" },
  { label: "Uplifting", emoji: "🌟" },
  { label: "Mysterious", emoji: "🌙" },
  { label: "Romantic", emoji: "💕" },
  { label: "Adventure", emoji: "🗺️" },
  { label: "Peaceful", emoji: "🕊️" }
];

export const MoodTags = ({ selectedMoods, onMoodToggle }: MoodTagsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground text-center">
        Popular Moods & Vibes
      </h3>
      <div className="flex flex-wrap gap-3 justify-center">
        {moods.map((mood) => {
          const isSelected = selectedMoods.includes(mood.label);
          return (
            <Button
              key={mood.label}
              variant={isSelected ? "default" : "secondary"}
              size="sm"
              onClick={() => onMoodToggle(mood.label)}
              className={`
                transition-all duration-300 hover:scale-105
                ${isSelected 
                  ? 'bg-gradient-primary shadow-glow' 
                  : 'bg-secondary/50 hover:bg-secondary/70'
                }
              `}
            >
              <span className="mr-2">{mood.emoji}</span>
              {mood.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};