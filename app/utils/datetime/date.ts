import { format, isValid, parse } from 'date-fns';

const refDate = new Date();

export { format as formatDate } from 'date-fns';

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
