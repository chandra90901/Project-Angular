import { AbstractControl, ValidatorFn } from '@angular/forms';

export function toDateAfterFromDateValidator(fromField: string, toField: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
        const from = formGroup.get(fromField);
        const to = formGroup.get(toField);

        if (!from || !to) return null;
        if (!from.value || !to.value) return null;

        const fromDate = new Date(from.value);
        const toDate = new Date(to.value);

        return toDate < fromDate ? { toDateBeforeFromDate: true } : null;
    };
}
