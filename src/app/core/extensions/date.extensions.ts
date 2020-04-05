import * as moment from 'moment';

export {};

declare global {
  interface Date {
    toFormat(format: string): string;
  }
}

Date.prototype.toFormat = function (format: string) {
  return moment(this).format(format);
};
