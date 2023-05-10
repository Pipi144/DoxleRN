import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';

type Props = {
  size?: number;
  textMessage?: string;
};

const ListLoadingMoreBottom = ({size, textMessage}: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR, DOXLE_FONT} =
    useDOXLETheme() as IDOXLEThemeProviderContext;
  //*************END OF THEME PROVIDER ************ */
  const lottieAnimation = require('../../LottieJSONFiles/loadingMore.json');

  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: size ? size : 100,
          height: size ? size : 100,
          backgroundColor: 'transparent',
        }}
        source={lottieAnimation}
        resizeMode="contain"
      />
      {textMessage ? (
        <View style={{marginTop: 8}}>
          <Text
            style={{
              ...styles.textInfoStyle,
              color: THEME_COLOR.doxleColor,
              fontFamily: DOXLE_FONT.secondaryFont,
            }}>
            {textMessage}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default ListLoadingMoreBottom;

const styles = StyleSheet.create({
  rootContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,

    display: 'flex',
    flexDirection: 'column',
  },
  textInfoStyle: {
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
});
