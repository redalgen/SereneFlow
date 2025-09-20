'use client';

import { useState } from 'react';
import { Smile, Frown, Meh, Laugh, Annoyed } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Mood = {
  name: string;
  icon: React.ElementType;
};

const moods: Mood[] = [
  { name: 'Joyful', icon: Laugh },
  { name: 'Okay', icon: Smile },
  { name: 'So-so', icon: Meh },
  { name: 'Sad', icon: Frown },
  { name: 'Anxious', icon: Annoyed },
];

export function MoodCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-center sm:justify-around items-center gap-4">
          {moods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => setSelectedMood(mood.name)}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring',
                selectedMood === mood.name
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent/30'
              )}
              aria-pressed={selectedMood === mood.name}
              aria-label={`Select mood: ${mood.name}`}
            >
              <mood.icon className="h-10 w-10" />
              <span className="text-sm font-medium">{mood.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
