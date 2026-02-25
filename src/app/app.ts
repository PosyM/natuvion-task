import { Component } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeesService } from './services/employees/employees.service';
import { AsyncPipe } from '@angular/common';
import { Employee } from './models/employee.model';
import { Observable } from 'rxjs';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { Button } from 'flowbite-angular/button';
import { EmployeeListFilterComponent } from './components/employee-list-filter/employee-list-filter.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  imports: [
    EmployeeListComponent,
    AsyncPipe,
    ToolbarComponent,
    EmployeeListFilterComponent,
    Button,
    EmployeeFormComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly employees$: Observable<Employee[]>;

  constructor(
    private employeesService: EmployeesService,
    private modalService: ModalService,
  ) {
    this.employees$ = this.employeesService.employees$;
  }

  sortTable(column: keyof Employee): void {
    this.employeesService.sortEmployees(column);
  }

  filterTable(data: unknown): void {
    console.log('filter Table, data:', data);
  }

  openCreateFormModal(): void {
    this.modalService.open();
  }

  openEditFormModal(employee: Employee): void {
    this.modalService.open(employee);
  }

  onEmployeeFormSubmit(FormData: Employee | Omit<Employee, 'id'>): void {
    if ('id' in FormData) {
      this.employeesService.updateEmployee(FormData);
    }
    if (!('id' in FormData)) {
      this.employeesService.addEmployee(FormData);
    }
  }

  deleteEmployees(employees: number[]): void {
    this.employeesService.deleteEmployee(employees);
  }
}
