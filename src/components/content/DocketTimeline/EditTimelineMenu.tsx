import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {
  IDocketTimelineContext,
  useDocketTimelineContext,
} from '../../../Providers/DocketTimelineProvider';
import {
  IDOXLEThemeProviderContext,
  useDOXLETheme,
} from '../../../Providers/DoxleThemeProvider';
import {RootEditCheckboxMenu} from './StyledComponentDocketTimeline';
import {
  IOrientation,
  useOrientation,
} from '../../../Providers/OrientationContext';
type Props = {};

const EditTimelineMenu = (props: Props) => {
  //***************** THEME PROVIDER ************ */
  const {THEME_COLOR} = useDOXLETheme() as IDOXLEThemeProviderContext;
  //********************************************* */
  //******************* ORIENTATION PROVIDER ************ */
  const {deviceSize} = useOrientation() as IOrientation;
  //************************************************** */
  //******************* TIMELINE PROVIDER ************ */
  const {currentEdittedTimeline, setcurrentEdittedTimeline} =
    useDocketTimelineContext() as IDocketTimelineContext;
  //************************************************** */

  const handleCloseModal = () => {
    setcurrentEdittedTimeline(undefined);
  };
  return (
    <Modal
      isVisible={Boolean(currentEdittedTimeline !== undefined)}
      hasBackdrop={true}
      backdropColor={THEME_COLOR.primaryBackdropColor}
      onBackdropPress={handleCloseModal}
      animationIn="bounceInUp"
      animationOut="bounceOutDown"
      animationInTiming={200}
      animationOutTiming={200}
      style={{position: 'relative', width: deviceSize.deviceWidth, margin: 0}}>
      <RootEditCheckboxMenu themeColor={THEME_COLOR}></RootEditCheckboxMenu>
    </Modal>
  );
};

export default EditTimelineMenu;

const styles = StyleSheet.create({});
