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
