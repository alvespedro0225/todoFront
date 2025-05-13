import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignalsService } from '../../../services/signals.service';

@Component({
  selector: 'todo-filters',
  imports: [FormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
})
export class FiltersComponent {
  filterText: string = '';
  filterStatus: string = '3';
  signals = inject(SignalsService);

  updateFilter() {
    const filterAsNumber = parseInt(this.filterStatus, 10);
    if (filterAsNumber >= 0 && filterAsNumber <= 2) {
      this.signals.predicate.set(
        (todo) =>
          todo.name.includes(this.filterText) && todo.status === filterAsNumber,
      );
    } else {
      this.signals.predicate.set((todo) => todo.name.includes(this.filterText));
    }
  }
}
