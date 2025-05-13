import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor() {}

  private httpClient: HttpClient = inject(HttpClient);
  private local: boolean = false;
  private readonly API: string = 'http://localhost:5000/todos';
  private id: number = 0;
  private headers = new HttpHeaders({
    accept: 'application/json',
  });

  todos: Todo[] = [];
  getTodos(): Observable<Todo[]> {
    // if (this.local) {
    //   return of(this.todos);
    // } else {
    let headers = this.headers.set('Cache-Control', 'private, max-age=3600');
    return this.httpClient.get<Todo[]>(`${this.API}`, {
      headers: headers,
    });
    // }
  }

  addTodo(newTodo: Todo): Observable<Todo> {
    // if (this.local) {
    //   if (this.todos.findIndex((todo) => todo.name === newTodo.name) != -1) {
    //     const err = new Error('Name already used');
    //     alert(err);
    //     throw err;
    //   }
    //   newTodo.id = ++this.id;
    //   this.todos.push(newTodo);
    //   return of(newTodo);
    // } else {
    return this.httpClient.post<Todo>(`${this.API}`, newTodo);
    // }
  }

  deleteTodo(todoId: number): Observable<void> {
    // if (this.local) {
    //   let index = this.todos.findIndex((item) => item.id === todoId);
    //   this.todos.splice(index, 1);
    //   return of();
    // } else {
    this.httpClient.delete(`${this.API}`).subscribe(); // unsafe method to /todos in order to destroy cache
    return this.httpClient.delete<void>(`${this.API}/${todoId}`);
    // }
  }

  getTodo(todoId: number) {
    return this.httpClient.get<Todo>(`${this.API}/${todoId}`);
  }
}
