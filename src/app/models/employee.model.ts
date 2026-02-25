export interface Employee {
  id: number;
  name: string;
  email: string;
  role: EmployeeRole;
  active: boolean;
}

export enum EmployeeRole {
  SeniorSoftwareEngineer = 'Senior Software Engineer',
  ProductManager = 'Pruduct Manager',
  UXDesigner = 'UX Designer',
  DevOpsEngineer = 'DevOps Engineer',
  MarketingDirector = 'Marketing Director',
  SoftwareEngineer = 'Software Engineer',
  HRManager = 'HR Manager',
  SalesRepresentative = 'Sales Representative',
}
