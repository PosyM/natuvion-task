import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Employee } from '../../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private openModalSource = new Subject<{ data?: any }>();
  openModal$ = this.openModalSource.asObservable();

  private closeModalSource = new Subject<void>();
  closeModal$ = this.closeModalSource.asObservable();

  open(data?: Employee) {
    this.openModalSource.next({ data });
  }

  close() {
    this.closeModalSource.next();
  }
}
