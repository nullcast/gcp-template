export {};

const fmt = {
  yyyy: date => {
    return date.getFullYear() + '';
  },
  MM: date => {
    return ('0' + (date.getMonth() + 1)).slice(-2);
  },
  dd: date => {
    return ('0' + date.getDate()).slice(-2);
  },
  hh: date => {
    return ('0' + date.getHours()).slice(-2);
  },
  mm: date => {
    return ('0' + date.getMinutes()).slice(-2);
  },
  ss: date => {
    return ('0' + date.getSeconds()).slice(-2);
  }
};
const priority = ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss'];

declare global {
  interface Date {
    format(format: string): string;
  }
}

// tslint:disable-next-line: space-before-function-paren
Date.prototype.format = function (format: string) {
  return priority.reduce((res, f) => res.replace(f, fmt[f](this)), format);
};
