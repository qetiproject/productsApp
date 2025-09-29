import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<input type="text" [formControl] ="searchControl"/>`,
  styleUrls: ['./input-search.scss']
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
