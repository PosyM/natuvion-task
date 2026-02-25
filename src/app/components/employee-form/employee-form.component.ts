import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal/modal.service';
import { NgpDialogManager } from 'ng-primitives/dialog';
import { CommonModule } from '@angular/common';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from 'flowbite-angular/modal';
import { Button } from 'flowbite-angular/button';
import { FormControl, FormField, Label } from 'flowbite-angular/form';
import { Employee, EmployeeRole } from '../../models/employee.model';

@Component({
  selector: 'nat-employee-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Button,
    FormControl,
    FormField,
    Label,
  ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employeeForm: FormGroup;
  isEditMode = false;
  roles = Object.values(EmployeeRole);
  @Output() onFormSubmit = new EventEmitter<Employee | Omit<Employee, 'id'>>();

  // Grabs the <ng-template #dialog> from the HTML
  public readonly dialogTemplate = viewChild('dialog', { read: TemplateRef<unknown> });

  private openSub!: Subscription;
  private closeSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private ngpDialogManager: NgpDialogManager,
  ) {
    this.employeeForm = this.fb.group({
      id: [null],
      name: [''],
      email: [''],
      role: [''],
      active: [true],
    });
  }

  ngOnInit() {
    // Listen for requests to open the modal
    this.openSub = this.modalService.openModal$.subscribe((state) => {
      if (state.data) {
        this.isEditMode = true;
        this.employeeForm.patchValue(state.data);
      } else {
        this.isEditMode = false;
        this.employeeForm.reset();
      }

      // Open the modal template
      const template = this.dialogTemplate();
      if (template) {
        this.ngpDialogManager.open(template);
      }
    });

    // Listen for requests to close the modal
    this.closeSub = this.modalService.closeModal$.subscribe(() => {
      this.ngpDialogManager.closeAll();
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.getRawValue();

      // Check if we have a valid ID (Edit)
      if (formValue.id) {
        // Emit as full Employee (with ID)
        this.onFormSubmit.emit(formValue);
      } else {
        // Create: Destructure to remove 'id' entirely
        const { id, ...newEmployee } = formValue;

        // Emit as Omit<Employee, 'id'>
        this.onFormSubmit.emit(newEmployee);
      }

      // Close modal after saving
      this.modalService.close();
    }
  }

  ngOnDestroy() {
    if (this.openSub) this.openSub.unsubscribe();
    if (this.closeSub) this.closeSub.unsubscribe();
  }
}
