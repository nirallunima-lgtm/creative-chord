import { MoodCard } from "./MoodCard";
import chillImage from "@/assets/moods/chill.jpg";
import cinematicImage from "@/assets/moods/cinematic.jpg";
import energeticImage from "@/assets/moods/energetic.jpg";
import lofiImage from "@/assets/moods/lofi.jpg";

interface MoodTagsProps {
  selectedMoods: string[];
  onMoodToggle: (mood: string) => void;
}

const moods = [
  { 
    label: "Relax", 
    emoji: "🧘", 
    image: chillImage,
    color: "chill"
  },
  { 
    label: "Cinematic", 
    emoji: "🎬", 
    image: cinematicImage,
    color: "cinematic"
  },
  { 
    label: "Energetic", 
    emoji: "⚡", 
    image: energeticImage,
    color: "energetic"
  },
  { 
    label: "Lo-Fi", 
    emoji: "📻", 
    image: lofiImage,
    color: "lofi"
  },
  { 
    label: "Emotional", 
    emoji: "💫", 
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    color: "emotional"
  },
  { 
    label: "Travel", 
    emoji: "✈️", 
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop&crop=center",
    color: "travel"
  },
  { 
    label: "Focus", 
    emoji: "🎯", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center",
    color: "focus"
  },
  { 
    label: "Uplifting", 
    emoji: "🌟", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    color: "uplifting"
  },
  { 
    label: "Mysterious", 
    emoji: "🌙", 
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=300&fit=crop&crop=center",
    color: "mysterious"
  },
  { 
    label: "Romantic", 
    emoji: "💕", 
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=300&fit=crop&crop=center",
    color: "romantic"
  },
  { 
    label: "Adventure", 
    emoji: "🗺️", 
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop&crop=center",
    color: "adventure"
  },
  { 
    label: "Peaceful", 
    emoji: "🕊️", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center",
    color: "peaceful"
  }
];

export const MoodTags = ({ selectedMoods, onMoodToggle }: MoodTagsProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-3xl font-bold bg-gradient-vibrant bg-clip-text text-transparent">
          Discover Your Vibe
        </h3>
        <p className="text-muted-foreground text-lg">
          Choose the perfect mood for your next video
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {moods.map((mood) => (
          <MoodCard
            key={mood.label}
            mood={mood}
            isSelected={selectedMoods.includes(mood.label)}
            onToggle={onMoodToggle}
          />
        ))}
      </div>
    </div>
  );
};