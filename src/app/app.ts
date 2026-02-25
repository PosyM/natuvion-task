import { Component } from '@angular/core';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeesService } from './services/employees.service';
import { AsyncPipe } from '@angular/common';
import { Employee } from './models/employee.model';
import { Observable } from 'rxjs';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@Component({
  selector: 'app-root',
  imports: [EmployeeListComponent, AsyncPipe, ToolbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly employees$: Observable<Employee[]>;

  constructor(private employeesService: EmployeesService) {
    this.employees$ = this.employeesService.employees$;
  }
}
