import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  navigation: any;
};

const Files = ({navigation}: Props) => {
  console.log('RENDER FILES');
  return (
    <View>
      <Text>Files</Text>
    </View>
  );
};

export default Files;

const styles = StyleSheet.create({});
