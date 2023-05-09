import moment from 'moment';
import {TDateISO, TDateISODate} from '../Models/dateFormat';

export const formatDate = (
  inputDate: string | Date,
  format:
    | 'yyyy-MM-dd'
    | 'MM-dd-yyyy'
    | 'dd-MM-yyyy'
    | 'dd MonthName yyyy'
    | 'MonthName ddth yyyy',
  fullDate?: 'fullDate',
) => {
  //!NOTICE: if input date is a string=> the string formate of date passed in should be "YYYY-MM-DD"
  //parse the input date
  let date: Date =
    typeof inputDate === 'string' ? new Date(inputDate) : inputDate;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const weekDate = date.getDay();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  let dataFormat = format as string;

  let dateOfWeek: string;
  switch (weekDate) {
    case 1:
      dateOfWeek = 'Monday';
      break;
    case 2:
      dateOfWeek = 'Tuesday';
      break;
    case 3:
      dateOfWeek = 'Wednesday';
      break;
    case 4:
      dateOfWeek = 'Thursday';
      break;
    case 5:
      dateOfWeek = 'Friday';
      break;
    case 6:
      dateOfWeek = 'Saturday';
      break;
    case 0:
      dateOfWeek = 'Sunday';
      break;
    default:
      dateOfWeek = 'Sunday';
      break;
  }

  if (day && month && year) {
    if (!fullDate) {
      if (format !== 'dd MonthName yyyy' && format !== 'MonthName ddth yyyy') {
        //replace the month
        dataFormat = dataFormat.replace(
          'MM',
          month.toString().padStart(2, '0'),
        );

        //replace the year
        if (dataFormat.indexOf('yyyy') > -1) {
          dataFormat = dataFormat.replace('yyyy', year.toString());
        } else if (dataFormat.indexOf('yy') > -1) {
          dataFormat = dataFormat.replace('yy', year.toString().substr(2, 2));
        }

        //replace the day
        dataFormat = dataFormat.replace('dd', day.toString().padStart(2, '0'));

        return dataFormat;
      } else {
        //replace the month
        dataFormat = dataFormat.replace(
          'MonthName',
          convertMonthValueToText(month - 1, 1000),
        );

        //replace the year
        if (dataFormat.indexOf('yyyy') > -1) {
          dataFormat = dataFormat.replace('yyyy', year.toString());
        } else if (dataFormat.indexOf('yy') > -1) {
          dataFormat = dataFormat.replace('yy', year.toString().substr(2, 2));
        }
        const dayString = day.toString().padStart(2, '0');
        //replace the day
        dataFormat = dataFormat.replace('dd', dayString);

        if (format === 'MonthName ddth yyyy') {
          if (dayString[1] === '1' && dayString[0] !== '1')
            dataFormat = dataFormat.replace('th', 'st');
          else if (dayString[1] === '2' && dayString[0] !== '1')
            dataFormat = dataFormat.replace('th', 'nd');
          else if (dayString[1] === '3' && dayString[0] !== '1')
            dataFormat = dataFormat.replace('th', 'rd');
        }

        return dataFormat;
      }
    } else {
      return (
        dateOfWeek.substring(0, 3) +
        ', ' +
        `${day < 10 ? '0' + day.toString() : day}` +
        ' ' +
        `${convertMonthValueToText(month, 3)}` +
        ' ' +
        year.toString() /*.substr(2, 2)*/ +
        ' ' +
        `${
          hour.toString()
          /*hour <= 12
            ? hour < 10
              ? "0" + hour.toString()
              : hour
            : Math.abs(12 - hour) < 10
            ? "0" + Math.abs(12 - hour).toString()
            : Math.abs(12 - hour) < 10*/
        }` +
        ':' +
        `${minutes < 10 ? '0' + minutes.toString() : minutes}` /*+
        " " +
        `${hour < 24 ? "AM" : "PM"}`*/
      );
    }
  } else return ' ';
};

