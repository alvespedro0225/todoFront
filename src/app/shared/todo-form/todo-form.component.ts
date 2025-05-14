import { Component, input, output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TodoCreateForm } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  todoForm = input.required<FormGroup<TodoCreateForm>>();
  cancelLink = input('/todos');
  onSubmit = output<void>();
}
