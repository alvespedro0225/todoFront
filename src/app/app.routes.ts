import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todos',
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./components/todos/todos.routes').then((r) => r.TODOS_ROUTES),
  },
];
