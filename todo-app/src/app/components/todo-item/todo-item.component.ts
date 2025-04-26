// src/app/components/todo-item/todo-item.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="todo-item"
         [class.completed]="todo.completed"
         [class.status-bloqueada]="todo.status === 'bloqueada'"
         [class.status-progreso]="todo.status === 'en progreso'">
      <input
        type="checkbox"
        [checked]="todo.completed"
        (change)="onToggle()"
      />
      <div class="todo-content" (click)="showDetails()">
        <span class="title">{{ todo.title }}</span>
        <div class="todo-info">
          <span class="status-badge" *ngIf="todo.status !== 'pendiente'">
            {{ getStatusLabel(todo.status) }}
          </span>
          <span class="has-description" *ngIf="todo.description">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </span>
        </div>
      </div>
      <button class="delete-btn" (click)="onDelete()">×</button>
    </div>
  `,
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private todoService: TodoService) {}

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  showDetails(): void {
    if (this.todo.id) {
      this.todoService.selectTodo(this.todo.id);
    }
  }

  getStatusLabel(status?: string): string {
    switch(status) {
      case 'en progreso': return 'En progreso';
      case 'completada': return 'Completada';
      case 'bloqueada': return 'Bloqueada';
      default: return 'Pendiente';
    }
  }
}