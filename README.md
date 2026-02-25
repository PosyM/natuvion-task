# Natuvion

This repository contains the implementation of the employee management task, built with Angular.

## 1. Selected Angular Version and Reasoning

**Version:** Angular 17+ 

**Reasoning:**
- **Standalone Components:** Removes `NgModule` boilerplate, simplifying the application structure and speeding up development.
- **Control Flow Syntax:** Utilizes the new syntax (`@if`, `@for`) instead of legacy directives (`*ngIf`, `*ngFor`) for better readability and performance.
- **Performance:** The newer build system (esbuild/vite) provides faster start-up times and smaller bundle sizes.

## 2. Selected UI Library and Dependencies

**Main CSS Framework:** **Tailwind CSS**
- **Reason:** Utility-first approach allows for rapid styling directly in HTML without switching files. It provides a consistent design system and is extremely lightweight in production (removes unused CSS).

**Component Library:** **Flowbite** (headless/minimal JS)
- **Reason:** Used for interactive elements like Modals, Badge statuses, and form elements. These are fully compatible with Tailwind but do not burden the application like Angular Material.

## 3. Component Structure Proposal

The application is designed with an emphasis on **Smart/Dumb (Container/Presentational)** architecture and **Service-based communication**.

### Core Components
- **`AppComponent`**: The main layout shell containing the Header and `router-outlet`.
- **`HeaderComponent`**: Contains the logo and theme toggle (Dark/Light mode).
- **`ModalComponent`**: A global wrapper for modal windows. It is placed at the application root and controlled via a service (`ModalService`), allowing windows to be opened from any part of the application without prop-drilling.

### Feature:
- **`EmployeeListComponent` (Smart)**:
  - Responsible for loading data via `EmployeesService`.
  - Manages the state of the list (loading, error, data).
  - Reacts to events emitted by child components (filter changes, edit actions).

- **`EmployeeFilterComponent` (Dumb)**:
  - Pure presentational component.
  - Displays search inputs and status dropdowns.
  - Emits filter values to the parent (`@Output() filterChange`).

- **`EmployeeTableComponent` (Dumb)**:
  - Receives the list of employees as input (`@Input() employees`).
  - Handles sorting logic visually and emits sort events.
  - Emits actions like "Edit" or "Delete" to the parent (`@Output() edit`, `@Output() delete`).

- **`EmployeeFormComponent` (Smart)**:
  - Form for adding/editing an employee.
  - Displayed dynamically inside `ModalComponent`.
  - Uses Reactive Forms for validation and handles the save logic directly with the service.

### Services
- **`EmployeesService`**: State management for employee data (Observable streams).
- **`ModalService`**: Controls the visibility and content of modal windows.