export const convertUTCDate = (
  date: Date,
  format: 'yyyy-MM-dd' | 'MM-dd-yyyy' | 'dd-MM-yyyy',
  fullDate?: 'fullDate',
) => {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  const weekDate = date.getUTCDay();
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  let dataFormat = format as string;

  let dateOfWeek: string;
  switch (weekDate) {
    case 1:
      dateOfWeek = 'Monday';
      break;
    case 2:
      dateOfWeek = 'Tuesday';
      break;
    case 3:
      dateOfWeek = 'Wednesday';
      break;
    case 4:
      dateOfWeek = 'Thursday';
      break;
    case 5:
      dateOfWeek = 'Friday';
      break;
    case 6:
      dateOfWeek = 'Saturday';
      break;
    case 0:
      dateOfWeek = 'Sunday';
      break;
    default:
      dateOfWeek = 'Sunday';
      break;
  }

  if (day && month && year) {
    if (!fullDate) {
      //replace the month
      dataFormat = dataFormat.replace('MM', month.toString().padStart(2, '0'));

      //replace the year
      if (dataFormat.indexOf('yyyy') > -1) {
        dataFormat = dataFormat.replace('yyyy', year.toString());
      } else if (dataFormat.indexOf('yy') > -1) {
        dataFormat = dataFormat.replace('yy', year.toString().substr(2, 2));
      }

      //replace the day
      dataFormat = dataFormat.replace('dd', day.toString().padStart(2, '0'));

      return dataFormat;
    } else {
      return (
        `${day < 10 ? '0' + day.toString() : minutes}` +
        '.' +
        `${month < 10 ? '0' + month.toString() : minutes}` +
        '.' +
        year.toString().substr(2, 2) +
        ' ' +
        dateOfWeek +
        ' ' +
        `${
          hour <= 12
            ? hour < 10
              ? '0' + hour.toString()
              : hour
            : Math.abs(12 - hour) < 10
            ? '0' + Math.abs(12 - hour).toString()
            : Math.abs(12 - hour) < 10
        }` +
        ':' +
        `${minutes < 10 ? '0' + minutes.toString() : minutes}` +
        ' ' +
        `${hour < 12 ? 'AM' : 'PM'}`
      );
    }
  } else return '';
};

export const getStartAndEndDateCurrentWeek = (
  today: Date,
  returnType?: 'string' | 'number',
) => {
  let firstDay = today.getDate() + (1 - today.getDay());
  let firstDate = new Date(new Date(today).setDate(firstDay))
    .toISOString()
    .slice(0, 10);
  let lastDay = today.getDate() + (6 - today.getDay());
  let lastDate = new Date(new Date(today).setDate(lastDay))
    .toISOString()
    .slice(0, 10);
  // for (let i = 1; i <= 6; i++) {
  //   let first = today.getDate() - today.getDay() + i;
  //   let day = new Date(today.setDate(first)).toISOString().slice(0, 10);
  //   week.push(day);
  // }

  if (!returnType || returnType === 'string')
    return {start: firstDate, end: lastDate} as {
      start: string;
      end: string;
    };
  else
    return {
      start: new Date(firstDate).getDate(),
      end: new Date(lastDate).getDate(),
    };
};

export const convertWeekDaysValueToText = (
  weekDateValue: number,
  returnType: 'full' | 'acronym',
) => {
  switch (weekDateValue) {
    case 0:
      return returnType === 'full' ? 'Sunday' : 'S';
    case 1:
      return returnType === 'full' ? 'Monday' : 'M';
    case 2:
      return returnType === 'full' ? 'Tuesday' : 'T';
    case 3:
      return returnType === 'full' ? 'Wednesday' : 'W';
    case 4:
      return returnType === 'full' ? 'Thursday' : 'T';
    case 5:
      return returnType === 'full' ? 'Friday' : 'F';
    case 6:
      return returnType === 'full' ? 'Saturday' : 'S';
  }
};
export const convertMonthValueToText = (
  monthValue: number,
  numOfMonthChar: number,
) => {
  let monthName: string = '';
  switch (monthValue) {
    case 0:
      monthName = 'January';
      break;
    case 1:
      monthName = 'February';
      break;
    case 2:
      monthName = 'March';
      break;
    case 3:
      monthName = 'April';
      break;
    case 4:
      monthName = 'May';
      break;
    case 5:
      monthName = 'June';
      break;
    case 6:
      monthName = 'July';
      break;
    case 7:
      monthName = 'August';
      break;
    case 8:
      monthName = 'September';
      break;
    case 9:
      monthName = 'October';
      break;
    case 10:
      monthName = 'November';
      break;
    case 11:
      monthName = 'December';
      break;
    default:
      monthName = 'January';
  }
  return numOfMonthChar <= monthName.length
    ? monthName.substring(0, numOfMonthChar)
    : monthName;
};
export const checkEqualDateWithoutTime = (
  date1: Date,
  date2: Date,
): boolean => {
  let date1Day: number = date1.getDate();
  let date1Month: number = date1.getMonth();
  let date1Year: number = date1.getFullYear();

  let date2Day: number = date2.getDate();
  let date2Month: number = date2.getMonth();
  let date2Year: number = date2.getFullYear();
  if (
    date1Day === date2Day &&
    date1Month === date2Month &&
    date1Year === date2Year
  )
    return true;
  else return false;
};

