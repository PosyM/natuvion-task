import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { employeesMock } from '../../mocks/employees.mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // Employees state
  private readonly employees$$ = new BehaviorSubject<Employee[]>(employeesMock);
  employees$ = this.employees$$.asObservable();

  // State to track current sort
  private lastSortColumn: keyof Employee | null = null;
  private lastSortDirection: 'asc' | 'desc' = 'asc';

  // Mock backend sorting function
  sortEmployees(column: keyof Employee): void {
    // 1. Determine direction based on history
    let direction: 'asc' | 'desc' = 'asc';

    if (this.lastSortColumn === column) {
      // Toggle direction if clicking same column
      direction = this.lastSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Reset to ascending for new column
      direction = 'asc';
    }

    // Update sort state
    this.lastSortColumn = column;
    this.lastSortDirection = direction;

    //  Get current values (avoiding mutating original state)
    const currentEmployees = [...this.employees$$.getValue()];

    // Perform the sort
    currentEmployees.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      // Handle String (Name, Email, Role, Avatar)
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      // Handle Number (ID)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Handle Boolean (Active)
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        // false comes before true in 'asc' usually (0 vs 1)
        return direction === 'desc'
          ? valueA === valueB
            ? 0
            : valueA
              ? 1
              : -1
          : valueA === valueB
            ? 0
            : valueA
              ? -1
              : 1;
      }

      return 0;
    });

    // Emit the new sorted array
    this.employees$$.next(currentEmployees);
  }
}
