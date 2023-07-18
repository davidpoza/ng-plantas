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
        return 'pulverizado agua';
      case JournalEntryType.fertilize:
        return 'fertilizado';
      case JournalEntryType.photo:
        return 'foto';
      default:
        return type;
    }
  }

}
