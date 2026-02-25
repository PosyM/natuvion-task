export interface Employee {
  id: number;
  name: string;
  email: string;
  role: EmployeeRole;
  avatar: string;
  active: boolean;
}

export enum EmployeeRole {
  SeniorSoftwareEngineer = 'Senior Software Engineer',
  PruductManager = 'Pruduct Manager',
  UXDesigner = 'UX Designer',
  DevOpsEngineer = 'DevOps Engineer',
  MarketingDirector = 'Marketing Director',
  SoftwareEngineer = 'Software Engineer',
  HRManager = 'HR Manager',
  SalesRepresentative = 'Sales Representative',
}
