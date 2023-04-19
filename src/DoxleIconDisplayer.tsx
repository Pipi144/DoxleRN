import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootDoxleIconDisplayer,
  StyledDoxleIconDisplayerText,
} from './StyledComponentsRootApp';
import {DOXLEIcon} from './RootAppIcons';
import {PinwheelIn} from 'react-native-reanimated';

type Props = {};

const DoxleIconDisplayer = (props: Props) => {
  return (
    <RootDoxleIconDisplayer entering={PinwheelIn.delay(500).duration(1000)}>
      <DOXLEIcon />
      <StyledDoxleIconDisplayerText>
        Powered by Doxle
      </StyledDoxleIconDisplayerText>
    </RootDoxleIconDisplayer>
  );
};

export default DoxleIconDisplayer;

const styles = StyleSheet.create({});
