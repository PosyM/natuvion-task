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

  // State to track sorting
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

      // Handle String (Name, Email, Role)
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }

      // Handle Number (ID)
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return direction === 'asc' ? valueA - valueB : valueB - valueA;
      }

      // Handle Boolean (Active)
      if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
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

  /**
   * Adds a new employee to the list.
   * Generates a new ID based on the max existing ID.
   */
  addEmployee(employee: Omit<Employee, 'id'>): void {
    const currentEmployees = this.employees$$.getValue();

    // Generate new ID (Mock backend logic)
    const newId =
      currentEmployees.length > 0 ? Math.max(...currentEmployees.map((e) => e.id)) + 1 : 1;

    const newEmployee: Employee = { ...employee, id: newId };

    // Update state immutably
    this.employees$$.next([...currentEmployees, newEmployee]);
  }

  /**
   * Updates an existing employee by ID.
   */
  updateEmployee(updatedEmployee: Employee): void {
    const currentEmployees = this.employees$$.getValue();

    const newEmployees = currentEmployees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp,
    );

    this.employees$$.next(newEmployees);
  }

  /**
   * Deletes an employee by ID.
   */
  deleteEmployee(id: number): void {
    const currentEmployees = this.employees$$.getValue();

    const filteredEmployees = currentEmployees.filter((emp) => emp.id !== id);

    this.employees$$.next(filteredEmployees);
  }
}
