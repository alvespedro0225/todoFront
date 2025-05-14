import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status, Todo, TodoCreateForm } from '../shared/models';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoFormService {
  getDefaultSubscription(router: Router) {
    return {
      next: (response: HttpResponse<Todo>) => {
        const newTodoUrl = response.headers.get('location');
        if (newTodoUrl == null) {
          router.navigateByUrl('').catch((err) => console.log(err));
        }

        router.navigateByUrl(`${newTodoUrl}`).catch(() => {
          router.navigateByUrl('').catch((err) => console.log(err));
        });
      },
      error: (err: Error) => {
        console.log(err);
      },
    };
  }
  constructor() {}

  get defaultForm(): FormGroup<TodoCreateForm> {
    return new FormGroup({
      name: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40),
        ],
        nonNullable: true,
      }),
      description: new FormControl<string>('', {
        validators: [Validators.maxLength(400)],
        nonNullable: true,
      }),
      status: new FormControl<string | number>(0, {
        validators: [
          Validators.required,
          Validators.min(Status.Todo),
          Validators.max(Status.Complete),
        ],
        nonNullable: true,
      }),
    });
  }
}
