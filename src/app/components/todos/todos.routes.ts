import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'new',
    component: AddTodoFormComponent,
  },
  {
    path: ':todoId',
    component: TodoDetailsComponent
  }
];
