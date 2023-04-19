import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

export const RootAppContainer = styled.KeyboardAvoidingView`
  flex: 1;
  display: flex;
  background-color: #fff;
  position: relative;
  z-index: 0;
`;
export const RootDoxleIconDisplayer = styled(Animated.View)`
  position: absolute;
  bottom: 20px;
  left: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
export const StyledDoxleIconDisplayerText = styled.Text`
  font-family: 'IBMPlexMono-Regular';
  font-style: normal;
  font-weight: 400;
  font-size: 4px;
  line-height: 6px;
  color: #585b62;
  text-transform: none;
`;
export const StyledLoadingMaskRootApp = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 10;
  background-color: rgba(255, 255, 255, 1);
`;
