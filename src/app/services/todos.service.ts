import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo, TodoCreate } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  private httpClient: HttpClient = inject(HttpClient);
  private readonly API: string = 'http://localhost:5000/todos';

  todos: Todo[] = [];
  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${this.API}`);
  }

  addTodo(newTodo: TodoCreate) {
    return this.httpClient.post<Todo>(`${this.API}`, newTodo, {
      observe: 'response',
    });
  }

  deleteTodo(todoId: number): Observable<void> {
    this.httpClient.delete(`${this.API}`).subscribe(); // unsafe method to /todos in order to destroy cache
    return this.httpClient.delete<void>(`${this.API}/${todoId}`);
  }

  getTodo(todoId: number) {
    return this.httpClient.get<Todo>(`${this.API}/${todoId}`);
  }

  updateTodo(todo: Todo) {
    this.httpClient.delete(`${this.API}`).subscribe(); // unsafe method to /todos in order to destroy cache
    return this.httpClient.put<Todo>(`${this.API}/${todo.id}`, todo, {
      observe: 'response',
    });
  }
}
