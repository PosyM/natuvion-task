import { Employee, EmployeeRole } from '../models/employee.model';

export const employeesMock: Employee[] = [
  {
    id: 1,
    name: 'Sarah johnson',
    role: EmployeeRole.SeniorSoftwareEngineer,
    email: 'sarah.johnson@company.com',
    active: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: EmployeeRole.ProductManager,
    email: 'michael.chen@company.com',
    active: true,
  },
  {
    id: 3,
    name: 'Emily Rodriquez',
    role: EmployeeRole.UXDesigner,
    email: 'emily.rodriquez@company.com',
    active: true,
  },
  {
    id: 4,
    name: 'James Williams',
    role: EmployeeRole.DevOpsEngineer,
    email: 'sarah.johnson@company.com',
    active: false,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    role: EmployeeRole.MarketingDirector,
    email: 'lisa.anderson@company.com',
    active: true,
  },
  {
    id: 6,
    name: 'David Kim',
    role: EmployeeRole.SoftwareEngineer,
    email: 'david.kim@company.com',
    active: true,
  },
  {
    id: 7,
    name: 'Amanda Taylor',
    role: EmployeeRole.HRManager,
    email: 'amanda.taylor@company.com',
    active: true,
  },
  {
    id: 8,
    name: 'Robert Martinez',
    role: EmployeeRole.SalesRepresentative,
    email: 'robert.martinez@company.com',
    active: false,
  },
];
