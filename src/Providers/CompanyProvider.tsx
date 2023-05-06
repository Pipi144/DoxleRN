import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Company} from '../Models/company';
import {INotificationContext, useNotification} from './NotificationProvider';
import Notification, {
  getContainerStyleWithTranslateY,
} from '../components/content/GeneraComponents/Notification/Notification';
import CompanyQueryAPI from '../service/DoxleAPI/QueryHookAPI/companyQueryAPI';
import {authContextInterface, useAuth} from './AuthProvider';

type Props = {};

export interface ICompanyProviderContextValue {
  company: Company | undefined;

  isLoadingCompany: boolean;
}

const CompanyContext = createContext({});
const CompanyProvider = (children: any) => {
  //************* NOTIFICATION PROVIDER *************** */
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
  //*********END OF NOTIFICATION PROVIDER*********** */

  //************* AUTH PROVIDER*************** */
  const {accessToken, logOut} = useAuth() as authContextInterface;
  //************END OF AUTH PROVIDER********** */

  //################### FETCH COMPANY QUERY ###################

  const handleFailedGetCompany = () => {
    Alert.alert('Unable to find company!', 'Retry 1 more time', [
      {
        text: 'Retry',
        onPress: () => {
          retrieveCompanyQuery.refetch();
        },
      },
      {
        text: 'Log out',
        onPress: () => {
          logOut();
        },
      },
    ]);
  };

  const retrieveCompanyQuery = CompanyQueryAPI.useRetrieveCompanyList({
    showNotification,
    accessToken,
    onErrorCb: handleFailedGetCompany,
  });

  const company = useMemo(
    () =>
      retrieveCompanyQuery.isSuccess
        ? (retrieveCompanyQuery.data.data.results[0] as Company)
        : undefined,
    [retrieveCompanyQuery.isSuccess, retrieveCompanyQuery.data],
  );
  //###########################################################
  const companyContextProvider: ICompanyProviderContextValue = {
    company,

    isLoadingCompany: Boolean(
      retrieveCompanyQuery.isLoading || retrieveCompanyQuery.isRefetching,
    ),
  };
  return (
    <CompanyContext.Provider {...children} value={companyContextProvider} />
  );
};
const useCompany = () => useContext(CompanyContext);
export {CompanyProvider, useCompany};
