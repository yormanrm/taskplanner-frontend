import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  basicAlert(title: string, text: string, icon: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon as SweetAlertIcon
    });
  }

  toastAlert(title: string, icon: string, position: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: position as SweetAlertPosition,
      showConfirmButton: false,
      timer: 2500
    });
    Toast.fire({
      icon: icon as SweetAlertIcon,
      title: title
    });
  }

}
