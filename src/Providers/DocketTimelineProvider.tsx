import {StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {ISimpleProject} from '../Models/project';
import {Company} from '../Models/company';

import {
  IDateInfo,
  TWeekDate,
  checkEqualDateWithoutTime,
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
import ProjectQueryAPI, {
  IUpdateProjectQueryProps,
} from '../service/DoxleAPI/QueryHookAPI/projectQueryAPI';
import TimelineQueryAPI, {
  ITimelineDocketAddQueryProps,
  ITimelineDocketDeleteQueryProps,
  ITimelineDocketUpdateQueryProps,
} from '../service/DoxleAPI/QueryHookAPI/timelineQueryAPI';
import {
  ITimelineDateObject,
  formattedDate,
  getAllDaysInCurrentMonth,
} from '../components/content/DocketTimeline/DocketTimelineCommonFunctions';
import {ICompanyProviderContextValue, useCompany} from './CompanyProvider';

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
  weekDayAbrev: TWeekDayAbreName;
  weekDayFullName: TWeekDate;
}
export const displayedDays: IWeekDays[] = [
  {
    weekDayAbrev: 'MON',
    weekDayValue: 1,
    weekDayFullName: 'Monday',
  },
  {
    weekDayAbrev: 'TUE',
    weekDayValue: 2,
    weekDayFullName: 'Tuesday',
  },
  {
    weekDayAbrev: 'WED',
    weekDayValue: 3,
    weekDayFullName: 'Wednesday',
  },
  {
    weekDayAbrev: 'THU',
    weekDayValue: 4,
    weekDayFullName: 'Thursday',
  },
  {
    weekDayAbrev: 'FRI',
    weekDayValue: 5,
    weekDayFullName: 'Friday',
  },
];

export interface IAddNewTimelineData {
  project: ISimpleProject;
  dateValue: Date;
}
export interface IDocketTimelineContext {
  projects: ISimpleProject[];

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
  currentWeekDays: IDateInfo[];
  filterDocketWithProject: (
    project: ISimpleProject,
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
  currentEdittedTimeline: TimelineDocket | undefined;
  setcurrentEdittedTimeline: React.Dispatch<
    React.SetStateAction<TimelineDocket | undefined>
  >;
  filterDocketWithDate: (
    date: Date,
    actions: TimelineDocket[],
  ) => TimelineDocket[];
  mutateTimelineDataQueryFunction: (
    data: ITimelineDocketUpdateQueryProps,
  ) => void;
  isUpdatingDocket: boolean;
  deleteTimelineDataQueryFunction: (
    data: ITimelineDocketDeleteQueryProps,
  ) => void;
  isDeletingDocket: boolean;
  mutateProjectTimelineQueryFunction: (data: IUpdateProjectQueryProps) => void;
  isUpdatingProject: boolean;
  newTimelineData: IAddNewTimelineData | undefined;
  setnewTimelineData: React.Dispatch<
    React.SetStateAction<IAddNewTimelineData | undefined>
  >;
  addTimelineQueryFunction: (data: ITimelineDocketAddQueryProps) => void;
  isAddingTimeline: boolean;
}
const today = new Date();
const DocketTimelineContext = createContext({});
const DocketTimelineProvider = (children: any) => {
  //################### STATES ################

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
  const [currentEdittedTimeline, setcurrentEdittedTimeline] = useState<
    TimelineDocket | undefined
  >(undefined);
  const [newTimelineData, setnewTimelineData] = useState<
    IAddNewTimelineData | undefined
  >(undefined);
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

  //************ COMPANY PROVIDER ************* */
  const {company} = useCompany() as ICompanyProviderContextValue;

  //************END OF COMPANY PROVIDER ******** */
  //##################### FETCHING PROJECTS #################

  const projectQuery = ProjectQueryAPI.useRetrieveProjectTimelineQuery(
    company,
    accessToken,
    showNotification,
  );
  //#########################################################
  //################## HANDLING UPDATE PROJECT QUERY#############
  const editProjectQuery =
    ProjectQueryAPI.useUpdateProjectQuery(showNotification);
  //########################################################
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
  //################## HANDLING ADD DOCKET #############
  const addTimelineMutation =
    TimelineQueryAPI.useAddTimelineDocket(showNotification);
  //########################################################
  //################## HANDLING UPDATE DOCKET QUERY#############
  const updateTimelineMutation = TimelineQueryAPI.useUpdateTimelineDocket({
    showNotification: showNotification,
  });

  //########################################################
  //################## HANDLING DELETE DOCKET QUERY#############
  const deleteTimelineMutation =
    TimelineQueryAPI.useDeleteTimelineDocket(showNotification);
  //########################################################
  const filterDocketWithProject = useCallback(
    (project: ISimpleProject, actions: TimelineDocket[]) => {
      return actions.filter(
        action => action.project && action.project === project.projectId,
      );
    },
    [],
  );
  const filterDocketWithDate = useCallback(
    (date: Date, actions: TimelineDocket[]) => {
      return actions.filter(action =>
        checkEqualDateWithoutTime(date, new Date(action.startDate)),
      );
    },
    [],
  );
  const docketTimelineContextValue: IDocketTimelineContext = {
    addTimelineQueryFunction: addTimelineMutation.mutate,
    isAddingTimeline: addTimelineMutation.isLoading,

    projects: projectQuery.isSuccess
      ? (projectQuery.data.data.results as ISimpleProject[])
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
    currentEdittedTimeline,
    setcurrentEdittedTimeline,
    currentWeekDays,
    filterDocketWithDate,
    mutateTimelineDataQueryFunction: updateTimelineMutation.mutate,
    deleteTimelineDataQueryFunction: deleteTimelineMutation.mutate,
    isUpdatingDocket: updateTimelineMutation.isLoading,
    isDeletingDocket: deleteTimelineMutation.isLoading,
    mutateProjectTimelineQueryFunction: editProjectQuery.mutate,
    isUpdatingProject: editProjectQuery.isLoading,
    newTimelineData,
    setnewTimelineData,
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
