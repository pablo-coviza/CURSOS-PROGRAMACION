// src/app/services/todo.service.ts
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private platformId = inject(PLATFORM_ID);
  private selectedTodoSubject = new BehaviorSubject<Todo | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
        this.todosSubject.next([...this.todos]);
      }
    }
  }

  getTodos(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  getSelectedTodo(): Observable<Todo | null> {
    return this.selectedTodoSubject.asObservable();
  }

  selectTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id) || null;
    this.selectedTodoSubject.next(todo);
  }

  clearSelectedTodo(): void {
    this.selectedTodoSubject.next(null);
  }

  addTodo(title: string, description: string = '', status: string = 'pendiente'): void {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      status: status as 'pendiente' | 'en progreso' | 'completada' | 'bloqueada',
      createdAt: new Date()
    };

    this.todos.push(newTodo);
    this.todosSubject.next([...this.todos]);
    this.saveTodos();
  }

  updateTodoDetails(id: number, updates: Partial<Todo>): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    this.todosSubject.next([...this.todos]);
    this.saveTodos();

    // Actualizar el todo seleccionado si está siendo editado
    if (this.selectedTodoSubject.value?.id === id) {
      const updatedTodo = this.todos.find(t => t.id === id) || null;
      this.selectedTodoSubject.next(updatedTodo);
    }
  }

  toggleTodo(id: number): void {
    this.todos = this.todos.map(todo =>
      todo.id === id ? {
        ...todo,
        completed: !todo.completed,
        status: !todo.completed ? 'completada' : 'pendiente'
      } : todo
    );
    this.todosSubject.next([...this.todos]);
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next([...this.todos]);
    this.saveTodos();

    // Si el todo eliminado era el seleccionado, limpiar la selección
    if (this.selectedTodoSubject.value?.id === id) {
      this.selectedTodoSubject.next(null);
    }
  }

  private saveTodos(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  }
}