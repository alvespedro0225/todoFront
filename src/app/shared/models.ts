import { FormControl } from '@angular/forms';

export interface Todo {
  name: string,
  status: Status,
  createdAt: string,
  updatedAt: string,
  description: string,
  id: number
}

export interface TodoCreate {
  name: string,
  status: Status,
  description: string
}

export interface TodoCreateForm {
  name: FormControl<string>,
  status: FormControl<string | number>,
  description: FormControl<string>
}
export enum Status {
  Todo,
  InProgress,
  Complete
}

export interface cacheData {
  data: any,
  expiration: number,
  creation: number
}