//this function get all days before and after a date is passed with the number of before and after which is the number of days from the passed date
//For example: date passed: "2023-02-14", before range: 7 , after range :7, we should have the array containing al;l days from "2023-02-06" - "2023-02-22"
interface IBeforeAndAfterDateFunctionProps {
  initialDate: Date;
  beforeRange: number;
  afterRange: number;
}
export const getAllDaysBeforeAndAfterDate = ({
  initialDate,
  beforeRange,
  afterRange,
}: IBeforeAndAfterDateFunctionProps): IDateInfo[] => {
  const currentDayInTime: number = initialDate.getTime();
  let dateRange: IDateInfo[] = [];
  let oneDayInMilliSecs: number = 1000 * 60 * 60 * 24;
  for (let i = -beforeRange; i <= afterRange; i++) {
    const date: Date = new Date(currentDayInTime + oneDayInMilliSecs * i);
    dateRange.push({
      fullDay: date,
      dayValue: date.getDate(),
      dateInWeek: convertWeekDaysValueToText(
        date.getDay(),
        'acronym',
      ) as TWeekDayAcronym,
      monthValue: date.getMonth(),
    });
  }
  return dateRange;
};

export type TWeekDayAcronym = 'M' | 'T' | 'W' | 'T' | 'F' | 'S';
export interface IDateInfo {
  fullDay: Date;
  dayValue: number;
  dateInWeek: TWeekDayAcronym;
  monthValue?: number;
}

export const getAllWeekDaysOfDate = (dateValue: Date): IDateInfo[] => {
  let weekDays: IDateInfo[] = [];
  let currentDate = dateValue;
  let dayOfWeek = currentDate.getDay();
  let start = new Date(currentDate.setDate(currentDate.getDate() - dayOfWeek));
  for (let i = 0; i < 7; i++) {
    let nextDay = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate() + i,
    );
    if (nextDay.getDay() !== 0) {
      weekDays.push({
        fullDay: nextDay,
        dayValue: nextDay.getDate(),
        dateInWeek: convertWeekDaysValueToText(
          nextDay.getDay(),
          'acronym',
        ) as TWeekDayAcronym,
      });
    }
  }

  return weekDays;
};

export const getRandomDateWithRange = (
  startDate: Date,
  endDate: Date,
): string => {
  let startTimestamp = startDate.getTime();
  let endTimestamp = endDate.getTime();
  let randomTimestamp =
    Math.floor(Math.random() * (endTimestamp - startTimestamp + 1)) +
    startTimestamp;

  let randomDate: Date = new Date(randomTimestamp);
  return formatDate(randomDate, 'yyyy-MM-dd');
};

export interface IMonthInfo {
  monthValue: number;
  yearValue: number;
  monthName: TMonthName;
  monthAcronym: TMonthAcronym;
}

