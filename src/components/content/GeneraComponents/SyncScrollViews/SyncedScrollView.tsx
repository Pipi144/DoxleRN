import {useEffect, useState} from 'react';
import {ScrollViewProps} from 'react-native';
import {
  ISyncScrollViewProps,
  useSyncScrollView,
} from './SyncScrollViewProvider';
import Animated, {
  useSharedValue,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedReaction,
  useAnimatedRef,
  scrollTo,
  runOnUI,
} from 'react-native-reanimated';

// ----------------------------------------------------------------------------

interface SyncedScrollViewProps extends ScrollViewProps {
  idScrollViews: number;
  scrollAnimatedValue?: SharedValue<number>;
}

export const SyncedScrollView = (props: SyncedScrollViewProps) => {
  const {idScrollViews, scrollAnimatedValue, ...rest} = props;

  const {activeScrollView, offsetPercent} =
    useSyncScrollView() as ISyncScrollViewProps;

  // Get relevant ScrollView Dimensions --------------------------------------------------

  const [scrollViewLength, setScrollViewLength] = useState(0);
  const [contentLength, setContentLength] = useState(0);

  // const [scrollableLength, setScrollableLength] = useState<number | undefined>(
  //   undefined,
  // );
  const scrollableLength = useSharedValue(0);
  const handleLayout = ({
    nativeEvent: {
      layout: {width, height},
    },
  }: any) => {
    // The length of the scrollView depends on the orientation we scroll in
    setScrollViewLength(props.horizontal ? width : height);
  };

  const handleContentSizeChange = (width: number, height: number) => {
    // The length of the content inside the scrollView depends on the orientation we scroll in
    setContentLength(props.horizontal ? width : height);
  };
  // Calculate the scrollable Length everytime the contentLength or scrollViewLength changes
  useEffect(() => {
    runOnUI(assignScrollViewSize)(contentLength - scrollViewLength);
  }, [scrollViewLength, contentLength]);
  const assignScrollViewSize = (scrollableSize: number) => {
    'worklet';
    scrollableLength.value = scrollableSize;
  };

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();

  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    {
      onScroll: event => {
        offset.value = event.contentOffset.x;
        if (scrollAnimatedValue && idScrollViews === activeScrollView.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
      },
      onMomentumBegin: event => {
        offset.value = event.contentOffset.x;
        if (scrollAnimatedValue && idScrollViews === activeScrollView.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
      },
      onMomentumEnd: event => {
        offset.value = event.contentOffset.x;
        if (scrollAnimatedValue && idScrollViews === activeScrollView.value)
          scrollAnimatedValue.value = props.horizontal
            ? event.contentOffset.x
            : event.contentOffset.y;
      },
    },
    [],
  );

  useAnimatedReaction(
    () => {
      return offsetPercent.value;
    },
    (next, prev) => {
      if (prev !== next) {
        if (
          idScrollViews !== activeScrollView.value &&
          scrollableLength.value !== 0
        ) {
          // console.log('ID MATCH:', idScrollViews);
          // scrollViewRef.current?.scrollTo({
          //   x: props.horizontal ? next * scrollableLength.value : 0,
          //   y: props.horizontal ? 0 : next * scrollableLength.value,
          //   animated: false,
          // });
          scrollTo(
            scrollViewRef,
            props.horizontal ? next * scrollableLength.value : 0,
            props.horizontal ? 0 : next * scrollableLength.value,
            false,
          );
        }
      }
    },
    [],
  );
  useAnimatedReaction(
    () => {
      return offset.value;
    },
    (next, prev) => {
      if (next !== prev) {
        if (
          idScrollViews === activeScrollView.value &&
          scrollableLength.value !== 0
        ) {
          offsetPercent.value = next / scrollableLength.value;
        }

        // runOnUI(updateScrollAnimatedValue)(next);
      }
    },
    [],
  );

  const handleTouchStart = () => {
    activeScrollView.value = idScrollViews;
  };

  return (
    <Animated.ScrollView
      {...rest}
      ref={scrollViewRef}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onTouchStart={handleTouchStart}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
    />
  );
};
