import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormInitializerService {

  constructor(private fb: FormBuilder) { }

  initLoginForm(): FormGroup {
    return this.fb.group({
      email: new FormControl<string>('', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  initUserForm(): FormGroup {
    return this.fb.group({
      id: new FormControl<number | null>(null),
      firstname: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      lastname: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      email: new FormControl<string>('', {
        validators: [
          Validators.required, Validators.email
        ]
      }),
      password: new FormControl<string>('', {
        validators: [
          Validators.required
        ]
      }),
      dateCreated: new FormControl<number | null>(null),
      dateUpdated: new FormControl<number | null>(null),
    });
  }

}
