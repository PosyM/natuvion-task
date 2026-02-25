import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { employeesMock } from '../../mocks/employees.mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  //  Raw Data Source
  private readonly _allEmployees$ = new BehaviorSubject<Employee[]>(employeesMock);

  //  Search Filter Source
  private readonly _searchTerm$ = new BehaviorSubject<string>('');

  //  Combined Stream
  readonly employees$ = combineLatest([this._allEmployees$, this._searchTerm$]).pipe(
    map(([employees, term]) => {
      if (!term) return employees;

      const lowerTerm = term.toLowerCase();
      return employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(lowerTerm) ||
          emp.email.toLowerCase().includes(lowerTerm) ||
          emp.role.toLowerCase().includes(lowerTerm),
      );
    }),
  );

  // Methods to update state
  setSearchTerm(term: string) {
    this._searchTerm$.next(term);
  }

  /**
   * Adds a new employee to the list.
   * Generates a new ID based on the max existing ID.
   */
  addEmployee(employee: Omit<Employee, 'id'>) {
    const current = this._allEmployees$.getValue();
    const newId = current.length ? Math.max(...current.map((e) => e.id)) + 1 : 1;
    this._allEmployees$.next([...current, { ...employee, id: newId }]);
  }

  /**
   * Updates an existing employee by ID.
   */
  updateEmployee(updatedEmployee: Employee) {
    const current = this._allEmployees$.getValue();
    const index = current.findIndex((e) => e.id === updatedEmployee.id);
    if (index !== -1) {
      const updated = [...current];
      updated[index] = updatedEmployee;
      this._allEmployees$.next(updated);
    }
  }

  /**
   * Deletes an employee by ID.
   */
  deleteEmployee(id: number) {
    const current = this._allEmployees$.getValue();
    this._allEmployees$.next(current.filter((e) => e.id !== id));
  }

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
    const currentEmployees = [...this._allEmployees$.getValue()];

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
    this._allEmployees$.next(currentEmployees);
  }
}
