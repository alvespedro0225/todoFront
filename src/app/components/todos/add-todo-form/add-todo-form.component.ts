import { Component, inject } from '@angular/core';
import { TodoFormComponent } from '../../../shared/todo-form/todo-form.component';
import { TodoCreate, TodoCreateForm } from '../../../shared/models';
import { TodosService } from '../../../services/todos.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { TodoFormService } from '../../../services/todo-form.service';

@Component({
  selector: 'add-todo-form',
  imports: [TodoFormComponent],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss',
})
export class AddTodoFormComponent {
  private todoClient = inject(TodosService);
  router = inject(Router);
  formHelper = inject(TodoFormService);

  todoForm: FormGroup<TodoCreateForm> = this.formHelper.defaultForm;
  submit() {
    if (this.todoForm.valid) {
      let formStatus = this.todoForm.value.status;
      if (typeof formStatus === 'string') {
        // selects are string by default. this converts it to number
        this.todoForm.value.status = parseInt(formStatus);
      }
      this.todoClient
        .addTodo(this.todoForm.value as TodoCreate)
        .subscribe(this.formHelper.getDefaultSubscription(this.router));
    }
  }
}
