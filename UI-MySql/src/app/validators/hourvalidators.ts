import { AbstractControl, ValidatorFn } from '@angular/forms';
export function nonNegativeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const value = parseFloat(control.value);
        if (control.value === null || control.value === '') return null;
        return value >= 0 ? null : { negativeValue: true };
    };
}
