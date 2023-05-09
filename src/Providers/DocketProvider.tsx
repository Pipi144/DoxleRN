//!--------> ASYNCSTORAGE KEY <---------
//! "lastSelectedProjectId" => used to return to last state when comeback to this screen
//!<----------------------------------->
import {StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {IDocket, IDocketStatus} from '../Models/docket';
import {useNavigationState} from '@react-navigation/native';

import ProjectQueryAPI from '../service/DoxleAPI/QueryHookAPI/projectQueryAPI';
import {authContextInterface, useAuth} from './AuthProvider';
import {INotificationContext, useNotification} from './NotificationProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../components/content/GeneraComponents/Notification/Notification';
import {ICompanyProviderContextValue, useCompany} from './CompanyProvider';
import {ISimpleProject} from '../Models/project';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocketQuery, {
  IFullDocketDetailQueryFilterProp,
} from '../service/DoxleAPI/QueryHookAPI/docketQueryAPI';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {TDoxleMenu} from '../RootApp';

type TDocketTableHeaderName =
  | 'Name'
  | 'Number'
  | 'Budget'
  | 'Actual'
  | 'Xero'
  | 'Running'
  | 'Start'
  | 'End';
export interface IDocketTableHeader {
  headerName: TDocketTableHeaderName;
  isDisplayed: boolean;
  docketKeyProp: keyof IDocket;
}
export const DOCKET_TABLE_HEADER_LIST: IDocketTableHeader[] = [
  {
    headerName: 'Name',
    isDisplayed: true,
    docketKeyProp: 'docketName',
  },

  {
    headerName: 'Budget',
    isDisplayed: true,
    docketKeyProp: 'costBudget',
  },
  {
    headerName: 'Actual',
    isDisplayed: true,
    docketKeyProp: 'costActual',
  },
  {
    headerName: 'Xero',
    isDisplayed: true,
    docketKeyProp: 'costXero',
  },
  {
    headerName: 'Running',
    isDisplayed: true,
    docketKeyProp: 'costRunning',
  },
  {
    headerName: 'Start',
    isDisplayed: true,
    docketKeyProp: 'startDate',
  },
  {
    headerName: 'End',
    isDisplayed: true,
    docketKeyProp: 'endDate',
  },
];

export interface IDocketContextValue {
  docketQuote: string;
  selectedProject: ISimpleProject | undefined;
  setselectedProject: React.Dispatch<
    React.SetStateAction<ISimpleProject | undefined>
  >;
  projects: ISimpleProject[];
  isLoadingProject: boolean;
  isErrorFetchingProject: boolean;
  isSuccessFetchingProject: boolean;
  docketList: IDocket[];
  refetchDocketListQuery: () => void;

  isLoadingDocketList: boolean;
  isErrorFetchingDocketList: boolean;
  isSuccessFetchingDocketList: boolean;
  hasNextPageDocketList: boolean | undefined;
  fetchNextPageDocketList: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<AxiosResponse<any, any>, unknown>>;
  isFetchingNextDocketList: boolean;
  docketStatusList: IDocketStatus[];
  isErrorFetchingStatus: boolean;
  isSuccessFetchingStatus: boolean;
  docketTableHeaderList: IDocketTableHeader[];
  setdocketTableHeaderList: React.Dispatch<
    React.SetStateAction<IDocketTableHeader[]>
  >;
}

const DocketContext = createContext({});
const DocketProvider = (children: any) => {
  //#################### STATES #################
  const [selectedProject, setselectedProject] = useState<
    ISimpleProject | undefined
  >(undefined);

  const [docketTableHeaderList, setdocketTableHeaderList] = useState<
    IDocketTableHeader[]
  >(DOCKET_TABLE_HEADER_LIST);
  //################ END OF STATES ##############
  //************* AUTH PROVIDER*************** */
  const {accessToken, user} = useAuth() as authContextInterface;
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
  const navigationState = useNavigationState(state => state);

  const docketQuote: string = useMemo(
    () =>
      !navigationState
        ? ''
        : (navigationState.routes[navigationState.index].name as TDoxleMenu) ===
          'Projects'
        ? 'Group your dockets into a Project and build your budgets faster. With the help of Doxle machine learning we aim to improve accuracy and produce quick and transparent budgets.'
        : (navigationState.routes[navigationState.index].name as TDoxleMenu) ===
          'Inbox'
        ? 'These are all the dockets that are assigned to you. Please take ownership of these dockets by responding to the dockets at regular times. Keep up the good work :)'
        : '',
    [navigationState.index],
  );

  //##################### FETCHING PROJECTS #################

  const projectQuery = ProjectQueryAPI.useRetrieveSimpleProjectQuery(
    company,
    accessToken,
    showNotification,
  );
  const projectList: ISimpleProject[] = useMemo(
    () =>
      projectQuery.isSuccess
        ? (projectQuery.data.data.results as ISimpleProject[])
        : [],
    [projectQuery.isSuccess, projectQuery.data],
  );

  const handleSetSelectedProject = useCallback(
    async (projectList: ISimpleProject[]) => {
      if (!selectedProject) {
        const lastSelectedProjectId: string | null = await AsyncStorage.getItem(
          'lastSelectedProjectId',
        );
        if (!lastSelectedProjectId) {
          setselectedProject(projectList[0]);
        } else
          setselectedProject(
            projectList.filter(
              project => project.projectId === lastSelectedProjectId,
            )[0],
          );
      }
    },
    [selectedProject],
  );
  //useEffect to set selected project whenever the project list is changed in initial fetch
  useEffect(() => {
    if (projectList.length > 0) handleSetSelectedProject(projectList);
  }, [projectList]);

  //useEffect to save current selected project to local storage whenever selected project change
  useEffect(() => {
    if (selectedProject)
      AsyncStorage.setItem('lastSelectedProjectId', selectedProject.projectId);
  }, [selectedProject]);

  //#########################################################

  //##################### FETCHING DOCKETS #################
  const filterDocketListQuery: IFullDocketDetailQueryFilterProp = useMemo(
    () => ({
      project:
        navigationState &&
        navigationState.routes[navigationState.index].name === 'Projects'
          ? selectedProject
          : undefined,
      watching:
        navigationState &&
        navigationState.routes[navigationState.index].name === 'Inbox' &&
        user
          ? (user.userId as string)
          : undefined,
      ballInCourt:
        navigationState &&
        navigationState.routes[navigationState.index].name === 'Inbox' &&
        user
          ? (user.userId as string)
          : undefined,
    }),
    [selectedProject, navigationState],
  );
  const docketListQuery = DocketQuery.useRetrieveFullDetailDocketList(
    accessToken,
    filterDocketListQuery,
    company,
    showNotification,
  );
  const docketList = useMemo(
    () =>
      docketListQuery.data?.pages.flatMap(page => page?.data?.results ?? []) ??
      [],
    [docketListQuery.data],
  );

  const refetchDocketListQuery = () => {
    docketListQuery.refetch();
  };
  //#########################################################

  //##################### FETCHING DOCKET STATUS LIST #################

  const docketStatusListQuery = DocketQuery.useRetrieveDocketStatusList(
    accessToken,
    company,
    showNotification,
  );

  //#########################################################
  const docketContextValue: IDocketContextValue = {
    docketQuote,

    selectedProject,
    setselectedProject,
    projects: projectList,
    isLoadingProject: projectQuery.isLoading,
    isErrorFetchingProject: projectQuery.isError,
    isSuccessFetchingProject: projectQuery.isSuccess,
    docketList: [...docketList],
    refetchDocketListQuery,
    isLoadingDocketList: docketListQuery.isLoading,
    isErrorFetchingDocketList: docketListQuery.isError,
    isSuccessFetchingDocketList: docketListQuery.isSuccess,
    hasNextPageDocketList: docketListQuery.hasNextPage,
    fetchNextPageDocketList: docketListQuery.fetchNextPage,
    isFetchingNextDocketList: docketListQuery.isFetchingNextPage,
    docketStatusList: docketStatusListQuery.isSuccess
      ? (docketStatusListQuery.data.data.results as IDocketStatus[])
      : [],
    isErrorFetchingStatus: docketStatusListQuery.isError,
    isSuccessFetchingStatus: docketStatusListQuery.isSuccess,
    docketTableHeaderList,
    setdocketTableHeaderList,
  };
  return <DocketContext.Provider value={docketContextValue} {...children} />;
};
const useDocket = () => useContext(DocketContext);
export {DocketProvider, useDocket};
