import {Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {MENU_TITLE_FONT_REG, NORMAL_CONTENT_FONT_FAMILY} from '../../constants';

type Props = {
  processingType: 'delete' | 'update';
  processingText?: string;
};

const ProcessingScreen = ({processingType, processingText}: Props) => {
  const lottieType =
    processingType === 'update'
      ? require('../../LottieJSONFiles/updating.json')
      : require('../../LottieJSONFiles/delete.json');
  return (
    <View style={styles.rootContainer}>
      <LottieView
        autoPlay
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'transparent',
        }}
        source={lottieType}
        resizeMode="contain"
      />
      {processingText ? (
        <View style={{marginTop: 8}}>
          <Text
            style={{
              ...styles.textInfoStyle,
              color: processingType === 'delete' ? 'red' : '#6E0BBC',
            }}>
            {processingText}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProcessingScreen;

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
    fontFamily: MENU_TITLE_FONT_REG,
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
  },
});
