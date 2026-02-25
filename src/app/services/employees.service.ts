import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { employeesMock } from '../mocks/employees.mock';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private readonly employees$$ = new BehaviorSubject<Employee[]>(employeesMock);
  employees$ = this.employees$$.asObservable();

  public sortEmployees(column: keyof Employee): void {}
}
