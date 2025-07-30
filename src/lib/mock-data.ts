import { type Tarefa } from './types';
import { subDays, addDays, formatISO } from 'date-fns';

const today = new Date();

export const MOCK_TASKS: Tarefa[] = [
  {
    id: '1',
    titulo: 'Completar Tarefa de Matemática',
    descricao: 'Capítulo 5, exercícios 1-20. Foco em equações algébricas.',
    dataEntrega: formatISO(addDays(today, 2)),
    prioridade: 'alta',
    status: 'pendente',
  },
  {
    id: '2',
    titulo: 'Escrever Redação de História',
    descricao: 'Redação sobre o impacto da Revolução Industrial na sociedade. 1500 palavras.',
    dataEntrega: formatISO(addDays(today, 5)),
    prioridade: 'alta',
    status: 'pendente',
  },
  {
    id: '3',
    titulo: 'Preparar para o Laboratório de Física',
    descricao: 'Ler o manual do laboratório e preparar o relatório pré-laboratório sobre ótica.',
    dataEntrega: formatISO(addDays(today, 1)),
    prioridade: 'media',
    status: 'pendente',
  },
  {
    id: '4',
    titulo: 'Estudar para o Quiz de Química',
    descricao: 'Revisar os capítulos 3 e 4 sobre ligação química e reações.',
    dataEntrega: formatISO(addDays(today, 3)),
    prioridade: 'media',
    status: 'pendente',
  },
  {
    id: '5',
    titulo: 'Ler Romance de Literatura',
    descricao: 'Ler os capítulos 1-5 de "O Sol é para Todos".',
    dataEntrega: formatISO(addDays(today, 7)),
    prioridade: 'baixa',
    status: 'pendente',
  },
  {
    id: '6',
    titulo: 'Concluir Projeto de APS',
    descricao: 'O projeto deve demonstrar a aplicação prática dos conceitos de modelagem orientada a objetos e o uso de ferramentas de IA para geração de código a partir de diagramas.',
    dataEntrega: formatISO(today),
    prioridade: 'alta',
    status: 'pendente',
  },
  {
    id: '7',
    titulo: 'Entregar Relatório de Biologia',
    descricao: 'Entrega final do relatório sobre respiração celular.',
    dataEntrega: formatISO(subDays(today, 2)),
    prioridade: 'alta',
    status: 'concluida',
    dataConclusao: formatISO(subDays(today, 3)),
  },
  {
    id: '8',
    titulo: 'Planejamento de Projeto em Grupo',
    descricao: 'Reunir com o grupo do projeto para atribuir funções e definir prazos.',
    dataEntrega: formatISO(subDays(today, 5)),
    prioridade: 'media',
    status: 'concluida',
    dataConclusao: formatISO(subDays(today, 5)),
  },
  {
    id: '9',
    titulo: 'Praticar Violão',
    descricao: 'Aprender os novos acordes da música "Wonderwall".',
    dataEntrega: formatISO(subDays(today, 10)),
    prioridade: 'baixa',
    status: 'concluida',
    dataConclusao: formatISO(subDays(today, 10)),
  },
];
