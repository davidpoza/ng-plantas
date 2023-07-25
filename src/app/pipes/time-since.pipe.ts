import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeSince'
})
export class TimeSincePipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';
    const date = moment.unix(value);
    const s = moment().diff(date, 'days');
    if (s > 1) {
      return `Hace ${s} días`;
    } else {
      return `Hoy a las ${date.format('HH:MM')}`;
    }
  }

}
