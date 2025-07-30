import { type Task } from './types';
import { subDays, addDays, formatISO } from 'date-fns';

const today = new Date();

export const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Completar Tarefa de Matemática',
    description: 'Capítulo 5, exercícios 1-20. Foco em equações algébricas.',
    dueDate: formatISO(addDays(today, 2)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Escrever Redação de História',
    description: 'Redação sobre o impacto da Revolução Industrial na sociedade. 1500 palavras.',
    dueDate: formatISO(addDays(today, 5)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '3',
    title: 'Preparar para o Laboratório de Física',
    description: 'Ler o manual do laboratório e preparar o relatório pré-laboratório sobre ótica.',
    dueDate: formatISO(addDays(today, 1)),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '4',
    title: 'Estudar para o Quiz de Química',
    description: 'Revisar os capítulos 3 e 4 sobre ligação química e reações.',
    dueDate: formatISO(addDays(today, 3)),
    priority: 'medium',
    status: 'pending',
  },
  {
    id: '5',
    title: 'Ler Romance de Literatura',
    description: 'Ler os capítulos 1-5 de "O Sol é para Todos".',
    dueDate: formatISO(addDays(today, 7)),
    priority: 'low',
    status: 'pending',
  },
  {
    id: '6',
    title: 'Revisar Vocabulário de Francês',
    description: 'Repassar a nova lista de vocabulário para a próxima prova.',
    dueDate: formatISO(addDays(today, 0)),
    priority: 'high',
    status: 'pending',
  },
  {
    id: '7',
    title: 'Entregar Relatório de Biologia',
    description: 'Entrega final do relatório sobre respiração celular.',
    dueDate: formatISO(subDays(today, 2)),
    priority: 'high',
    status: 'completed',
    completionDate: formatISO(subDays(today, 3)),
  },
  {
    id: '8',
    title: 'Planejamento de Projeto em Grupo',
    description: 'Reunir com o grupo do projeto para atribuir funções e definir prazos.',
    dueDate: formatISO(subDays(today, 5)),
    priority: 'medium',
    status: 'completed',
    completionDate: formatISO(subDays(today, 5)),
  },
  {
    id: '9',
    title: 'Praticar Violão',
    description: 'Aprender os novos acordes da música "Wonderwall".',
    dueDate: formatISO(subDays(today, 10)),
    priority: 'low',
    status: 'completed',
    completionDate: formatISO(subDays(today, 10)),
  },
];
