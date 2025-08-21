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
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-12 pr-24 py-4 text-lg bg-card border-border focus:border-primary/50 focus:ring-primary/30 transition-all duration-300"
          />
          <Button
            type="submit"
            disabled={!query.trim()}
            className="absolute right-2 bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50"
          >
            <Sparkles className="h-4 w-4 mr-2" />
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