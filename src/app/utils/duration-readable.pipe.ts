import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationReadable',
})
/**
 * class DurationReadablePipe
 * Transform a duration (number of millisecond) to a human readable time.
 * If the duration is greater than 3 days we count in days else we count in hours
 * ie: it is easier to understand 36 hours than 1 day and 12 hours
 */
export class DurationReadablePipe implements PipeTransform {
  transform(value: number): String {
    let return_time: String = '';

    // One minute
    if (value >= 60000) {
      // One hour
      if (value >= 3600000) {
        let duration_hour: number;
        // Three days
        if (value >= 259200000) {
          const duration_day = Math.floor(value / 259200000);
          return_time =
            return_time +
            duration_day.toString() +
            ' jour' +
            (duration_day > 1 ? 's ' : ' ');
          duration_hour = Math.floor((value / 3600000) % 24);
        } else {
          duration_hour = Math.floor((value / 3600000) % 72);
        }
        return_time =
          return_time +
          duration_hour.toString() +
          ' heure' +
          (duration_hour > 1 ? 's ' : ' ');
      }
      const duration_minute = Math.floor((value / 60000) % 60);
      if (duration_minute !== 0) {
        return_time =
          return_time +
          duration_minute.toString() +
          ' minute' +
          (duration_minute > 1 ? 's ' : ' ');
      }
    }

    return return_time;
  }
}
