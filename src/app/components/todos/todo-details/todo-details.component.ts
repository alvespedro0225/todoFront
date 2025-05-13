import { Component, inject, input, OnInit } from '@angular/core';
import { Status, Todo } from '../../../shared/models';
import { SignalsService } from '../../../services/signals.service';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todo-details',
  imports: [],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.scss',
})
export class TodoDetailsComponent implements OnInit {
  private signals = inject(SignalsService);
  private todosClient = inject(TodosService);
  protected readonly Status = Status;
  todoId = input.required<number>(); // id from route
  todo?: Todo;

  ngOnInit(): void {
    // saves the request if the user gets to the page through an anchor by using
    // the value of the clicked todo as a signal
    const clickedTodo = this.signals.clickedTodo();
    if (clickedTodo == null) {
      this.todosClient.getTodo(this.todoId()).subscribe({
        next: todo => {
          this.todo = todo;
        }
      });
      return;
    }

    this.todo = clickedTodo;
    this.signals.clickedTodo.set(undefined);
  }
}
