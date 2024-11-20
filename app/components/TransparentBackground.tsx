import { DefaultTheme } from 'react-native-paper';

/** transparent background for modal */
const TransparentBackground = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backdrop: 'transparent',
  },
};

export default TransparentBackground;
