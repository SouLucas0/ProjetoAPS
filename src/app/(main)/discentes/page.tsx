'use client';

import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DiscentesPage() {
  const students = [
    'Lucas Emanuel Nogueira da Silva',
    'Maria Karoline Firmino de Moura',
    'Amanda Cristina Alencar Gomes',
    'Renan Lucas Melo de Oliveira',
  ];

  return (
    <>
      <PageHeader title="Projeto de APS" description="Discentes:" />
      <Card>
        <CardHeader>
          <CardTitle>Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {students.map((student, index) => (
              <li key={index} className="text-base font-medium">
                {student}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
