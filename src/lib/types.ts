
export type Aluno = {
  id: string;
  nome: string;
  email: string;
};

export type Tarefa = {
  id: string;
  titulo: string;
  descricao: string;
  dataEntrega: string; // Date as ISO string
  prioridade: 'baixa' | 'media' | 'alta';
  status: 'pendente' | 'concluida';
  dataConclusao?: string; // Date as ISO string
};

export type Historico = {
  tarefasConcluidas: Tarefa[];
  dataVisualizacao: string; // Date as ISO string
};

export type Alerta = {
  id: string;
  tipo: 'vencimento' | 'atrasada';
  mensagem: string;
  prazo: string; // Date as ISO string
  visualizado: boolean;
};

export type Notificacao = {
  id: string;
  tipo: 'email' | 'push';
  canal: string;
  frequencia: 'diaria' | 'semanal' | 'nunca';
};

// Form data types
export type LoginFormData = {
  email: string;
  password: string
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string
}
