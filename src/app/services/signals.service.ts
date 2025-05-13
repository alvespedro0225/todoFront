import { Injectable, signal } from '@angular/core';
import { Todo } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class SignalsService {
  constructor() {}

  predicate = signal<(todo: Todo) => boolean>(() => true);
  clickedTodo = signal<Todo | undefined>(undefined);
}
