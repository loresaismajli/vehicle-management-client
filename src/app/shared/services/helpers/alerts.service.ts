import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  showErrorAlert(message?: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message ?? environment.errors.messages.general,
    });
  }

  showSuccessAlert(message?: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  showWarningAlert(message?: string): void {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      text: message,
    });
  }

  showInformationAlert(message?: string): void {
    Swal.fire({
      icon: 'info',
      title: 'Information',
      text: message,
    });
  }
}
