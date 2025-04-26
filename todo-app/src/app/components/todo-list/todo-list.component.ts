import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  template: `
    <div class="todo-list">
      <h2>Mis Tareas</h2>
      <div *ngIf="todos.length === 0" class="empty-list">
        ¡No hay tareas pendientes!
      </div>
      <app-todo-item
        *ngFor="let todo of todos"
        [todo]="todo"
        (toggle)="toggleTodo($event)"
        (delete)="deleteTodo($event)"
      ></app-todo-item>
    </div>
  `,
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  toggleTodo(id: number): void {
    this.todoService.toggleTodo(id);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }
}