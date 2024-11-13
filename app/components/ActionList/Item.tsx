import React, {useContext} from 'react';
import {ActionListItemDescriptor} from '../../types';
import {
  Alert,
  LayoutChangeEvent,
  Linking,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Button, HelperText, Tooltip} from 'react-native-paper';
import {PopoverContext} from '../Popover/context';

const getStyles = (
  $disable?: boolean,
  $active?: boolean,
  $destructive?: boolean,
) =>
  StyleSheet.create({
    button: {
      margin: 0,
      padding: 0,
      backgroundColor: $active ? '#f2f9ff' : 'transparent',
      cursor: 'pointer',
      width: '100%',
      minHeight: 36,
      textAlign: 'left',
      marginVertical: 2,
      borderRadius: 6,
      borderTopWidth: 1,
      borderTopColor: 'transparent',
      color: $destructive ? '#d32f2f' : $disable ? '#a3a8af' : 'inherit',
      borderColor: $disable ? '#e0e0e0' : 'transparent',
    },
  });

export const Item = ({
  id,
  content,
  accessibilityLabel,
  helpText,
  icon,
  url,
  prefix,
  suffix,
  disabled,
  destructive,
  ellipsis,
  active,
  truncate,
  onAction,
}: ActionListItemDescriptor) => {
  let prefixMarkup: React.ReactNode | null = null;

  if (prefix) {
    prefixMarkup = <View style={styles.prefix}>{prefix}</View>;
  } else if (icon) {
    prefixMarkup = <View style={styles.prefix}>{icon}</View>;
  }

  let contentText: string | React.ReactNode = content || '';
  if (truncate && content) {
    contentText = <TruncateText>{content}</TruncateText>;
  } else if (ellipsis) {
    contentText = `${content}…`;
  }

  const contentMarkup = (
    <View style={styles.textWrapper}>
        <Text style={[{ color: 'black', fontSize: 13, fontWeight: '400' }, destructive && styles.destructiveText]}>{contentText}</Text>
        {helpText && (
          <HelperText type="info" variant="bodyMedium">
            {helpText}
          </HelperText>
        )}
    </View>
  );

  const suffixMarkup = suffix ? <View>{suffix}</View> : null;

  const textMarkup = <View style={styles.textWrapper}>{contentMarkup}</View>;

  const contentElement = (
    <View style={[styles.content, {flexWrap: truncate ? 'nowrap' : 'wrap'}]}>
      {prefixMarkup}
      {textMarkup}
      {suffixMarkup}
    </View>
  );

  const control = url ? (
    <LinkButton
      id={id}
      url={url}
      disabled={disabled}
      active={active}
      destructive={destructive}
      accessibilityLabel={accessibilityLabel}
      onAction={onAction}>
      {contentElement}
    </LinkButton>
  ) : (
    <Button
      id={id}
      disabled={disabled}
      aria-label={accessibilityLabel}
      onPress={onAction}
      style={getStyles(disabled, active, destructive).button}>
      {contentElement}
    </Button>
  );

  return <>{control}</>;
};

const TruncateText = ({children}: {children: string}) => {
  const textRef = React.useRef<Text>(null);
  const [isOverflowing, setIsOverflowing] = React.useState(false);
  const [textWidth, setTextWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const context = useContext(PopoverContext);

  const onTextLayout = (event: LayoutChangeEvent) => {
    setTextWidth(event.nativeEvent.layout.width);
  };

  const onContainerLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  React.useEffect(() => {
    if (
      textRef.current &&
      (context?.isPositioned === undefined || context?.isPositioned === true)
    ) {
      setIsOverflowing(textWidth > containerWidth);
    }
  }, [textWidth, containerWidth, children, context?.isPositioned]);

  return (
    <View onLayout={onContainerLayout}>
      {isOverflowing ? (
        <Tooltip title={children} enterTouchDelay={1000}>
          <Text
            ref={textRef}
            onLayout={onTextLayout}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{width: '100%'}}>
            {children}
          </Text>
        </Tooltip>
      ) : (
        <Text
          ref={textRef}
          onLayout={onTextLayout}
          numberOfLines={1}
          ellipsizeMode="tail">
          {children}
        </Text>
      )}
    </View>
  );
};

const LinkButton = ({
  id,
  url,
  disabled,
  active,
  destructive,
  accessibilityLabel,
  onAction,
  children,
}: {
  id?: string;
  url: string;
  disabled?: boolean;
  active?: boolean;
  destructive?: boolean;
  accessibilityLabel?: string;
  onAction?(): void;
  children: React.ReactNode;
}) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Mở URL
      await Linking.openURL(url);
    } else {
      Alert.alert(`Không thể mở URL: ${url}`);
    }
    disabled ? null : onAction && onAction();
  };

  return (
    <Button
      id={id}
      mode="outlined"
      disabled={disabled}
      aria-label={accessibilityLabel}
      onPress={handlePress}
      style={getStyles(disabled, active, destructive).button}>
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  prefix: {
    flex: 0,
    height: 20,
    width: 20,
    borderRadius: 6,
    marginVertical: -10,
  },
  text: {
    minWidth: 0,
    maxWidth: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  destructiveText: {
    color: '#d32f2f',
  },
  textWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
});
