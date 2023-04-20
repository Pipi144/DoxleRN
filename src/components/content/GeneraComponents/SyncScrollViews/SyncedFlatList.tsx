import {useContext, useEffect, useRef, useState} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import Animated, {
  event,
  runOnUI,
  scrollTo,
  SharedValue,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  ISyncScrollViewProps,
  useSyncScrollView,
} from './SyncScrollViewProvider';

// ----------------------------------------------------------------------------

interface SyncedFlatlistProps extends FlatListProps<any> {
  idFlatlist: number;
  scrollAnimatedValue?: SharedValue<number>;
  vertialScrollAnimatedValue?: SharedValue<number>; //used to control the appearance of the period icon in timeline table
}

export const SyncedFlatlist = (props: SyncedFlatlistProps) => {
  const {idFlatlist, scrollAnimatedValue, vertialScrollAnimatedValue, ...rest} =
    props;
  const {activeFlatlist, offsetFlatlistPercent} =
    useSyncScrollView() as ISyncScrollViewProps;

  // Get relevant Flatlist Dimensions --------------------------------------------------

  const [flatlistLength, setflatlistLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);

  // const [scrollableLength, setScrollableLength] = useState(0);
  const scrollableLength = useSharedValue(0);
  const handleLayout = ({
    nativeEvent: {
      layout: {width, height},
    },
  }: any) => {
    // The length of the flatlist depends on the orientation we scroll in
    setflatlistLength(props.horizontal ? width : height);
  };

  const handleContentSizeChange = (width: number, height: number) => {
    // The length of the content inside the scrollView depends on the orientation we scroll in
    setContentLength(props.horizontal ? width : height);
  };
  // Calculate the scrollable Length everytime the contentLength or flatlistLength changes
  useEffect(() => {
    // The scrollable length is the difference between the content length and the scrollview length
    runOnUI(assignFlatlistSize)(contentLength - flatlistLength);
  }, [flatlistLength, contentLength]);
  const assignFlatlistSize = (scrollableSize: number) => {
    'worklet';
    scrollableLength.value = scrollableSize;
  };

  // handle yPercent change ----------------------------------------------------

  const flatlistRef = useAnimatedRef<Animated.FlatList<any>>();

  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: event => {
        offset.value = props.horizontal
          ? event.contentOffset.x
          : event.contentOffset.y;
        if (scrollAnimatedValue && idFlatlist === activeFlatlist.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
        if (vertialScrollAnimatedValue && idFlatlist === activeFlatlist.value)
          vertialScrollAnimatedValue.value = withSpring(1, {
            damping: 20,
            mass: 4,
          });
      },

      onMomentumBegin: event => {
        offset.value = props.horizontal
          ? event.contentOffset.x
          : event.contentOffset.y;

        if (scrollAnimatedValue && idFlatlist === activeFlatlist.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
        if (vertialScrollAnimatedValue && idFlatlist === activeFlatlist.value)
          vertialScrollAnimatedValue.value = withSpring(1, {
            damping: 20,
            mass: 4,
          });
      },
      onMomentumEnd: event => {
        offset.value = props.horizontal
          ? event.contentOffset.x
          : event.contentOffset.y;
        if (scrollAnimatedValue && idFlatlist === activeFlatlist.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
        if (vertialScrollAnimatedValue && idFlatlist === activeFlatlist.value)
          vertialScrollAnimatedValue.value = withSpring(0, {
            damping: 20,
            mass: 4,
          });
      },
    },
    [],
  );

  useAnimatedReaction(
    () => {
      return offsetFlatlistPercent.value;
    },
    (next, prev) => {
      if (prev !== next) {
        if (
          idFlatlist !== activeFlatlist.value &&
          scrollableLength.value !== 0
        ) {
          // console.log('ID MATCH:', idScrollViews);
          // scrollViewRef.current?.scrollTo({
          //   x: props.horizontal ? next * scrollableLength.value : 0,
          //   y: props.horizontal ? 0 : next * scrollableLength.value,
          //   animated: false,
          // });
          scrollTo(
            flatlistRef,
            props.horizontal ? next * scrollableLength.value : 0,
            props.horizontal ? 0 : next * scrollableLength.value,
            false,
          );
        }
      }
    },
    [offsetFlatlistPercent],
  );
  useAnimatedReaction(
    () => {
      return offset.value;
    },
    (next, prev) => {
      if (next !== prev) {
        if (
          idFlatlist === activeFlatlist.value &&
          scrollableLength.value !== 0
        ) {
          offsetFlatlistPercent.value = next / scrollableLength.value;
        }

        // runOnUI(updateScrollAnimatedValue)(next);
      }
    },
    [offset],
  );

  // onTouch ----------------------------------------------------------------------------

  // Change this ScrollView to the active ScrollView when it is touched
  const handleTouchStart = () => {
    activeFlatlist.value = idFlatlist;
    if (vertialScrollAnimatedValue && idFlatlist === activeFlatlist.value)
      vertialScrollAnimatedValue.value = withSpring(1, {
        damping: 20,
        mass: 4,
      });
  };
  const handleTouchEnd = () => {
    if (vertialScrollAnimatedValue && idFlatlist === activeFlatlist.value)
      vertialScrollAnimatedValue.value = withSpring(0, {
        damping: 10,
        mass: 10,
      });
  };
  return (
    <Animated.FlatList
      {...rest}
      ref={flatlistRef}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};
