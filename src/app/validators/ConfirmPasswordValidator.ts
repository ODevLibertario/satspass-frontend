import { AbstractControl, ValidatorFn } from '@angular/forms';

export function confirmPasswordValidator(newPasswordFieldName: string, confirmPasswordFieldName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const newPassword = control.get(newPasswordFieldName);
    const confirmPassword = control.get(confirmPasswordFieldName);

    if (!newPassword || !confirmPassword) {
      return null; // Return null if controls are not initialized yet
    }

    // Check if passwords do not match
    if (newPassword.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null; // Return null if validation is successful
  };
}
