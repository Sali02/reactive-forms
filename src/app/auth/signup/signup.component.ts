import { Component, DestroyRef, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

function equalValues(controlName1: string, controlName2: string) {

  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;

    if (val1 == val2) {
      return null;
    }

    return {valuesNotEqual: true};
  };

  
}


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  private destroyRef = inject(DestroyRef);

  form = new FormGroup(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),

      passwords: new FormGroup({
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
  
        confirmPassword: new FormControl('', {
          validators: [Validators.required],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),

      

      firstName: new FormControl('', {
        validators: [Validators.required],
      }),

      lastName: new FormControl('', {
        validators: [Validators.required],
      }),

      adress: new FormGroup({
        street: new FormControl('', {
          validators: [Validators.required],
        }),
  
        number: new FormControl('', {
          validators: [Validators.required],
        }),
  
        postalCode: new FormControl('', {
          validators: [Validators.required],
        }),
  
        city: new FormControl('', {
          validators: [Validators.required],
        }),
      }),

      
      role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', {
        validators: [Validators.required]
      }),

      source: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
      ]),

      agree: new FormControl(false, {validators: [Validators.required]})
    },
    
  );

  

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  

  

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted successfully:', this.form.value);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched(); // Mark all fields as touched to display errors
    }
  }

  onReset() {
    this.form.reset();
  }
}

