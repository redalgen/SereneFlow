import { MoodCheckIn } from '@/components/mood-check-in';
import { TaskBreakdown } from '@/components/task-breakdown';
import { AffirmationsFeed } from '@/components/affirmations-feed';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="py-12 px-4 md:px-8 text-center bg-primary/10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary-foreground">
          Welcome to SereneFlow
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
          Your calming companion for a balanced mind. Gently navigate your day,
          one serene step at a time.
        </p>
      </header>
      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-12">
          <MoodCheckIn />
          <AffirmationsFeed />
          <TaskBreakdown />
        </div>
      </main>
      <footer className="text-center py-6 text-muted-foreground text-sm">
        <p>Created with care for your well-being.</p>
        <p>&copy; {new Date().getFullYear()} SereneFlow. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
