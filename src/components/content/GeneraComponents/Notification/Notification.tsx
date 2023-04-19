//!PT- THIS COMPONENT IS USED TO COMBINE WITH "react-native-notifier" LIBRARY, THE UI PART IS EXPORT DEFAULT, THE OTHER SPECS IS THE ANIMATED PROPS ALSO EXPORTED FROM THIS FILE, USE THE PROPS TO MAKE THE NOTIFICATION ON THE BOTTOM SCREEN

import {Animated, Image, View} from 'react-native';
import React from 'react';

import styled from 'styled-components/native';
import {
  StyledImageContainer,
  StyledTextContainer,
  StyledTitleText,
} from './StyledComponentNotification';
import {
  DOXLE_FAILED_COLOR_DEEP,
  DOXLE_FAILED_COLOR_MILD,
} from '../../../../Utilities/constants';

type Props = {
  title: string;
  description?: string;
  type: 'success' | 'error';
  backgroundOpacity?: 'mild' | 'deep';
  imageSrc?: string;
};

const Notification = ({
  title,
  description,
  type,
  imageSrc,
  backgroundOpacity,
}: Props) => {
  return (
    <View
      style={{
        width: '100%',
        paddingTop: 10,
        height: 150,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        shadowColor: '#555557',
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.6,
        shadowRadius: 2,
      }}>
      {imageSrc && (
        <StyledImageContainer>
          <Image
            source={{
              uri: imageSrc,
            }}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </StyledImageContainer>
      )}

      <StyledTextContainer width={imageSrc ? '80%' : '100%'}>
        <StyledTitleText
          color={
            type === 'success'
              ? backgroundOpacity && backgroundOpacity === 'deep'
                ? 'black' //DOXLE_MAIN_COLOR_DEEP_OPACITY
                : 'black' //DOXLE_MAIN_COLOR_MILD_OPACITY
              : backgroundOpacity && backgroundOpacity === 'deep'
              ? DOXLE_FAILED_COLOR_DEEP
              : DOXLE_FAILED_COLOR_MILD
          }>
          {title}
        </StyledTitleText>
        {/* {description && (
          <StyledDescriptionText
            color={
              type === 'success'
                ? backgroundOpacity && backgroundOpacity === 'deep'
                  ? DOXLE_MAIN_COLOR_DEEP_OPACITY
                  : DOXLE_MAIN_COLOR_MILD_OPACITY
                : backgroundOpacity && backgroundOpacity === 'deep'
                ? DOXLE_FAILED_COLOR_DEEP
                : DOXLE_FAILED_COLOR_MILD
            }>
            {description}
          </StyledDescriptionText>
        )} */}
      </StyledTextContainer>
    </View>
  );
};

export default Notification;

export const getContainerStyleWithTranslateY = (
  translateY: Animated.Value,
) => ({
  top: undefined,
  bottom: -10,
  left: 0,
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
