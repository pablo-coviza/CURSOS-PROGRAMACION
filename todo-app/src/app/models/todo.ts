export interface Todo {
    id?: number;
    title: string;
    description?: string;  // Campo para descripción detallada
    completed: boolean;
    createdAt?: Date;
    status?: 'pendiente' | 'en progreso' | 'completada' | 'bloqueada';  // Campo para estado detallado
  }