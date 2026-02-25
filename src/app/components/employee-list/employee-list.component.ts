import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Table, TableBody, TableHead } from 'flowbite-angular/table';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nat-employee-list',
  imports: [Table, NgClass, TableBody, TableHead],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Output() sortTable = new EventEmitter<keyof Employee>();
  @Output() editAction = new EventEmitter<Employee>();

  onColumnHeaderClick(column: keyof Employee): void {
    this.sortTable.emit(column);
  }

  onEditActionClick(employee: Employee): void {
    this.editAction.emit(employee);
  }
}
