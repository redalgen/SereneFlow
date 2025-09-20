'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Sparkles, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getAffirmationAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        'Generating...'
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" /> Generate Affirmation
        </>
      )}
    </Button>
  );
}

export function AffirmationsFeed() {
  const { toast } = useToast();
  const initialState = {
    affirmation: 'Your daily dose of encouragement will appear here.',
    error: undefined,
    formErrors: undefined,
  };
  const [state, formAction] = useFormState(getAffirmationAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: state.error,
      });
    }
  }, [state.error, toast]);

  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          Your Personal Cheerleader
        </CardTitle>
        <CardDescription>
          Get an AI-powered affirmation tailored to you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form action={formAction} className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="mood">Your current mood</Label>
            <Input
              type="text"
              id="mood"
              name="mood"
              placeholder="e.g., a bit stressed"
            />
            {state?.formErrors?.mood && (
              <p className="text-sm font-medium text-destructive">
                {state.formErrors.mood.join(', ')}
              </p>
            )}
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="goals">Your goals for today</Label>
            <Textarea
              placeholder="e.g., finish a project report"
              id="goals"
              name="goals"
            />
             {state?.formErrors?.goals && (
              <p className="text-sm font-medium text-destructive">
                {state.formErrors.goals.join(', ')}
              </p>
            )}
          </div>
          <SubmitButton />
        </form>
        <div className="bg-primary/20 p-6 rounded-lg text-center space-y-4 border border-primary/30">
          <Quote className="h-8 w-8 mx-auto text-primary-foreground/80" />
          <p className="text-lg font-medium text-primary-foreground">
            {state.affirmation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
