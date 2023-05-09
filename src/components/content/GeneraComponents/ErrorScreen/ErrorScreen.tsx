import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RootErrorScreen,
  StyledErrorText,
  StyledRetryButton,
} from './StyledComponentsErrorScreen';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../../Providers/DoxleThemeProvider';

type Props = {
  errorMessage?: string;
  retryFunction?: Function;
};

const ErrorScreen = ({errorMessage, retryFunction}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  return (
    <RootErrorScreen>
      <StyledErrorText themeColor={THEME_COLOR} doxleFont={DOXLE_FONT}>
        {errorMessage ? errorMessage : 'Something Wrong...'}
      </StyledErrorText>

      {retryFunction && (
        <StyledRetryButton
          mode="contained"
          icon="redo-variant"
          themeColor={THEME_COLOR}
          doxleFont={DOXLE_FONT}
          onPress={() => retryFunction()}>
          Retry
        </StyledRetryButton>
      )}
    </RootErrorScreen>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({});
