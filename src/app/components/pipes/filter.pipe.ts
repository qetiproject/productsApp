import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T>(
    items: T[] | null, 
    searchValue: string, 
    keySelector: (item: T) => string[])
  : T[] | null {
    if(!items || !searchValue) return items;
     return items.filter(item =>
      keySelector(item)?.some(field =>
        field.toLowerCase().includes(searchValue.toLowerCase())
      )
    );

  }
}