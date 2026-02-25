import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nat-employee-list-filter',
  imports: [],
  templateUrl: './employee-list-filter.component.html',
  styleUrl: './employee-list-filter.component.scss',
})
export class EmployeeListFilterComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.search.emit(term);
  }
}
