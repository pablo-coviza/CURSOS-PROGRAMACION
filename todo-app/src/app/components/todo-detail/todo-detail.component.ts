// src/app/components/todo-detail/todo-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-detail" *ngIf="selectedTodo">
      <div class="detail-header">
        <h3>Detalles de la tarea</h3>
        <button class="close-btn" (click)="closeDetail()">×</button>
      </div>

      <div class="detail-form">
        <div class="form-group">
          <label>Título:</label>
          <input type="text" [(ngModel)]="editedTodo.title" placeholder="Título de la tarea">
        </div>

        <div class="form-group">
          <label>Descripción:</label>
          <textarea
            [(ngModel)]="editedTodo.description"
            placeholder="Añade una descripción detallada..."
            rows="4"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Estado:</label>
          <select [(ngModel)]="editedTodo.status">
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="completada">Completada</option>
            <option value="bloqueada">Bloqueada</option>
          </select>
        </div>

        <div class="form-group">
          <label>Creada el:</label>
          <div class="date-display">
            {{ selectedTodo.createdAt | date:'medium' }}
          </div>
        </div>

        <div class="detail-actions">
          <button class="save-btn" (click)="saveChanges()">Guardar cambios</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  selectedTodo: Todo | null = null;
  editedTodo: Partial<Todo> = {};

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getSelectedTodo().subscribe(todo => {
      this.selectedTodo = todo;
      if (todo) {
        this.editedTodo = { ...todo };
      } else {
        this.editedTodo = {};
      }
    });
  }

  saveChanges(): void {
    if (this.selectedTodo && this.selectedTodo.id) {
      this.todoService.updateTodoDetails(this.selectedTodo.id, this.editedTodo);
    }
  }

  closeDetail(): void {
    this.todoService.clearSelectedTodo();
  }
}