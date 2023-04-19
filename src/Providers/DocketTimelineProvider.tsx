import {StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {ISimpleProjectTimeline} from '../Models/project';
import {Company} from '../Models/company';

import {
  IDateInfo,
  getAllDaysInCurrentQuarter,
  getAllNumOfDaysInYear,
  getAllWeekDaysOfDate,
} from '../Utilities/FunctionUtilities';
import {TimelineDocket} from '../Models/DocketTimelineModel';
import {INotificationContext, useNotification} from './NotificationProvider';
import {authContextInterface, useAuth} from './AuthProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../components/content/GeneraComponents/Notification/Notification';
import ProjectQueryAPI from '../service/DoxleAPI/QueryHookAPI/projectQueryAPI';
import TimelineQueryAPI from '../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {
  ITimelineDateObject,
  formattedDate,
  getAllDaysInCurrentMonth,
} from '../components/content/DocketTimeline/DocketTimelineCommonFunctions';

type Props = {};

export type TDocketTimelineTablePeriodView =
  | 'Weekly'
  | 'Monthly'
  | 'Quarterly'
  | 'Yearly';

type TTableViewWeekDays =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday';
export const WEEK_DAYS_LIST: TTableViewWeekDays[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];
type TWeekDayAbreName = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
interface IWeekDays {
  weekDayValue: number;
  weekDayName: TWeekDayAbreName;
}
export const displayedDays: IWeekDays[] = [
  {
    weekDayName: 'MON',
    weekDayValue: 1,
  },
  {
    weekDayName: 'TUE',
    weekDayValue: 2,
  },
  {
    weekDayName: 'WED',
    weekDayValue: 3,
  },
  {
    weekDayName: 'THU',
    weekDayValue: 4,
  },
  {
    weekDayName: 'FRI',
    weekDayValue: 5,
  },
];
export interface IDocketTimelineContext {
  projects: ISimpleProjectTimeline[];
  company: Company | undefined;
  setCompany: React.Dispatch<React.SetStateAction<Company | undefined>>;
  isLoadingProject: boolean;
  isSuccessFetchingProject: boolean;
  isErrorFetchingProject: boolean;
  selectedPeriodView: TDocketTimelineTablePeriodView;
  setselectedPeriodView: React.Dispatch<
    React.SetStateAction<TDocketTimelineTablePeriodView>
  >;
  isLoadingDocket: boolean;
  isErrorFetchingDocket: boolean;
  isSuccessFetchingDocket: boolean;
  dockets: TimelineDocket[];
  //   currentWeekDays: IDateInfo[];
  filterDocketWithProject: (
    project: ISimpleProjectTimeline,
    actions: TimelineDocket[],
  ) => TimelineDocket[];
  //   currentQuarterStats: {
  //     startDate: string;
  //     endDate: string;
  //     totalQuarterDays: number;
  //     currentQuarter: number;
  //   };
  calendarCells: ITimelineDateObject[];
  currentDate: {
    year: number;
    month: number;
  };
  setcurrentDate: React.Dispatch<
    React.SetStateAction<{
      year: number;
      month: number;
    }>
  >;
  currentBaseStartDateParams: string;
  currentDateRangeLengthParam: number;
  searchInput: string;
  setsearchInput: React.Dispatch<React.SetStateAction<string>>;
}
const today = new Date();
const DocketTimelineContext = createContext({});
const DocketTimelineProvider = (children: any) => {
  //################### STATES ################
  const [company, setCompany] = useState<Company | undefined>(undefined);
  const [selectedPeriodView, setselectedPeriodView] =
    useState<TDocketTimelineTablePeriodView>('Monthly');
  const [currentWeekDays, setCurrentWeekDays] = useState<IDateInfo[]>(
    getAllWeekDaysOfDate(new Date()).filter((date, index) => index < 5),
  ); //used to display all days of current week, only take mon-fri
  const [currentDate, setcurrentDate] = useState<{
    year: number;
    month: number;
  }>({year: today.getFullYear(), month: today.getMonth()});
  const [searchInput, setsearchInput] = useState<string>('');
  //###########################################
  //************* AUTH PROVIDER*************** */
  const {accessToken} = useAuth() as authContextInterface;
  //*********************************************** */
  //************* NOTIFICATION PROVIDER*************** */
  const {notifierRootAppRef} = useNotification() as INotificationContext;
  //handle show notification
  const showNotification = useCallback(
    (
      message: string,
      messageType: 'success' | 'error',
      extraMessage?: string,
    ) => {
      notifierRootAppRef.current?.showNotification({
        title: message,
        description: extraMessage,
        Component: Notification,
        queueMode: 'immediate',
        componentProps: {
          type: messageType,
        },
        containerStyle: getContainerStyleWithTranslateY,
      });
    },
    [],
  );
  //*********************************************** */
  //##################### FETCHING PROJECTS #################

  const projectQuery = ProjectQueryAPI.useRetrieveProjectTimelineQuery(
    company,
    accessToken,
    showNotification,
  );
  //#########################################################
  //################### FETCHING Docket ###################
  const calendarCells = useMemo(
    () => getAllDaysInCurrentMonth(currentDate.year, currentDate.month),
    [currentDate],
  );

  const currentQuarterStats = useMemo(() => getAllDaysInCurrentQuarter(), []);
  const currentYearStats = useMemo(() => getAllNumOfDaysInYear(), []);

  const baseStartDateParam: string = useMemo(
    () =>
      selectedPeriodView === 'Weekly'
        ? formattedDate(currentWeekDays[0].fullDay.toISOString())
        : selectedPeriodView === 'Monthly'
        ? formattedDate(calendarCells[0].date)
        : selectedPeriodView === 'Quarterly'
        ? currentQuarterStats.startDate
        : currentYearStats.startDate,
    [selectedPeriodView, currentDate],
  );
  const dateRangeLengthParam: number = useMemo(
    () =>
      selectedPeriodView === 'Weekly'
        ? currentWeekDays.length
        : selectedPeriodView === 'Monthly'
        ? 31
        : selectedPeriodView === 'Quarterly'
        ? currentQuarterStats.totalQuarterDays
        : currentYearStats.totalDays,
    [selectedPeriodView],
  );
  const docketTimelineQuery = TimelineQueryAPI.useRetrieveTimelineDocket({
    baseStartDate: baseStartDateParam,
    dateRangeLength: dateRangeLengthParam,
    company: company,
    accessToken: accessToken,
    showNotification: showNotification,
  });

  //########################################################

  const filterDocketWithProject = useCallback(
    (project: ISimpleProjectTimeline, actions: TimelineDocket[]) => {
      return actions.filter(
        action => action.project && action.project === project.projectId,
      );
    },
    [],
  );
  const docketTimelineContextValue: IDocketTimelineContext = {
    company,
    setCompany,
    projects: projectQuery.isSuccess
      ? (projectQuery.data.data.results as ISimpleProjectTimeline[])
      : [],
    isLoadingProject: projectQuery.isLoading,
    isSuccessFetchingProject: projectQuery.isSuccess,
    isErrorFetchingProject: projectQuery.isError,
    selectedPeriodView,
    setselectedPeriodView,
    isLoadingDocket: docketTimelineQuery.isLoading,
    isErrorFetchingDocket: docketTimelineQuery.isError,
    isSuccessFetchingDocket: docketTimelineQuery.isSuccess,
    dockets: docketTimelineQuery.isSuccess
      ? (docketTimelineQuery.data.data as TimelineDocket[])
      : [],
    calendarCells,
    currentDate,
    setcurrentDate,
    currentBaseStartDateParams: baseStartDateParam,
    currentDateRangeLengthParam: dateRangeLengthParam,
    searchInput,
    setsearchInput,
    filterDocketWithProject,
  };
  return (
    <DocketTimelineContext.Provider
      value={docketTimelineContextValue}
      {...children}
    />
  );
};
const useDocketTimelineContext = () => useContext(DocketTimelineContext);
export {DocketTimelineProvider, useDocketTimelineContext};

const styles = StyleSheet.create({});
