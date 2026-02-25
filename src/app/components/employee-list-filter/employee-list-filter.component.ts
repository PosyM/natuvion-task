import { Component } from '@angular/core';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  selector: 'nat-employee-list-filter',
  imports: [],
  templateUrl: './employee-list-filter.component.html',
  styleUrl: './employee-list-filter.component.scss',
})
export class EmployeeListFilterComponent {
  constructor(private employeeService: EmployeesService) {}

  onSearch(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.employeeService.setSearchTerm(term);
  }
}
