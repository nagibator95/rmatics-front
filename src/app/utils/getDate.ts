import dayjs, { ConfigType } from 'dayjs';
// @ts-ignore
import ru from 'dayjs/locale/ru';

dayjs.locale(ru);

export const getDate = (value: ConfigType, showHours: boolean): string => {
  const diffDay = dayjs().diff(dayjs(value), 'day');
  if (showHours && diffDay <= 1) {
    return `${diffDay === 1 ? 'Вчера' : 'Сегодня'} в ${dayjs(value).format('HH:mm')}`;
  } else if (dayjs(value).year() === dayjs().year()) {
    const month = dayjs(value).format('MMMM').replace(/^(.)(.+)(.)$/i, (match, p1, p2, p3) => {
      if (match === 'март' || match === 'август') {
        return `${p1.toUpperCase()}${p2}${p3}а`;
      }

      return `${p1.toUpperCase()}${p2}я`;
    });

    return `${dayjs(value).date()} ${month}`;
  }

  return dayjs(value).format('DD.MM.YYYY');
};
