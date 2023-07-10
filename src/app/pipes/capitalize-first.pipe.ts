import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(word: string): string {
    if (!word) return word;
     return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

}
