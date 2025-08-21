import { Button } from "@/components/ui/button";

interface MoodCardProps {
  mood: {
    label: string;
    emoji: string;
    image: string;
    color: string;
  };
  isSelected: boolean;
  onToggle: (mood: string) => void;
}

export const MoodCard = ({ mood, isSelected, onToggle }: MoodCardProps) => {
  return (
    <Button
      onClick={() => onToggle(mood.label)}
      className={`
        relative overflow-hidden h-32 w-full rounded-2xl transition-all duration-500 hover:scale-105 group
        ${isSelected 
          ? 'ring-4 ring-primary shadow-hover scale-105' 
          : 'hover:shadow-card'
        }
      `}
      style={{ 
        backgroundImage: `url(${mood.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Gradient Overlay */}
      <div className={`
        absolute inset-0 transition-all duration-500
        ${isSelected
          ? 'bg-gradient-to-br from-black/30 via-transparent to-primary/30'
          : 'bg-gradient-to-br from-black/40 via-black/20 to-transparent group-hover:from-black/30'
        }
      `} />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 text-left">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl drop-shadow-lg">{mood.emoji}</span>
          {isSelected && (
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
          )}
        </div>
        <h3 className={`
          font-bold text-lg text-white drop-shadow-2xl transition-all duration-300
          ${isSelected ? 'text-primary-glow' : 'group-hover:text-white'}
        `}>
          {mood.label}
        </h3>
      </div>

      {/* Hover Glow Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
        bg-gradient-to-br from-primary/50 to-accent/50 blur-xl
        ${isSelected ? 'opacity-30' : ''}
      `} />
    </Button>
  );
};