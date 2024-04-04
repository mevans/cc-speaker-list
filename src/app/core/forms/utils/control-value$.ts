import { FormControl } from '@angular/forms';
import { Observable, filter, map, startWith } from 'rxjs';

export function controlValue$<T>(
  control: FormControl<T>
): Observable<NonNullable<T>> {
  return control.valueChanges.pipe(
    startWith(control.value),
    filter((value): value is NonNullable<T> => value !== null),
  );
}
