import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Skeleton} from 'native-base';

type Props = {};

const ProjectTextSkeleton = (props: Props) => {
  return <Skeleton h="4" w="200" rounded="full" />;
};

export default ProjectTextSkeleton;

const styles = StyleSheet.create({});
