import React from 'react';
import {
  View,
  TextInput as NativeTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputKeyPressEventData,
  StyleSheet,
  Text,
} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {Action} from '../../types';
import {useUniqueId} from '../../utils/uniqueId';
import {Connected} from './Connected';

import IonIcons from 'react-native-vector-icons/Ionicons';

export type TextInputProps = {
  /** id của form input */
  id?: string;
  /** Tên của form input */
  name?: string;
  /** Giá trị ban đầu của TextField */
  value?: string;
  /** Kiểu của TextField */
  type?:
    | 'text'
    | 'email'
    | 'integer'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'currency'
    | 'date'
    | 'datetime-local'
    | 'month'
    | 'time'
    | 'week';
  /** Buộc focus vào input của TextField */
  focused?: boolean;
  /** Nội dung custom label */
  customLabel?: React.ReactNode|string;
  /** Hành động của custom label */
  labelAction?: Action;
  /** Thông tin mô tả form input */
  helpText?: string;
  /** Thuộc tính role cho input */
  role?: string;
  /** Lỗi hiển thị bên dưới TextField */
  error?: Error | boolean;
  /** Hiển thị thông tin input là bắt buộc */
  requiredIndicator?: boolean;
  /** Phần tử hiển thị bên trái input */
  /** Phần tử hiển thị bên trái input */
  connectedLeft?: React.ReactNode;
  /** Phần tử hiển thị bên phải input */
  connectedRight?: React.ReactNode;
  /**
   * Gộp các item lại với nhau
   * @default true
   * */
  connectedSegmented?: boolean /** Giới hạn giá trị tối đa của TextField. Chỉ hỗ trợ type = number */;
  /** Phần tử trước giá trị */
  prefix?: React.ReactNode;
  /** Phần tử sau giá trị */
  suffix?: React.ReactNode;
  /** Cho phép nhập nhiều dòng */
  multiline?: boolean | number;
  /** Trạng thái disabled của TextField */
  disabled?: boolean;
  /** Trạng thái chỉ đọc của TextField */
  readOnly?: boolean;
  /** Tự động focus vào input của TextField */
  autoFocus?: boolean;
  /** Placeholder trong input của TextField */
  placeholder?: string;
  /**
   * Cho phép hoàn thành tự động bởi trình duyệt của TextField
   * @default "off"
   * */
  autoComplete?: string;
  /** Giới hạn số lượng kí tự tối đa của TextField */
  maxLength?: number;
  /** Giới hạn giá trị tối thiểu của TextField. Chỉ hỗ trợ type = number, date */
  minLength?: number;
  /** Biểu thức chính quy kiểm tra giá trị TextField */
  pattern?: string;
  /** Bật bộ đếm ký tự */
  showCharacterCount?: boolean;
  /**
   * Căn text hiển thị trong input
   * @default "left"
   * */
  align?: 'left' | 'center' | 'right';
  /**
   * Bỏ border, thường được dùng trong ô search trong popover
   * */
  borderless?: boolean;
  /** Callback nếu input focused */
  onFocus?: (event?: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  /** Callback nếu input blur */
  onBlur?(event?: NativeSyntheticEvent<TextInputFocusEventData>): void;
  /** Callback nếu giá trị value thay đổi */
  onChange?(value: string, id: string, formattedValue?: string): void;
  /** Có nút clear */
  clearButton?: boolean;
  /** Callback khi nút clear được click */
  onClearButtonClick?(): void;
};

export const TextField = ({
  id: idProp,
  name,
  value,
  type = 'text',
  focused,
  borderless,
  customLabel,
  helpText,
  role,
  error,
  requiredIndicator,
  connectedLeft,
  connectedRight,
  connectedSegmented = true,
  prefix,
  suffix,
  multiline,
  disabled,
  readOnly,
  autoFocus,
  placeholder,
  autoComplete = 'off',
  maxLength,
  minLength,
  pattern,
  showCharacterCount,
  align = 'left',
  onFocus,
  onBlur,
  onChange,
  clearButton,
  onClearButtonClick,
  ...rest
}: TextInputProps) => {
  const [focus, setFocus] = React.useState(Boolean(focused));
  const [cursor, setCursor] = React.useState<number>(0);
  const [selection, setSelection] = React.useState<{
    start: number;
    end: number;
  }>({start: cursor, end: cursor});
  const textInputRef = React.useRef<NativeTextInput>(null);
  const isNumeric = type === 'number' || type === 'integer';

  React.useEffect(() => {
    if (textInputRef.current && typeof focused === 'boolean') {
      if (focused) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [focused, textInputRef]);

  const id = useUniqueId('Textinput', idProp);

  React.useEffect(() => {
    if (textInputRef.current && type === 'currency' && value) {
      setSelection({start: cursor, end: cursor});
    }
  }, [textInputRef, cursor, value, type]);

  const handleClearButtonClick = () => {
    clearButton && onClearButtonClick?.();
  };

  const clearButtonMarkup =
    clearButton && value ? (
      <TextInput.Icon
        icon="close-circle"
        onPress={handleClearButtonClick}
        color={disabled ? 'rgba(0, 0, 0, 0.26)' : 'rgba(0, 0, 0, 0.54)'}
        style={styles.clearButton}
      />
    ) : null;

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(true);
    onFocus?.(e as NativeSyntheticEvent<TextInputFocusEventData>);
  };

  const handleChangeText = (text: string) => {
    if (type === 'currency') {
      const cursorTemp = getRangeSelection(text, selection.start ?? 0);
      if (cursorTemp !== cursor) {
        setCursor(cursorTemp);
      }
      onChange && onChange(unformatCurrency(text), id, text);
    } else {
      onChange && onChange(text, id);
    }
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocus(false);
    onBlur?.(e as NativeSyntheticEvent<TextInputFocusEventData>);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    const {key} = e.nativeEvent;
    const currencySpec = /[\d.,]$/;
    const numbersSpec = /[\d.,eE+-]$/;
    const integerSpec = /[\deE+-]$/;
    if (
      !(isNumeric || type === 'currency') ||
      key === 'Enter' ||
      (type === 'number' && numbersSpec.test(key)) ||
      (type === 'integer' && integerSpec.test(key)) ||
      (type === 'currency' && currencySpec.test(key))
    ) {
      return;
    }
  };

  const inputType = type === 'currency' ? 'text' : isNumeric ? 'number' : type;
  const normalizedValue =
    value && type === 'currency' ? formatNumber(value) : value;

  const argsInput: any = {
    id,
    name,
    value: normalizedValue,
    disabled,
    readOnly,
    autoFocus,
    placeholder,
    autoComplete,
    ref: textInputRef,
    minLength,
    maxLength,
    pattern,
    type: inputType,
    numberOfLines: getRows(multiline),
    focused: focus,
    role,
    error,
    textAlign: align,
    requiredIndicator,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onChangeText: handleChangeText,
    onKeyPress: handleKeyPress,
  };

  const input = <TextInput style={{flex:1, ...(prefix && {paddingLeft: 30})}} mode="outlined" {...argsInput} {...rest} />;

  const characterCount = normalizedValue?.length ?? 0;
  const characterCountMarkup = showCharacterCount ? (
    <View>
      {!maxLength ? characterCount : `${characterCount}/${maxLength}`}
    </View>
  ) : null;

  const prefixMarkup = prefix ? <View style={{position: 'absolute', left: 15}}>{prefix}</View> : null;

  const suffixMarkup = suffix ? <View style={{position: 'absolute', right: 15}}>{suffix}</View> : null;

  const customlabelMarkup = customLabel ? (
    <View style={{flexDirection: 'row', paddingLeft: 20, paddingVertical: 8}}>
      <Text style={{color: 'black', fontWeight: '500', fontSize: 16}}>{customLabel}</Text>
      {requiredIndicator && <Text style={{color: '#EE4747', fontWeight: '500', fontSize: 16}}> *</Text>}
    </View>
  ) : null;

  const helpTextMarkup = helpText ? (
    <HelperText type="info" visible style={{paddingLeft: 20, paddingBottom: 8}}>{helpText}</HelperText>
  ) : null;

  return (
    <View style={styles.container}>
      {customlabelMarkup}
      <Connected
        left={connectedLeft}
        right={connectedRight}
        segmented={connectedSegmented}
        children={
          <View style={[styles.borderless, styles.inputContainer]}>
            {input}
            {prefixMarkup}
            {suffixMarkup}
            {clearButtonMarkup}
            {characterCountMarkup}
        </View>
        }>
      </Connected>
      {helpTextMarkup}
    </View>
  );
};

const styles = StyleSheet.create({
  borderless: {
    borderWidth: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    gap: 0
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    flex: 1
  },
  clearButton: {
    left: 350
  }
});

function getRows(multiline?: boolean | number) {
  if (!multiline) {
    return undefined;
  }

  return typeof multiline === 'number' ? multiline : 1;
}

function formatNumber(value: string, thousandSeparator = ',') {
  const decimalPos = value.indexOf('.');
  if (decimalPos >= 0) {
    let leftSide = value.substring(0, decimalPos);
    let rightSide = value.substring(decimalPos);
    leftSide = leftSide
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
    rightSide = rightSide.replace(/\D/g, '');
    return `${leftSide}.${rightSide}`;
  } else {
    return value
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  }
}

function unformatCurrency(value: string, thousandSeparator = ',') {
  const regex = new RegExp(`${thousandSeparator}`, 'g');
  return value.replace(regex, '');
}

function getRangeSelection(
  value: string,
  selectionStart = 0,
  thousandSeparator = ',',
) {
  const originalLen = value.length;
  const caretPos = selectionStart;
  const valueFinal = formatNumber(value, thousandSeparator);
  const updatedLen = valueFinal.length;
  return updatedLen - originalLen + caretPos;
}
