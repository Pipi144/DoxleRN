import moment from 'moment';
import {TimelineDocket} from '../../../Models/DocketTimelineModel';
export type ITimelineDateObject = {
  date: string;
  dateNumber: string;
  weekDayNumber: number;
};

// MONDAY - FRIDAY ONLY
export const getAllDaysInCurrentMonth = (year: number, month: number) => {
  const days: ITimelineDateObject[] = [],
    firstDate = new Date(year, month, 1),
    lastDate = new Date(year, month + 1, 0),
    numDays = lastDate.getDate();

  const getDateNumber = (date: string) => {
    return date.substring(8);
  };
  const getWeekDayNumber = (date: string) => {
    return new Date(date).getDay();
  };
  for (let date = 1; date <= numDays; date++) {
    const fullDate = moment(new Date(year, month, date)).format('YYYY-MM-DD');
    const weekDateValue = getWeekDayNumber(fullDate);
    if (weekDateValue > 0 && weekDateValue < 6)
      days.push({
        dateNumber: getDateNumber(fullDate),
        date: fullDate,
        weekDayNumber: weekDateValue,
      });
  }
  //fill days in the first week if the first value of days array is not Monday
  if (days[0].weekDayNumber > 1) {
    const totalFilledDate = days[0].weekDayNumber - 1;
    for (let i = totalFilledDate; i >= 1; i--) {
      const date = moment(new Date(year, month, -totalFilledDate + i)).format(
        'YYYY-MM-DD',
      );
      days.unshift({
        dateNumber: getDateNumber(date),
        date: formattedDate(date),
        weekDayNumber: getWeekDayNumber(date),
      });
    }
  }

  //fill days in the last week if the last day of days array is not friday
  if (days[days.length - 1].weekDayNumber < 5) {
    const totalFilledDate = 5 - days[0].weekDayNumber;
    for (let i = 1; i <= totalFilledDate; i++) {
      const date = moment(new Date(year, month, numDays + i)).format(
        'YYYY-MM-DD',
      );
      days.push({
        dateNumber: getDateNumber(date),
        date: formattedDate(date),
        weekDayNumber: getWeekDayNumber(date),
      });
    }
  }
  return days;
};

export const formattedDate = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const isRendered = (
  scheduleItem: TimelineDocket,
  cell: ITimelineDateObject,
) => {
  if (
    (scheduleItem.commenced !== null &&
      scheduleItem.completed !== null &&
      formattedDate(scheduleItem.commenced) <= cell.date &&
      formattedDate(scheduleItem.completed) >= cell.date) ||
    (scheduleItem.startDate &&
      scheduleItem.endDate &&
      formattedDate(scheduleItem.startDate) <= cell.date &&
      formattedDate(scheduleItem.endDate) >= cell.date)
  )
    return true;
  return false;
};

export const isOverdue = (
  scheduleItem: TimelineDocket,
  cell: ITimelineDateObject,
) => {
  if (scheduleItem.endDate && cell.date > scheduleItem.endDate.substring(0, 10))
    return 'subject redLabel';
  else return 'subject';
};

export const isComplete = (
  scheduleItem: TimelineDocket,
  cell: ITimelineDateObject,
) => {
  if (
    scheduleItem.completed &&
    scheduleItem.completed.substring(0, 10) <= cell.date
  )
    return true;
  return false;
};
export const isCommmenced = (
  scheduleItem: TimelineDocket,
  cell: ITimelineDateObject,
) => {
  if (
    scheduleItem.commenced &&
    scheduleItem.commenced.substring(0, 10) <= cell.date
  )
    return true;
  return false;
};
