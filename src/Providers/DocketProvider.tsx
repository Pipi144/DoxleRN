import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useMemo} from 'react';
import {IDocket} from '../Models/docket';
import {useNavigationState} from '@react-navigation/native';
import {TDoxleMenu} from '../RootApp';

export interface IDocketContextValue {
  docketList: IDocket[];
  docketQuote: string;
}

const DocketContext = createContext({});
const DocketProvider = (children: any) => {
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
    [navigationState],
  );
  const docketContextValue: IDocketContextValue = {docketQuote, docketList: []};
  return <DocketContext.Provider value={docketContextValue} {...children} />;
};
const useDocket = () => useContext(DocketContext);
export {DocketProvider, useDocket};
