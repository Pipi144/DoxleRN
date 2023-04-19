import {
  Animated,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import {
  StyledTitleNotificationWithURLText,
  StyledTitleText,
  StyledURLLinkText,
} from './StyledComponentNotification';
import {DOXLE_MAIN_COLOR_MILD_OPACITY} from '../../../../Utilities/constants';

type Props = {
  title: string;
  urlText: string;
  urlPath: string;
};

const NotificationWithURL = ({title, urlText, urlPath}: Props) => {
  const handleOpenURLLink = () => {
    Linking.openURL(urlPath);
  };
  return (
    <View
      style={{
        width: '95%',

        height: 80,
        backgroundColor: DOXLE_MAIN_COLOR_MILD_OPACITY,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 14,

        shadowColor: '#555557',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2,
      }}>
      <StyledTitleNotificationWithURLText color="white">
        {title}
      </StyledTitleNotificationWithURLText>

      <Pressable onPress={handleOpenURLLink} style={{marginLeft: 14}}>
        <StyledURLLinkText>{urlText}</StyledURLLinkText>
      </Pressable>
    </View>
  );
};

export default NotificationWithURL;

const styles = StyleSheet.create({});

export const getTrasformNotificationWithURL = (translateY: Animated.Value) => ({
  top: undefined,
  bottom: 30,
  left: '2.5%',
  zIndex: 100,
  transform: [
    {
      // reverse translateY value
      translateY: translateY.interpolate({
        inputRange: [-1000, 0],
        outputRange: [1000, 0],

        extrapolate: 'clamp',
      }),
      // scale: translateY.interpolate({
      //   inputRange: [-1000, -200, 0],
      //   outputRange: [0, 0.5, 1],
      //   extrapolate: 'clamp',
      // }),
    },
  ],
});
