import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {
  Button,
  HStack,
  Text,
  Image,
  Input,
  View,
  FlatList,
  ScrollView,
  Checkbox,
  Box,
  Menu,
  Pressable,
  useDisclose,
  Center,
  Actionsheet,
  useToast,
} from 'native-base';
import {colors} from '../../../utils/constants';
import data from './data.json';
import {
  FooterMenuProps,
  FooterOpenProps,
  IProjectTimeline,
  SubjectListProps,
  TimelineActions,
  dateObj,
} from './ActionTimelineModel';
import {
  days,
  formattedDate,
  getWeeksInMonth,
} from './DocketTimelineCommonFunctions';
import ProjectAPI from '../../../service/DoxleAPI/projectAPI';

const TabList = [
  {name: 'Weekly', isActive: false},
  {name: 'Monthly', isActive: true},
  {name: 'Quarterly', isActive: false},
  {name: 'Yearly', isActive: false},
];

const calendarCells = getWeeksInMonth(2023, 3);

function FooterMenu({isOpen, onClose}: FooterMenuProps): JSX.Element {
  return (
    <Center>
      {/* <Button onPress={onOpen}>Actionsheet</Button> */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content style={styles.footerMenuGroup}>
          <Actionsheet.Item style={styles.footerMenuItem}>
            <Text style={styles.footerMenuItemText}>Mark Complete</Text>
          </Actionsheet.Item>
          <Actionsheet.Item style={styles.footerMenuItem}>
            <Text style={styles.footerMenuItemText}>Edit Name</Text>
          </Actionsheet.Item>
          <Actionsheet.Item style={styles.footerMenuItem}>
            <Text style={[styles.footerMenuItemText, styles.textRed]}>
              Delete
            </Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
}

const SubjectList = memo(
  (props: TimelineActions & SubjectListProps & FooterOpenProps) => {
    const {actionId, subject, cellDate, onOpen} = props;

    const isComplete = (scheduleItem: TimelineActions, cell: dateObj) => {
      if (
        scheduleItem.completed &&
        scheduleItem.completed.substring(0, 10) <= cell.date
      )
        return true;
      return false;
    };
    const isCommmenced = (scheduleItem: TimelineActions, cell: dateObj) => {
      if (
        scheduleItem.commenced &&
        scheduleItem.commenced.substring(0, 10) <= cell.date
      )
        return true;
      return false;
    };

    return (
      <Pressable onPress={onOpen}>
        <HStack style={styles.subjectContainer}>
          <Checkbox
            value={actionId}
            size="sm"
            style={styles.checkbox}
            accessibilityLabel={actionId}
            colorScheme="success"
            isChecked={isComplete(props, cellDate)}
            isIndeterminate={
              !isComplete(props, cellDate) && isCommmenced(props, cellDate)
            }
            color={isComplete(props, cellDate) ? 'success' : undefined}
          />
          <Text style={styles.subjectName}>{subject}</Text>
        </HStack>
      </Pressable>
    );
  },
);

const Project = memo((props: IProjectTimeline & FooterOpenProps) => {
  const {siteAddress, actions, onOpen} = props;

  const isRendered = (scheduleItem: TimelineActions, cell: dateObj) => {
    if (
      (scheduleItem.commenced !== null &&
        scheduleItem.completed !== null &&
        formattedDate(scheduleItem.commenced) <= cell.date &&
        formattedDate(scheduleItem.completed) >= cell.date) ||
      (scheduleItem.startDate &&
        scheduleItem.endDate &&
        formattedDate(scheduleItem.startDate) <= cell.date &&
        formattedDate(scheduleItem.endDate) >= cell.date)
    )
      return true;
    return false;
  };

  return (
    <View style={styles.project}>
      <Text style={styles.textAddress}>{siteAddress}</Text>
      <ScrollView horizontal style={styles.cellScrollView}>
        <View style={styles.cellContainer}>
          {days.map((day, index) => (
            <Text key={index} style={styles.cellDay}>
              {day}
            </Text>
          ))}
          {calendarCells.map(week =>
            week.dates.map((cell, cellIndex) => (
              <View key={cellIndex} style={styles.cellBox}>
                <Text style={styles.cellDateNumber}>{cell.dateNumber}</Text>
                <FlatList
                  data={actions}
                  keyExtractor={item => item.actionId}
                  style={styles.subjectList}
                  nestedScrollEnabled={true}
                  renderItem={({item}) => {
                    if (!isRendered(item, cell)) return null;
                    return (
                      <SubjectList
                        actionId={item.actionId}
                        subject={item.subject}
                        startDate={item.startDate}
                        endDate={item.endDate}
                        commenced={item.commenced}
                        completed={item.completed}
                        cellDate={cell}
                        onOpen={onOpen}
                      />
                    );
                  }}
                />
              </View>
            )),
          )}
        </View>
      </ScrollView>
    </View>
  );
});

function ActionTimeline(): JSX.Element {
  const [keyword, setKeyword] = useState('');
  const [projectList, _setSchedules] = useState<IProjectTimeline[]>(data.data);
  const {isOpen, onOpen, onClose} = useDisclose();

  //*********************NOTIFICATION PROVIDER **************** */
  const toast = useToast();

  //handle show notification
  const showNotification = useCallback(
    (
      message: string,
      messageType: 'success' | 'error',
      extraMessage?: string,
    ) => {
      toast.show({
        title: message,
        variant: messageType,
        description: extraMessage,
        duration: 2000,
      });
    },
    [toast],
  );

  const {
    data: projectData,
    isSuccess,
    isLoading,
    isError,
  } = ProjectAPI.useGetAllProjectTimeline(showNotification);

  const projectTimeline = {
    projects: isSuccess ? projectData : [],
    isLoadingProject: isLoading,
    isSuccessFetchingProject: isSuccess,
    isErrorFetchingProject: isError,
  };

  console.log('projectTimeline Data: ', projectTimeline.projects);

  return (
    <SafeAreaView style={styles.rootActionTimeline}>
      <StatusBar />
      <FooterMenu isOpen={isOpen} onClose={onClose} />
      <HStack style={styles.header}>
        <Text style={styles.copyright}>@2023 Doxle</Text>
        <Button style={styles.buttonDownload}>
          <Text style={styles.buttonDownloadText}>Download Doxle</Text>
        </Button>
      </HStack>
      <HStack style={styles.timelineHeading}>
        <Text style={styles.textTimeline}>Timeline</Text>
        <Image
          source={require('../../../assets/images/calendar-outline.png')}
          alt="calendar"
          style={styles.imageCalendar}
        />
      </HStack>
      <HStack style={styles.tabGroup}>
        {TabList.map((tab, index) => (
          <Button
            key={index}
            style={[
              styles.buttonDownload,
              styles.buttonTimeline,
              tab.isActive ? styles.buttonTimelineActive : null,
            ]}>
            <Text
              style={{
                ...styles.buttonDownloadText,
                ...styles.buttonTimelineText,
              }}>
              {tab.name}
            </Text>
          </Button>
        ))}
      </HStack>
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Search"
          borderRadius={13}
          placeholderTextColor={'#000000'}
          style={styles.input}
          value={keyword}
          type="text"
          onChangeText={setKeyword}
        />
      </View>
      <HStack style={styles.calendarButtonGroup}>
        <Button style={styles.buttonExport}>
          <Text style={styles.buttonExportText}>Export CSV</Text>
        </Button>
        <Box alignItems="center">
          <Menu
            offset={7}
            placement="bottom right"
            trigger={triggerProps => {
              return (
                <Pressable accessibilityLabel="calendar" {...triggerProps}>
                  <Button
                    disabled
                    style={[styles.buttonExport, styles.buttonCalendar]}>
                    <Text
                      style={[
                        styles.buttonExportText,
                        styles.buttonCalendarText,
                      ]}>
                      Calendar
                    </Text>
                  </Button>
                </Pressable>
              );
            }}>
            <Menu.Item style={styles.menuItem}>Table</Menu.Item>
            <Menu.Item style={styles.menuItem}>Gantt</Menu.Item>
            <Menu.Item style={styles.menuItem}>Call Forward</Menu.Item>
            <Menu.Item style={styles.menuItem}>Matrix</Menu.Item>
          </Menu>
        </Box>
      </HStack>
      <FlatList
        data={projectList}
        keyExtractor={item => item.projectId}
        style={styles.projectList}
        renderItem={({item}) => (
          <Project
            projectId={item.projectId}
            siteAddress={item.siteAddress}
            actions={item.actions}
            scheduleItems={item.scheduleItems}
            onOpen={onOpen}
          />
        )}
      />
    </SafeAreaView>
  );
}

const BOX_WIDTH = 139;
const BOX_HEIGHT = 139;
const BOX_MARGIN = 1.5;

const styles = StyleSheet.create({
  rootActionTimeline: {
    backgroundColor: colors.lightBackground,
    flex: 1,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 21,
    paddingRight: 28,
    backgroundColor: '#ffffff',
  },
  copyright: {
    color: colors.black,
    fontFamily: 'IBMPlexMono-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.8,
  },
  buttonDownload: {
    minWidth: 112,
    height: 24,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 30,
    borderRadius: 13,
  },
  buttonDownloadText: {
    fontFamily: 'IBMPlexSans-Medium',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    color: colors.white,
  },
  timelineHeading: {
    marginTop: 25,
    alignItems: 'center',
  },
  textTimeline: {
    fontFamily: 'IBMPlexSans-SemiBold',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 21,
    lineHeight: 27,
    letterSpacing: 0.8,
    color: '#000000',
    paddingLeft: 21,
    paddingRight: 6,
  },
  imageCalendar: {
    width: 24,
    height: 24,
  },
  tabGroup: {
    marginTop: 16,
  },
  buttonTimeline: {
    minWidth: 0,
    maxWidth: 99,
    width: '100%',
    height: 27,
    backgroundColor: 'transparent',
    flex: 1,
  },
  buttonTimelineActive: {
    backgroundColor: '#fff',
  },
  buttonTimelineText: {color: colors.black},
  inputWrapper: {
    paddingLeft: 29,
    paddingRight: 40,
    marginTop: 19,
  },
  input: {
    height: 30,
    backgroundColor: '#E3E5EB',
    fontFamily: 'IBMPlexMono-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
  },
  calendarButtonGroup: {
    marginTop: 67,
    gap: 3,
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
  },
  buttonExport: {
    width: 82,
    height: 18,
    backgroundColor: '#DCDEE6',
    borderRadius: 3,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonExportText: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '500',
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
  },
  buttonCalendar: {
    backgroundColor: colors.buttonPurple,
    width: 63,
  },
  buttonCalendarText: {
    color: '#fff',
  },

  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFF1F6',
  },

  // Project
  projectList: {
    marginTop: 12,
    flex: 1,
  },
  project: {
    marginBottom: 50,
  },
  textAddress: {
    fontSize: 13,
    lineHeight: 17,
    marginLeft: 2,
    marginBottom: 10,
  },
  cellScrollView: {},
  cellContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: BOX_WIDTH * 6 + BOX_MARGIN * 2 * 6 + 4,
  },
  cellDay: {
    width: BOX_WIDTH,
    margin: BOX_MARGIN,
    paddingLeft: 8,
    justifyContent: 'center',
    fontSize: 9,
    lineHeight: 12,
    letterSpacing: 0.05,
    color: '#9696F3',
  },
  cellBox: {
    width: BOX_WIDTH,
    height: BOX_HEIGHT,
    margin: BOX_MARGIN,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 2,
  },
  cellDateNumber: {
    fontFamily: 'IBMPlexMono-Regular',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: '#5F5FDB',
  },

  // Subject List
  subjectList: {
    marginTop: 7,
    marginRight: 10,
  },
  subjectContainer: {
    marginBottom: 4,
  },
  checkbox: {
    marginRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    borderColor: '#6D778C',
    borderRadius: 2,
    borderWidth: 0.5,
    marginVertical: 2,
  },
  subjectName: {
    fontSize: 11,
    lineHeight: 14,
    marginTop: 1,
  },
  footerMenuGroup: {},
  footerMenuItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  footerMenuItemText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#0000FF',
  },
  textRed: {
    color: '#FF0000',
  },
});

export default ActionTimeline;
