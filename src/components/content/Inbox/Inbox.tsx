import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InboxTopSection from './InboxTopSection';
import {RootInbox} from './StyledComponentInbox';

type Props = {
  navigation: any;
};

const Inbox = ({navigation}: Props) => {
  return (
    <RootInbox>
      <InboxTopSection />
    </RootInbox>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
