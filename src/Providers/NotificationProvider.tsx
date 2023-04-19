//!PT: Each ref is the notifierRoot placed on each component, to control the notification should show in the selected component by calling ref.current?.showNotification({.....}). Ex: notifierLoginRef.current?.showNotification({.....}).

import {StyleSheet, Text, View} from 'react-native';
import React, {createContext, useContext, useRef} from 'react';
import {NotifierRoot} from 'react-native-notifier';

export interface INotificationContext {
  notifierLoginRef: React.RefObject<NotifierRoot>;
  notifierRootAppRef: React.RefObject<NotifierRoot>;
}

const NotificationContext = createContext({});
const NotificationProvider = (children: any) => {
  const notifierLoginRef = useRef<NotifierRoot>(null);
  const notifierRootAppRef = useRef<NotifierRoot>(null);
  const notificationValue: INotificationContext = {
    notifierLoginRef,
    notifierRootAppRef,
  };
  return (
    <NotificationContext.Provider value={notificationValue} {...children} />
  );
};
const useNotification = () => useContext(NotificationContext);
export {NotificationProvider, useNotification};

const styles = StyleSheet.create({});
