import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  setcompany: React.Dispatch<React.SetStateAction<Company | undefined>>;
  companyList: Company[];
  isLoadingCompany: boolean;
}

const CompanyContext = createContext({});
const CompanyProvider = (children: any) => {
  //################ STATES ##################
  const [company, setcompany] = useState<Company | undefined>(undefined);
  //###########################################
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

  const companyList = useMemo(
    () =>
      retrieveCompanyQuery.isSuccess
        ? (retrieveCompanyQuery.data.data.results as Company[])
        : [],
    [retrieveCompanyQuery.isSuccess, retrieveCompanyQuery.data],
  );

  useEffect(() => {
    if (!company && companyList.length > 0) setcompany(companyList[0]);
  }, [companyList]);
  //###########################################################
  const companyContextProvider: ICompanyProviderContextValue = {
    company,
    setcompany,
    companyList,
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
