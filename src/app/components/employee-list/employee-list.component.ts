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
  @Output() deleteSelected = new EventEmitter<number[]>();

  selectedIds = new Set<number>();

  // Handle checkbox toggle
  toggleSelection(id: number, event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedIds.add(id);
    } else {
      this.selectedIds.delete(id);
    }
  }

  onColumnHeaderClick(column: keyof Employee): void {
    this.sortTable.emit(column);
  }

  onEditActionClick(employee: Employee): void {
    this.editAction.emit(employee);
  }

  // Emit selected IDs for deletion
  onDeleteSelected(): void {
    if (this.selectedIds.size > 0) {
      this.deleteSelected.emit(Array.from(this.selectedIds));
      // Reset selection after delete
      this.selectedIds.clear();
    }
  }
}
