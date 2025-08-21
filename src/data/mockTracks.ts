export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  bpm: number;
  mood: string[];
  genre: string;
}

export const mockTracks: Track[] = [
  {
    id: "1",
    title: "Rainy Day Contemplation",
    artist: "Ambient Collective",
    duration: "2:34",
    bpm: 75,
    mood: ["Relax", "Peaceful", "Lo-Fi"],
    genre: "Ambient"
  },
  {
    id: "2", 
    title: "Epic Mountain Journey",
    artist: "Cinematic Orchestra",
    duration: "3:45",
    bpm: 120,
    mood: ["Cinematic", "Adventure", "Uplifting"],
    genre: "Orchestral"
  },
  {
    id: "3",
    title: "Soft Piano Dreams",
    artist: "Minimal Keys",
    duration: "4:12",
    bpm: 60,
    mood: ["Emotional", "Peaceful", "Romantic"],
    genre: "Piano"
  },
  {
    id: "4",
    title: "Urban Energy Flow",
    artist: "Electronic Vibes",
    duration: "3:21",
    bpm: 128,
    mood: ["Energetic", "Focus", "Uplifting"],
    genre: "Electronic"
  },
  {
    id: "5",
    title: "Mystic Forest Walk",
    artist: "Nature Sounds Co",
    duration: "5:18",
    bpm: 85,
    mood: ["Mysterious", "Peaceful", "Cinematic"],
    genre: "Ambient"
  },
  {
    id: "6",
    title: "Coffee Shop Vibes",
    artist: "Lo-Fi Collective", 
    duration: "2:56",
    bpm: 90,
    mood: ["Lo-Fi", "Relax", "Focus"],
    genre: "Lo-Fi Hip Hop"
  },
  {
    id: "7",
    title: "Sunset Drive",
    artist: "Indie Roads",
    duration: "4:03",
    bpm: 110,
    mood: ["Travel", "Emotional", "Uplifting"],
    genre: "Indie Rock"
  },
  {
    id: "8",
    title: "Meditation Space",
    artist: "Zen Studios",
    duration: "6:30",
    bpm: 50,
    mood: ["Peaceful", "Relax", "Focus"],
    genre: "Meditation"
  },
  {
    id: "9",
    title: "Action Hero Theme",
    artist: "Epic Scores",
    duration: "2:45",
    bpm: 140,
    mood: ["Cinematic", "Energetic", "Adventure"],
    genre: "Film Score"
  },
  {
    id: "10",
    title: "Nostalgic Summer",
    artist: "Retro Waves",
    duration: "3:33",
    bpm: 105,
    mood: ["Emotional", "Romantic", "Uplifting"],
    genre: "Synthwave"
  }
];