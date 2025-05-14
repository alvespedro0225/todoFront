import { Component, inject, input, OnInit, output } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import { Status, Todo } from '../../../shared/models';
import { SignalsService } from '../../../services/signals.service';

@Component({
  selector: 'todo-list-item',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './todo-list-item.component.html',
  styleUrl: './todo-list-item.component.scss',
})
export class TodoListItemComponent {
  protected readonly Status = Status;
  private signals = inject(SignalsService);
  todo = input.required<Todo>();
  deleteTodo = output<number>();

  formatDate(date: string) {
    let dateFormater = new Date(date);
    return dateFormater.toLocaleDateString(undefined, {
      day: "numeric",
      month: "2-digit",
      year: "2-digit"
    })
  }

  onDeleteClicked(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
  clickTodo(todo: Todo) {
    this.signals.clickedTodo.set(todo);
  }
}
