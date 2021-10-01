import moment from 'moment';

import { IDate } from '@/shared/domain/date/date';

export class MomentDate implements IDate {
  current(): Date {
    return moment().toDate();
  }

  isValid(value: Date): boolean {
    return moment(value).isValid();
  }
}
