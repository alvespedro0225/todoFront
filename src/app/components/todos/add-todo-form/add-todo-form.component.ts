import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Status, Todo } from '../../../shared/models';
import { TodosService } from '../../../services/todos.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-todo-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-todo-form.component.html',
  styleUrl: './add-todo-form.component.scss',
})
export class AddTodoFormComponent {
  private todoClient = inject(TodosService);
  router = inject(Router);

  todoForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(40),
    ]),
    description: new FormControl('', [Validators.maxLength(400)]),
    status: new FormControl<string | number>(0, [
      Validators.required,
      Validators.min(Status.Todo),
      Validators.max(Status.Complete),
    ]),
  });
  submit() {
    if (this.todoForm.valid) {
      let formStatus = this.todoForm.value.status;
      if (typeof formStatus === 'string') {
        // selects are string by default. this converts it to number
        this.todoForm.value.status = parseInt(formStatus);
      }
      this.todoClient.addTodo(this.todoForm.value as Todo).subscribe({
        next: () => {
          this.router.navigateByUrl!('');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