export const getAllMonthInRange = (
  startDate: Date,
  endDate: Date,
): IMonthInfo[] => {
  let months: IMonthInfo[] = [];
  let currentDate: Date = new Date(startDate);
  while (currentDate.getMonth() <= endDate.getMonth()) {
    months.push({
      monthValue: currentDate.getMonth(),
      yearValue: currentDate.getFullYear(),
      monthName: getMonthName(currentDate.getMonth(), 'full') as TMonthName,
      monthAcronym: getMonthName(
        currentDate.getMonth(),
        'acronym',
      ) as TMonthAcronym,
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return months;
};

type TMonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

type TMonthAcronym =
  | 'Jan'
  | 'Feb'
  | 'Mar'
  | 'Apr'
  | 'May'
  | 'Jun'
  | 'Jul'
  | 'Aug'
  | 'Sep'
  | 'Oct'
  | 'Nov'
  | 'Dec';
export const getMonthName = (
  monthValue: number,
  returnType: 'full' | 'acronym',
): TMonthName | TMonthAcronym | 'invalid' => {
  switch (monthValue) {
    case 0:
      return returnType === 'full'
        ? ('January' as TMonthName)
        : ('Jan' as TMonthAcronym);
    case 1:
      return returnType === 'full'
        ? ('February' as TMonthName)
        : ('Feb' as TMonthAcronym);
    case 2:
      return returnType === 'full'
        ? ('March' as TMonthName)
        : ('Mar' as TMonthAcronym);
    case 3:
      return returnType === 'full'
        ? ('April' as TMonthName)
        : ('Apr' as TMonthAcronym);
    case 4:
      return returnType === 'full'
        ? ('May' as TMonthName)
        : ('May' as TMonthAcronym);
    case 5:
      return returnType === 'full'
        ? ('June' as TMonthName)
        : ('Jun' as TMonthAcronym);
    case 6:
      return returnType === 'full'
        ? ('July' as TMonthName)
        : ('Jul' as TMonthAcronym);
    case 7:
      return returnType === 'full'
        ? ('August' as TMonthName)
        : ('Aug' as TMonthAcronym);
    case 8:
      return returnType === 'full'
        ? ('September' as TMonthName)
        : ('Sep' as TMonthAcronym);
    case 9:
      return returnType === 'full'
        ? ('October' as TMonthName)
        : ('Oct' as TMonthAcronym);
    case 10:
      return returnType === 'full'
        ? ('November' as TMonthName)
        : ('Nov' as TMonthAcronym);
    case 11:
      return returnType === 'full'
        ? ('December' as TMonthName)
        : ('Dec' as TMonthAcronym);
    default:
      return 'invalid';
  }
};

export const checkEqualMonthWithoutDate = (
  date1: Date,
  date2: Date,
): boolean => {
  let date1Month: number = date1.getMonth();
  let date1Year: number = date1.getFullYear();

  let date2Month: number = date2.getMonth();
  let date2Year: number = date2.getFullYear();

  // console.log("MONTH 1:", date1Month);
  // console.log("YEAR1:", date1Year);

  // console.log("MONTH 2:", date2Month);
  // console.log("YEAR2:", date2Year);
  if (date1Month === date2Month && date1Year === date2Year) return true;
  else return false;
};

export type TWeekDate =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export const getAllDaysInMonthByDateInWeek = (
  monthValue: number,
  yearValue: number,
  weekDate?: TWeekDate,
  dateStep?: number,
): IDateInfo[] => {
  let currentDate: Date = new Date();
  currentDate.setFullYear(yearValue);
  currentDate.setMonth(monthValue);
  currentDate.setDate(1);
  let days = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  let stopDate: Date = new Date(yearValue, monthValue + 1, 1);

  if (weekDate) {
    let daysReturn: IDateInfo[] = [];
    while (currentDate < stopDate) {
      let datePushed = new Date(currentDate);
      if (datePushed.getDay() === days[weekDate])
        daysReturn.push({
          fullDay: datePushed,
          dayValue: datePushed.getDate(),
          dateInWeek: convertWeekDaysValueToText(
            datePushed.getDay(),
            'acronym',
          ) as TWeekDayAcronym,
        });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysReturn;
  } else {
    if (!dateStep) {
      let daysReturn: IDateInfo[] = [];
      while (currentDate < stopDate) {
        let datePushed = new Date(currentDate);
        daysReturn.push({
          fullDay: datePushed,
          dayValue: datePushed.getDate(),
          dateInWeek: convertWeekDaysValueToText(
            datePushed.getDay(),
            'acronym',
          ) as TWeekDayAcronym,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return daysReturn;
    } else {
      let daysReturn: IDateInfo[] = [];
      while (currentDate < stopDate) {
        let datePushed = new Date(currentDate);
        daysReturn.push({
          fullDay: datePushed,
          dayValue: datePushed.getDate(),
          dateInWeek: convertWeekDaysValueToText(
            datePushed.getDay(),
            'acronym',
          ) as TWeekDayAcronym,
        });
        currentDate.setDate(currentDate.getDate() + dateStep);
      }

      return daysReturn;
    }
  }
};

export const getLastDateOfMonth = (monthValue: number): number => {
  let lastDay = moment().month(monthValue).daysInMonth();
  return lastDay;
};
export const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const getAllDaysInCurrentQuarter = (): {
  startDate: string;
  endDate: string;
  totalQuarterDays: number;
  currentQuarter: number;
} => {
  const currentQuarter = moment().quarter();
  console.log('CURRENT QUARTER:', currentQuarter);
  const start = moment().quarter(currentQuarter).startOf('quarter');

  const end = moment().quarter(currentQuarter).endOf('quarter');

  const numberOfDays = end.diff(start, 'days');

  return {
    startDate: start.format('YYYY-MM-DD'),
    endDate: end.format('YYYY-MM-DD'),
    totalQuarterDays: numberOfDays,
    currentQuarter: currentQuarter,
  };
};

export const getAllNumOfDaysInYear = (): {
  startDate: string;
  endDate: string;
  totalDays: number;
} => {
  const currentYear = new Date().getFullYear();
  const firstDayOfYear = `${currentYear}-01-01`;
  const lastDayofYear = `${currentYear}-12-31`;
  const numOfDays = moment(lastDayofYear).diff(moment(firstDayOfYear), 'days');
  return {
    startDate: firstDayOfYear,
    endDate: lastDayofYear,
    totalDays: numOfDays,
  };
};

export const formatTDateISO = (date: string | Date): TDateISO => {
  const convertedDate: Date = typeof date === 'string' ? new Date(date) : date;
  return convertedDate.toISOString() as TDateISO;
};

export const formatTDateISODate = (date: string | Date): TDateISODate => {
  const convertedDate: Date = typeof date === 'string' ? new Date(date) : date;
  const day = convertedDate.getDate();
  const month = convertedDate.getMonth() + 1;
  const year = convertedDate.getFullYear();
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}` as TDateISODate;
};
