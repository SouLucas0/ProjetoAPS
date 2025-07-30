'use client';

import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
  useCallback,
} from 'react';
import { type Tarefa } from '@/lib/types';
import { MOCK_TASKS } from '@/lib/mock-data';

type TasksContextType = {
  tasks: Tarefa[];
  addTask: (task: Tarefa) => void;
  updateTask: (taskId: string, updatedTask: Tarefa) => void;
  deleteTask: (taskId: string) => void;
  loading: boolean;
};

export const TasksContext = createContext<TasksContextType>({
  tasks: [],
  addTask: () => {},
  updateTask: () => {},
  deleteTask: () => {},
  loading: true,
});

export const useTasks = () => useContext(TasksContext);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTasks(MOCK_TASKS);
    setLoading(false);
  }, []);

  const addTask = useCallback((task: Tarefa) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  }, []);

  const updateTask = useCallback((taskId: string, updatedTask: Tarefa) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TasksContext.Provider>
  );
}
