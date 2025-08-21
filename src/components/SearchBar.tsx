import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ onSearch, placeholder = "Describe your perfect track..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestions = [
    "soft lo-fi for a rainy day vlog",
    "epic cinematic background for travel",
    "calm piano music for meditation",
    "upbeat electronic for workout videos",
    "acoustic guitar for storytelling"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-vibrant rounded-xl opacity-0 group-hover:opacity-30 group-focus-within:opacity-40 transition-all duration-500 blur-md" />
        <div className="relative flex items-center backdrop-blur-sm">
          <Search className="absolute left-6 h-6 w-6 text-white/60 group-focus-within:text-primary transition-colors duration-300" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-16 pr-32 py-6 text-lg bg-card/80 backdrop-blur-md border-border/50 focus:border-primary/60 focus:ring-primary/40 transition-all duration-500 rounded-xl text-white placeholder:text-white/50"
          />
          <Button
            type="submit"
            disabled={!query.trim()}
            className="absolute right-3 bg-gradient-primary hover:shadow-vibrant transition-all duration-500 disabled:opacity-50 px-6 py-3 rounded-lg font-semibold"
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Find Music
          </Button>
        </div>
      </form>
      
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery(suggestion);
              onSearch(suggestion);
            }}
            className="text-xs text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
          >
            "{suggestion}"
          </Button>
        ))}
      </div>
    </div>
  );
};