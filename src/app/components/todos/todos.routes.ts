import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoDetailsComponent } from './todo-details/todo-details.component';
import { AddTodoFormComponent } from './add-todo-form/add-todo-form.component';
import { EditTodoFormComponent } from './edit-todo-form/edit-todo-form.component';

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
    pathMatch: "full",
    component: TodoDetailsComponent
  },
  {
    path: ':todoId/edit',
    component: EditTodoFormComponent
  }
];
