export type RelativeDateValue =
  | 'today'
  | 'yesterday'
  | 'day_last_7'
  | 'day_last_30'
  | 'this_week'
  | 'last_week'
  | 'last_month'
  | 'this_month'
  | 'last_year'
  | 'this_year';

export type DateRangeValue = {
  start?: Date;
  end?: Date;
  relative?: RelativeDateValue;
};
