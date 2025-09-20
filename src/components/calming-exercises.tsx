import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Exercise = {
  id: string;
  title: string;
  duration: string;
  description: string;
  image: {
    url: string;
    hint: string;
  };
};

const exercises: Exercise[] = PlaceHolderImages.map((p) => ({
    id: p.id,
    title: p.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    duration: p.id.includes('breathing') ? '5 min' : (p.id.includes('scan') ? '10 min' : '15 min'),
    description: p.description,
    image: {
        url: p.imageUrl,
        hint: p.imageHint,
    }
}));


export function CalmingExercises() {
  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Find Your Calm</CardTitle>
        <CardDescription>
          Short, guided exercises for anxiety relief.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 md:grid-cols-3">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="group relative overflow-hidden rounded-lg cursor-pointer"
          >
            <Image
              src={exercise.image.url}
              alt={exercise.title}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint={exercise.image.hint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <Badge variant="secondary" className="w-fit mb-2">
                {exercise.duration}
              </Badge>
              <h3 className="text-lg font-bold font-headline">
                {exercise.title}
              </h3>
              <p className="text-sm text-white/90">{exercise.description}</p>
              <PlayCircle className="absolute top-4 right-4 h-8 w-8 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
