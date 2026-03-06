import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, AccessibilityInfo } from 'react-native';

// Components
import SwipeThumb from './swipeThumb';

// Styles
import styles from './styles';

const SwipeButton = props => {
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  const onLayoutContainer = async e => {
    if (isUnmounting || layoutWidth) {
      return;
    }
    setLayoutWidth(e.nativeEvent.layout.width);
  };

  useEffect(() => {
    const handleScreenReaderToggled = isEnabled => {
      if (isUnmounting || screenReaderEnabled === isEnabled) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    };
    setIsUnmounting(false);
    const subscription = AccessibilityInfo.addEventListener('change', handleScreenReaderToggled);

    AccessibilityInfo.isScreenReaderEnabled().then(isEnabled => {
      if (isUnmounting) {
        return;
      }
      setScreenReaderEnabled(isEnabled);
    });

    return () => {
      setIsUnmounting(true);
      subscription.remove();
    };
  }, [isUnmounting, screenReaderEnabled]);

  const {
    containerStyles,
    disabled,
    disabledRailBackgroundColor,
    disabledThumbIconBackgroundColor,
    disabledThumbIconBorderColor,
    disableResetOnTap,
    enableReverseSwipe,
    forceReset,
    height,
    onSwipeFail,
    onSwipeStart,
    onSwipeSuccess,
    railBackgroundColor,
    railBorderColor,
    railFillBackgroundColor,
    railFillBorderColor,
    railStyles,
    resetAfterSuccessAnimDelay,
    resetAfterSuccessAnimDuration,
    shouldResetAfterSuccess,
    swipeSuccessThreshold,
    thumbIconBackgroundColor,
    thumbIconBorderColor,
    thumbIconComponent,
    thumbIconImageSource,
    thumbIconStyles,
    thumbIconWidth,
    title,
    titleMaxFontScale,
    titleStyles,
    width,
    status,
  } = props;
  return (
    <View
      style={[
        styles.swipeContainer,
        {
          ...containerStyles,
          backgroundColor: disabled
            ? disabledRailBackgroundColor
            : railBackgroundColor,
          borderColor: railBorderColor,
          ...(width ? { width } : {}),
        },
      ]}
      onLayout={onLayoutContainer}>
      <Text
        maxFontSizeMultiplier={titleMaxFontScale}
        ellipsizeMode={'tail'}
        numberOfLines={1}
        importantForAccessibility={
          screenReaderEnabled ? 'no-hide-descendants' : ''
        }
        style={[
          styles.title,
          {
            ...titleStyles,
          },
        ]}>
        {title}
      </Text>
      {layoutWidth > 0 && (
        <SwipeThumb
          disabled={disabled}
          disabledThumbIconBackgroundColor={disabledThumbIconBackgroundColor}
          disabledThumbIconBorderColor={disabledThumbIconBorderColor}
          disableResetOnTap={disableResetOnTap}
          enableReverseSwipe={enableReverseSwipe}
          forceReset={forceReset}
          layoutWidth={layoutWidth}
          onSwipeFail={onSwipeFail}
          onSwipeStart={onSwipeStart}
          onSwipeSuccess={onSwipeSuccess}
          railFillBackgroundColor={railFillBackgroundColor}
          railFillBorderColor={railFillBorderColor}
          railStyles={railStyles}
          resetAfterSuccessAnimDelay={resetAfterSuccessAnimDelay}
          resetAfterSuccessAnimDuration={resetAfterSuccessAnimDuration}
          screenReaderEnabled={screenReaderEnabled}
          shouldResetAfterSuccess={shouldResetAfterSuccess}
          swipeSuccessThreshold={swipeSuccessThreshold}
          thumbIconBackgroundColor={thumbIconBackgroundColor}
          thumbIconBorderColor={thumbIconBorderColor}
          thumbIconComponent={thumbIconComponent}
          thumbIconHeight={height}
          thumbIconImageSource={thumbIconImageSource}
          thumbIconStyles={thumbIconStyles}
          thumbIconWidth={thumbIconWidth}
          title={title}
          status={status}
        />
      )}
    </View>
  );
};

SwipeButton.defaultProps = {
  containerStyles: {},
  disabled: false,
  disabledRailBackgroundColor: "#CBCBCB",
  disabledThumbIconBackgroundColor: "#D3D3D3",
  disabledThumbIconBorderColor: "#3C3C3C",
  disableResetOnTap: false,
  height: 50,
  railBackgroundColor: "#7CF3F9",
  railBorderColor: "#073436",
  railFillBackgroundColor: "#D27030AA",
  railFillBorderColor: "#3D797C",
  swipeSuccessThreshold: 70,
  thumbIconBackgroundColor: "#D27030",
  thumbIconBorderColor: "#3C3C3C",
  thumbIconStyles: {},
  title: 'Swipe to submit',
  titleStyles: {},
  status:true
};

SwipeButton.propTypes = {
  containerStyles: PropTypes.object,
  disable: PropTypes.bool,
  disabledRailBackgroundColor: PropTypes.string,
  disabledThumbIconBackgroundColor: PropTypes.string,
  disabledThumbIconBorderColor: PropTypes.string,
  disableResetOnTap: PropTypes.bool,
  enableReverseSwipe: PropTypes.bool,
  forceReset: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onSwipeFail: PropTypes.func,
  onSwipeStart: PropTypes.func,
  onSwipeSuccess: PropTypes.func,
  railBackgroundColor: PropTypes.string,
  railBorderColor: PropTypes.string,
  railFillBackgroundColor: PropTypes.string,
  railFillBorderColor: PropTypes.string,
  railStyles: PropTypes.object,
  resetAfterSuccessAnimDelay: PropTypes.number,
  resetAfterSuccessAnimDuration: PropTypes.number,
  shouldResetAfterSuccess: PropTypes.bool,
  swipeSuccessThreshold: PropTypes.number, // Ex: 70. Swipping 70% will be considered as successful swipe
  thumbIconBackgroundColor: PropTypes.string,
  thumbIconBorderColor: PropTypes.string,
  thumbIconComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.func,
  ]),
  thumbIconImageSource: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  thumbIconStyles: PropTypes.object,
  thumbIconWidth: PropTypes.number,
  title: PropTypes.string,
  titleMaxFontScale: PropTypes.number,
  titleStyles: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.bool
};

export default SwipeButton;
