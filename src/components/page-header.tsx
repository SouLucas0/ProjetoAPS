import { cn } from '@/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

export function PageHeader({ title, description, children, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8', className)} {...props}>
      <div className="grid gap-1">
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
