import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { FiltersComponent } from '../filters/filters.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'todo-home',
  imports: [FormsModule, TodoListComponent, FiltersComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
