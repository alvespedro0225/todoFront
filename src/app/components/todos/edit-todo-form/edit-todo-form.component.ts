import { Component, inject, input, OnInit } from '@angular/core';
import { TodoFormComponent } from '../../../shared/todo-form/todo-form.component';
import { TodosService } from '../../../services/todos.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, Todo, TodoCreate, TodoCreateForm } from '../../../shared/models';
import { LoadingScreenComponent } from '../../../shared/loading-screen/loading-screen.component';
import { SignalsService } from '../../../services/signals.service';
import { TodoFormService } from '../../../services/todo-form.service';

@Component({
  selector: 'edit-todo-form',
  imports: [TodoFormComponent, LoadingScreenComponent],
  templateUrl: './edit-todo-form.component.html',
  styleUrl: './edit-todo-form.component.scss',
})
export class EditTodoFormComponent implements OnInit {
  private todoClient = inject(TodosService);
  todoId = input.required<number>();
  signals = inject(SignalsService);
  formHelper = inject(TodoFormService);
  router = inject(Router);
  todo: Todo | undefined;

  todoForm = this.formHelper.defaultForm;
  submit() {
    if (this.todoForm.valid) {
      const todo = this.todo! // won't render if undefined
      let newStatus = this.todoForm.value.status;
      if (typeof newStatus === 'string') {
        // selects are string by default. this converts it to number
        newStatus = parseInt(newStatus);
        this.todoForm.value.status = newStatus;
      }
      let updatedInfo = this.todoForm.value as TodoCreate;
      todo.name = updatedInfo.name;
      todo.status = updatedInfo.status;
      todo.description = updatedInfo.description;
      this.todoClient
        .updateTodo(todo)
        .subscribe(this.formHelper.getDefaultSubscription(this.router));
    }
  }
  ngOnInit(): void {
    let oldTodo = this.signals.clickedTodo();

    if (oldTodo == null) {
      this.todoClient.getTodo(this.todoId()).subscribe({
        next: (todo) => {
          oldTodo = todo;
          this.todoForm.setValue({
            name: oldTodo.name,
            description: oldTodo.description,
            status: oldTodo.status,
          });
          this.todo = oldTodo;
        },
        error: (err) => console.log(err),
      });
      return;
    }

    this.todoForm.setValue({
      name: oldTodo.name,
      description: oldTodo.description,
      status: oldTodo.status,
    });
    this.todo = oldTodo;
  }
}
