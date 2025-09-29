import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<input type="text" [formControl] ="searchControl"/>`,
  styles: `
    input {
    padding: .5rem .75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color .2s;
    margin-bottom: 1rem;

    &:focus {
        border-color: $primary;
    }
}`
})
export class InputSearch{
  searchControl = new FormControl<string>('', { nonNullable: true});
  @Output() search = new EventEmitter<string>();

  constructor() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      map(value => value.trim().toLowerCase()),
      distinctUntilChanged(),
      takeUntilDestroyed()
    ).subscribe(this.search.emit.bind(this.search))
  }
}
