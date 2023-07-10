import { Pipe, PipeTransform } from '@angular/core';
import { JournalEntryType } from '../models/IJournalEntry';

@Pipe({
  name: 'translateJournalType'
})
export class TranslateJournalTypePipe implements PipeTransform {

  transform(type: string): string {
    switch(type) {
      case JournalEntryType.watering:
        return 'riego';
      case JournalEntryType.mist:
        return 'pulverizar agua';
      case JournalEntryType.fertilize:
        return 'agregar fertilizante';
      case JournalEntryType.photo:
        return 'tomar una foto';
      default:
        return type;
    }
  }

}
