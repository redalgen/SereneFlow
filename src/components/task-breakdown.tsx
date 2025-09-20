'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type Goal = {
  id: number;
  title: string;
  tasks: Task[];
};

export function TaskBreakdown() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [newTaskTexts, setNewTaskTexts] = useState<Record<number, string>>({});

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), title: newGoal, tasks: [] }]);
      setNewGoal('');
    }
  };

  const deleteGoal = (goalId: number) => {
    setGoals(goals.filter((g) => g.id !== goalId));
  };

  const addTask = (goalId: number) => {
    const taskText = newTaskTexts[goalId];
    if (taskText && taskText.trim()) {
      const updatedGoals = goals.map((g) =>
        g.id === goalId
          ? {
              ...g,
              tasks: [
                ...g.tasks,
                { id: Date.now(), text: taskText, completed: false },
              ],
            }
          : g
      );
      setGoals(updatedGoals);
      setNewTaskTexts({ ...newTaskTexts, [goalId]: '' });
    }
  };

  const toggleTask = (goalId: number, taskId: number) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? {
            ...g,
            tasks: g.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          }
        : g
    );
    setGoals(updatedGoals);
  };

  const deleteTask = (goalId: number, taskId: number) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId
        ? { ...g, tasks: g.tasks.filter((t) => t.id !== taskId) }
        : g
    );
    setGoals(updatedGoals);
  };

  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Break It Down</CardTitle>
        <CardDescription>
          Turn big goals into small, manageable steps.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={addGoal} className="flex gap-2 mb-6">
          <Input
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="What's a big goal on your mind?"
            aria-label="New goal title"
          />
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" /> Add Goal
          </Button>
        </form>

        <Accordion type="multiple" className="w-full space-y-4">
          {goals.map((goal) => (
            <AccordionItem
              key={goal.id}
              value={`goal-${goal.id}`}
              className="bg-background rounded-lg border"
            >
              <AccordionTrigger className="p-4 font-medium hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="text-left">{goal.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteGoal(goal.id);
                    }}
                    aria-label={`Delete goal: ${goal.title}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4 border-t">
                <div className="space-y-4">
                  {goal.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 group"
                    >
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(goal.id, task.id)}
                        aria-labelledby={`task-label-${task.id}`}
                      />
                      <Label
                        htmlFor={`task-${task.id}`}
                        id={`task-label-${task.id}`}
                        className={cn(
                          'flex-grow cursor-pointer',
                          task.completed &&
                            'line-through text-muted-foreground'
                        )}
                      >
                        {task.text}
                      </Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(goal.id, task.id)}
                        aria-label={`Delete task: ${task.text}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-2 pt-4">
                    <Input
                      value={newTaskTexts[goal.id] || ''}
                      onChange={(e) =>
                        setNewTaskTexts({
                          ...newTaskTexts,
                          [goal.id]: e.target.value,
                        })
                      }
                      onKeyDown={(e) =>
                        e.key === 'Enter' && addTask(goal.id)
                      }
                      placeholder="Add a small step..."
                      aria-label={`New task for goal: ${goal.title}`}
                    />
                    <Button onClick={() => addTask(goal.id)} size="sm">
                      Add Step
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {goals.length === 0 && (
          <p className="text-center text-muted-foreground mt-4">
            Add a goal to get started.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
