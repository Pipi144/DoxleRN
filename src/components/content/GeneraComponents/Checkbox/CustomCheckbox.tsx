import {Image, StyleSheet} from 'react-native';
import React from 'react';

import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../../Providers/DoxleThemeProvider';

import BouncyCheckbox, {
  IBouncyCheckboxProps,
} from 'react-native-bouncy-checkbox';
import {NORMAL_CONTENT_FONT_FAMILY} from '../../../../Utilities/constants';
import {CheckedIcon, UnCheckedIcon} from './CheckboxIcon';
interface Props extends IBouncyCheckboxProps {
  width?: number | `${number}%`;
}

const CustomCheckbox = (props: Props) => {
  const {width, ...rest} = props;
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  return (
    <BouncyCheckbox
      {...rest}
      size={12}
      fillColor="#12B718"
      iconStyle={{
        borderWidth: 0,
        marginRight: 0,
        paddingRight: 0,
        borderRadius: 1,
      }}
      innerIconStyle={{
        borderRadius: 2,
        borderColor: '#6D778C',
      }}
      style={[{overflow: 'hidden', height: 20}, width ? {width: width} : null]}
      textStyle={{
        fontFamily: NORMAL_CONTENT_FONT_FAMILY,
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 14,
        color: THEME_COLOR.primaryFontColor,
        textTransform: 'capitalize',
        textDecorationLine: 'none',
        marginLeft: 0,
      }}
      textContainerStyle={{
        marginLeft: 4,
      }}
    />
  );
};

export default CustomCheckbox;

const styles = StyleSheet.create({});
