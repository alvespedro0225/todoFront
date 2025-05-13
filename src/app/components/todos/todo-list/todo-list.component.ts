import { Component, inject, OnInit } from '@angular/core';
import { TodosService } from '../../../services/todos.service';
import { Todo } from '../../../shared/models';
import { FormsModule } from '@angular/forms';
import { SignalsService } from '../../../services/signals.service';
import { LoadingScreenComponent } from '../../../shared/loading-screen/loading-screen.component';
import { TodoListItemComponent } from '../todo-list-item/todo-list-item.component';

@Component({
  selector: 'todo-list',
  imports: [FormsModule, LoadingScreenComponent, TodoListItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {

  private todoClient = inject(TodosService);
  private signals = inject(SignalsService);
  private todos: Todo[] | undefined;
  private predicate = this.signals.predicate;
  private sortStates = [true, true];
  ngOnInit(): void {
    this.todoClient.getTodos().subscribe({
      next: (value) => {
        this.todos = value;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  get visibleTodos() {
    if (!this.todos) return undefined;
    return this.todos.filter(this.predicate().bind(this));
  }

  deleteTodo(todoId: number) {
    this.todoClient.deleteTodo(todoId).subscribe({
      next: () => {
        const index = this.todos!.findIndex((todo) => todo.id === todoId); // deletes from local array to match server state visually
        this.todos!.splice(index, 1);
      },
    });
  }

  sortTodos() {
    this.todos?.sort((todo1, todo2) => {
      if (todo1.status < todo2.status) return -1;
      else if (todo1.status > todo2.status) return 1;

      let firstName = todo1.name.toLowerCase();
      let secondName = todo2.name.toLowerCase();

      if (firstName > secondName) return 1;
      else if (secondName > firstName) return -1;

      return 0;
    });
    if (this.sortStates[0]) this.todos?.reverse();
    this.sortStates[0] = !this.sortStates[0];
  }

}
