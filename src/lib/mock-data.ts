import { type Task } from './types';
import { subDays, addDays, formatISO } from 'date-fns';

const today = new Date();

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    description: 'Chapter 5, exercises 1-20. Focus on algebraic equations.',
    dueDate: formatISO(addDays(today, 2)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Write History Essay',
    description: 'Essay on the impact of the Industrial Revolution on society. 1500 words.',
    dueDate: formatISO(addDays(today, 5)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Prepare for Physics Lab',
    description: 'Read the lab manual and prepare the pre-lab report on optics.',
    dueDate: formatISO(addDays(today, 1)),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Study for Chemistry Quiz',
    description: 'Review chapters 3 and 4 on chemical bonding and reactions.',
    dueDate: formatISO(addDays(today, 3)),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Read Literature Novel',
    description: 'Read chapters 1-5 of "To Kill a Mockingbird".',
    dueDate: formatISO(addDays(today, 7)),
    priority: 'low',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Review French Vocabulary',
    description: 'Go over the new vocabulary list for the upcoming test.',
    dueDate: formatISO(addDays(today, 0)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '7',
    title: 'Submit Biology Report',
    description: 'Final submission of the report on cellular respiration.',
    dueDate: formatISO(subDays(today, 2)),
    priority: 'high',
    status: 'completed',
    completionDate: formatISO(subDays(today, 3)),
  },
  {
    id: '8',
    title: 'Group Project Planning',
    description: 'Meet with the project group to assign roles and set deadlines.',
    dueDate: formatISO(subDays(today, 5)),
    priority: 'medium',
    status: 'completed',
    completionDate: formatISO(subDays(today, 5)),
  },
  {
    id: '9',
    title: 'Practice Guitar',
    description: 'Learn the new chords for the song "Wonderwall".',
    dueDate: formatISO(subDays(today, 10)),
    priority: 'low',
    status: 'completed',
    completionDate: formatISO(subDays(today, 10)),
  },
];
