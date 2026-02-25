import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { employeesMock } from '../../mocks/employees.mock';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nat-employee-list',
  imports: [NgClass],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  @Input() employees: Employee[] | null = employeesMock;
  @Output() sortTable = new EventEmitter<keyof Employee>();

  onColumnHeaderClick(column: keyof Employee): void {
    this.sortTable.emit(column);
  }
}
