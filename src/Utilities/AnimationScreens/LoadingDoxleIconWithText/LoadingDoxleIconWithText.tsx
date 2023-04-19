import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  RootLoadingDoxleIconWithText,
  StyledAnimatedChar,
  StyledAnimatedIconContainer,
  StyledMessageContainer,
} from './StyledComponentsLoadingDoxleIconWithText';
import {DOXLEDogIcon} from './LoadingIcons';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  message?: string;
};

const LoadingDoxleIconWithText = ({message}: Props) => {
  const logoViewAnimatedValue = useSharedValue(0);
  const logoViewAnimatedStyle = useAnimatedStyle(() => {
    const scaleInterpolation = interpolate(
      logoViewAnimatedValue.value,
      [0, 1],
      [1, 1.2],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      transform: [{scale: scaleInterpolation}],
    };
  });
  const msgTextAnimatedValue = useSharedValue(0);
  const messageTextAnimatedStyled = useAnimatedStyle(() => {
    const opacityInterpolate = interpolate(
      msgTextAnimatedValue.value,
      [0, 1],
      [0, 1],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    const translateXInterpolate = interpolate(
      msgTextAnimatedValue.value,
      [0, 1],
      [-20, 20],
      {
        extrapolateLeft: Extrapolation.CLAMP,
        extrapolateRight: Extrapolation.CLAMP,
      },
    );
    return {
      opacity: opacityInterpolate,
      transform: [
        {
          translateX: translateXInterpolate,
        },
      ],
    };
  });
  const handleAnimationValue = () => {
    logoViewAnimatedValue.value = withRepeat(
      withTiming(1, {duration: 1000}),
      -1,
      true,
    );
    msgTextAnimatedValue.value = withRepeat(
      withTiming(1, {duration: 1000}),
      -1,
      true,
    );
  };
  useEffect(() => {
    handleAnimationValue();
  }, []);
  return (
    <RootLoadingDoxleIconWithText>
      <StyledAnimatedIconContainer style={logoViewAnimatedStyle}>
        <DOXLEDogIcon />
      </StyledAnimatedIconContainer>
      {message && (
        <StyledMessageContainer>
          <StyledAnimatedChar style={messageTextAnimatedStyled}>
            {message}
          </StyledAnimatedChar>
        </StyledMessageContainer>
      )}
    </RootLoadingDoxleIconWithText>
  );
};

export default LoadingDoxleIconWithText;

const styles = StyleSheet.create({});
