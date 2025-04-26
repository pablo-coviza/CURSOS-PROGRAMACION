import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoListComponent, TodoDetailComponent],
  template: `
    <div class="container">
      <div class="app-title">
        <div class="app-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <line x1="9" y1="12" x2="15" y2="12"></line>
            <line x1="9" y1="16" x2="15" y2="16"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
          </svg>
        </div>
        <h1>Mi Lista de Tareas</h1>
      </div>
      <app-todo-form></app-todo-form>
      <app-todo-list></app-todo-list>
      <app-todo-detail></app-todo-detail>
      <div class="app-footer">
        Desarrollado con Angular - {{currentYear}}
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo-app';  // Asegúrate que el título sea exactamente 'todo-app'
  currentYear = new Date().getFullYear();
}