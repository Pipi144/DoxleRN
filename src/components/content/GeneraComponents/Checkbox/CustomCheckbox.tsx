import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Checkbox} from 'native-base';
import {
  ICheckboxComponentType,
  ICheckboxProps,
} from 'native-base/lib/typescript/components/primitives/Checkbox/types';

import {NORMAL_CONTENT_FONT_FAMILY} from '../../../../Utilities/constants';

interface Props extends ICheckboxProps {}

const CustomCheckbox = (props: Props) => {
  return (
    <Checkbox
      {...props}
      _checked={{
        backgroundColor: '#12B718',
        padding: 0,
      }}
      _important={{
        borderRadius: 1.5,
        borderWidth: 0.5,
        _text: {
          textDecorationColor: 'red',
        },
      }}
      borderColor="#6D778C"
      _text={{
        fontFamily: NORMAL_CONTENT_FONT_FAMILY,
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '11px',
        lineHeight: '14px',
        textTransform: 'capitalize',
        textDecorationColor: 'red',
      }}
      w={'100%'}
      h={7}
      p={0}
      overflowX="hidden"
      tintColor="red.400"
    />
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({});
