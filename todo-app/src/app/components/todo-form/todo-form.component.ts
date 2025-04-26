// src/app/components/todo-form/todo-form.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="todo-form">
      <div class="form-main">
        <input
          type="text"
          [(ngModel)]="todoTitle"
          placeholder="¿Qué necesitas hacer?"
          (keyup.enter)="showOptions ? null : addTodo()"
        />
        <button (click)="addTodo()">Añadir</button>
      </div>

      <div class="form-options" *ngIf="showOptions">
        <div class="form-group">
          <label>Descripción:</label>
          <textarea
            [(ngModel)]="todoDescription"
            placeholder="Añade detalles sobre la tarea..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Estado inicial:</label>
          <select [(ngModel)]="todoStatus">
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="bloqueada">Bloqueada</option>
          </select>
        </div>

        <div class="form-actions">
          <button
            type="button"
            class="cancel-btn"
            (click)="cancelOptions()">
            Cancelar
          </button>
          <button
            type="button"
            class="add-with-options-btn"
            (click)="addTodo()">
            Añadir tarea
          </button>
        </div>
      </div>

      <button
        *ngIf="!showOptions"
        type="button"
        class="toggle-options-btn"
        (click)="showOptions = true">
        Añadir detalles
      </button>
    </div>
  `,
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  todoTitle = '';
  todoDescription = '';
  todoStatus: 'pendiente' | 'en progreso' | 'bloqueada' = 'pendiente';
  showOptions = false;

  constructor(private todoService: TodoService) {}

  addTodo(): void {
    if (this.todoTitle.trim()) {
      this.todoService.addTodo(this.todoTitle, this.todoDescription, this.todoStatus);
      this.resetForm();
    }
  }

  cancelOptions(): void {
    this.showOptions = false;
    this.todoDescription = '';
    this.todoStatus = 'pendiente';
  }

  resetForm(): void {
    this.todoTitle = '';
    this.todoDescription = '';
    this.todoStatus = 'pendiente';
    this.showOptions = false;
  }
}