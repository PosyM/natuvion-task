import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { employeesMock } from '../../mocks/employees.mock';

@Component({
  selector: 'nat-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList {
  @Input() employees: Employee[] = employeesMock;
}
