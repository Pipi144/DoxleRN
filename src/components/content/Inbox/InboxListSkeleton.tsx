import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {Divider, HStack, Skeleton, VStack} from 'native-base';

type Props = {};

const InboxListSkeleton = (props: Props) => {
  const skelArrayDummy: string[] = useMemo(() => Array(20).fill('skel'), []);
  return (
    <FlatList
      data={skelArrayDummy}
      scrollEnabled={false}
      renderItem={({item, index}) => (
        <VStack>
          <HStack
            w="100%"
            maxW="400"
            justifyContent="space-between"
            mb="14px"
            paddingX={'10px'}
            alignItems="center">
            <Skeleton
              startColor="coolGray.200"
              rounded="full"
              w="15%"
              h="14px"
            />

            <Skeleton
              startColor="coolGray.200"
              rounded="full"
              w="45%"
              h="14px"
            />
            <Skeleton
              startColor="coolGray.200"
              rounded="full"
              w="30%"
              h="14px"
            />
          </HStack>

          <Skeleton
            startColor="coolGray.200"
            rounded="full"
            w="100%"
            h="2px"
            mb={4}
          />
        </VStack>
      )}
    />
  );
};

export default InboxListSkeleton;

const styles = StyleSheet.create({});
