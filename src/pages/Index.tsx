import { useState, useMemo } from "react";
import { Sparkles, Music, Headphones, Heart } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { MoodTags } from "@/components/MoodTags";
import { MusicCard } from "@/components/MusicCard";
import { mockTracks, Track } from "@/data/mockTracks";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  const handleMoodToggle = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) 
        ? prev.filter(m => m !== mood)
        : [...prev, mood]
    );
    setHasSearched(true);
  };

  // Filter tracks based on search query and selected moods
  const filteredTracks = useMemo(() => {
    let tracks = mockTracks;

    if (selectedMoods.length > 0) {
      tracks = tracks.filter(track => 
        selectedMoods.some(mood => track.mood.includes(mood))
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      tracks = tracks.filter(track =>
        track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query) ||
        track.genre.toLowerCase().includes(query) ||
        track.mood.some(mood => mood.toLowerCase().includes(query))
      );
    }

    return tracks;
  }, [searchQuery, selectedMoods]);

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative container mx-auto px-4 py-24 text-center z-10">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center gap-4 mb-12 animate-fade-in">
              <div className="p-4 bg-gradient-primary rounded-2xl shadow-vibrant animate-glow-pulse">
                <Music className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent">
                TuneScript
              </h1>
            </div>

            {/* Hero Text */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-6xl md:text-7xl font-bold leading-tight">
                <span className="text-white">Find the </span>
                <span className="bg-gradient-vibrant bg-clip-text text-transparent animate-glow-pulse">
                  perfect music
                </span>
                <br />
                <span className="text-white/90">for your </span>
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                  story
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Describe the mood, scene, or vibe in natural language and discover 
                the ideal background music for your video projects instantly.
              </p>
            </div>

            {/* Search Bar */}
            <div className="pt-12 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <SearchBar 
                onSearch={handleSearch}
                placeholder="✨ soft lo-fi for a rainy day vlog..."
              />
            </div>

            {/* Enhanced Stats */}
            <div className="flex items-center justify-center gap-12 pt-12 text-white/70 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <Headphones className="h-6 w-6" />
                </div>
                <span className="text-lg font-medium">10,000+ Tracks</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300">
                  <Heart className="h-6 w-6" />
                </div>
                <span className="text-lg font-medium">Loved by Creators</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="p-3 bg-white/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-lg font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Tags Section */}
      <section className="container mx-auto px-4 py-16">
        <MoodTags 
          selectedMoods={selectedMoods}
          onMoodToggle={handleMoodToggle}
        />
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="container mx-auto px-4 pb-20">
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-semibold text-white">
                {filteredTracks.length > 0 
                  ? `Found ${filteredTracks.length} perfect tracks`
                  : "Hmm, looks like silence is golden—but let's try another vibe!"
                }
              </h3>
              {searchQuery && (
                <p className="text-muted-foreground">
                  Results for: <span className="text-primary font-medium">"{searchQuery}"</span>
                </p>
              )}
              {selectedMoods.length > 0 && (
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <span className="text-muted-foreground">Filtered by:</span>
                  {selectedMoods.map(mood => (
                    <Button
                      key={mood}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleMoodToggle(mood)}
                      className="bg-secondary/50 hover:bg-secondary/70"
                    >
                      {mood} ×
                    </Button>
                  ))}
                </div>
              )}
            </div>

            {/* Music Grid */}
            {filteredTracks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTracks.map(track => (
                  <div key={track.id} className="animate-fade-in">
                    <MusicCard track={track} />
                  </div>
                ))}
              </div>
            )}

            {/* No Results State */}
            {filteredTracks.length === 0 && hasSearched && (
              <div className="text-center py-16 space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Music className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-medium text-white">
                    No tracks found for that vibe
                  </h4>
                  <p className="text-muted-foreground">
                    Try different keywords or explore our popular moods above
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedMoods([]);
                    setHasSearched(false);
                  }}
                  className="border-primary/30 text-primary hover:bg-primary/10"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Default State - Show Popular Tracks */}
      {!hasSearched && (
        <section className="container mx-auto px-4 pb-20">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Popular with Creators
              </h3>
              <p className="text-muted-foreground">
                Trending tracks that video creators love
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTracks.slice(0, 6).map(track => (
                <div key={track.id} className="animate-fade-in">
                  <MusicCard track={track} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;