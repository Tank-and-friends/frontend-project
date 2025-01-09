import {format, isValid, parse, isToday, isThisWeek} from 'date-fns';

const refDate = new Date();

export {format as formatDate} from 'date-fns';

export function parseDate(value: string, _format: string): Date | undefined {
  const parsedDate = parse(value, _format, refDate);
  if (isValid(parsedDate)) {
    return parsedDate;
  }
  return undefined;
}

export function formatDateTime(
  date: string,
  fromFormat: string = 'yyyy-MM-dd',
  toFormat: string = 'dd/MM/yyyy',
): string {
  return format(parseDate(date, fromFormat) || refDate, toFormat);
}

export const formatMessageDate = (date: Date): string => {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isThisWeek(date)) {
    const daysOfWeek: {[key: string]: string} = {
      Monday: 'T2',
      Tuesday: 'T3',
      Wednesday: 'T4',
      Thursday: 'T5',
      Friday: 'T6',
      Saturday: 'T7',
      Sunday: 'CN',
    };
    const day = format(date, 'EEEE') as keyof typeof daysOfWeek;
    return daysOfWeek[day];
  } else {
    return `${format(date, 'd')} thg ${format(date, 'M')}`;
  }
};
