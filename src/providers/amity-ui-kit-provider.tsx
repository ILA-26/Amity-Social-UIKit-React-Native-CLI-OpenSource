import * as React from 'react';
import { useColorScheme } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import AuthContextProvider from './auth-provider';
import { DefaultTheme, PaperProvider, type MD3Theme } from 'react-native-paper';
import { store } from '../redux/store';
import { ConfigProvider } from './config-provider';
import { IConfigRaw } from '../v4/types/config.interface';
import { validateConfigColor } from '../util/colorUtil';
import useValidateConfig from '../v4/hook/useValidateConfig';
import fallBackConfig from '../../uikit.config.json';
import { BehaviourProvider } from '../v4/providers/BehaviourProvider';
import { IBehaviour } from '../v4/types/behaviour.interface';
import { lighten, parseToHsl, hslToColorString } from 'polished';
import externalSlice from '../redux/slices/externalSlice';

export type CusTomTheme = typeof DefaultTheme;
export interface IAmityUIkitProvider {
  userId: string;
  displayName?: string;
  apiKey: string;
  apiRegion?: string;
  apiEndpoint?: string;
  children: any;
  authToken?: string;
  configs?: IConfigRaw;
  behaviour?: IBehaviour;
  fcmToken?: string;
  avatarImgUrl?: string;
  isPostPopUpOpen?: boolean;
}

export interface CustomColors {
  primary?: string;
  primaryShade1?: string;
  primaryShade2?: string;
  primaryShade3?: string;
  primaryShade4?: string;
  secondary?: string;
  secondaryShade1?: string;
  secondaryShade2?: string;
  secondaryShade3?: string;
  secondaryShade4?: string;
  background?: string;
  base?: string;
  baseShade1?: string;
  baseShade2?: string;
  baseShade3?: string;
  baseShade4?: string;
  alert?: string;
}
export interface MyMD3Theme extends MD3Theme {
  colors: MD3Theme['colors'] & CustomColors;
}
function App({
  userId,
  displayName,
  apiKey,
  apiRegion,
  apiEndpoint,
  children,
  authToken,
  configs,
  behaviour,
  fcmToken,
  avatarImgUrl,
  isPostPopUpOpen,
}: IAmityUIkitProvider) {
  const colorScheme = useColorScheme();

  const { updateAvatarUrl, updatePopUpState } = externalSlice.actions;

  const dispatch = useDispatch();

  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    dispatch(updateAvatarUrl(avatarImgUrl));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatarImgUrl]);

  React.useEffect(() => {
    if (hasMounted.current) {
      dispatch(updatePopUpState(true));
    } else {
      hasMounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPostPopUpOpen]);

  const SHADE_PERCENTAGES = [0.25, 0.4, 0.45, 0.6];

  const generateShades = (hexColor?: string): string[] => {
    if (!hexColor) return Array(SHADE_PERCENTAGES.length).fill('');
    const hslColor = parseToHsl(hexColor);
    const shades = SHADE_PERCENTAGES.map((percentage) => {
      return lighten(percentage, hslToColorString(hslColor));
    });
    return shades;
  };
  const isValidConfig = useValidateConfig(configs);
  const configData = isValidConfig ? configs : (fallBackConfig as IConfigRaw);
  const isDarkTheme =
    configData?.preferred_theme === 'dark' ||
    (configData?.preferred_theme === 'default' && colorScheme === 'dark');
  const themeColor = isDarkTheme
    ? configData.theme.dark
    : configData.theme.light;
  const primaryShades = generateShades(themeColor.primary_color);
  const secondaryShades = generateShades(themeColor.secondary_color);
  const globalTheme: MyMD3Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: validateConfigColor(themeColor?.primary_color),
      primaryShade1: validateConfigColor(primaryShades[0]),
      primaryShade2: validateConfigColor(primaryShades[1]),
      primaryShade3: validateConfigColor(primaryShades[2]),
      primaryShade4: validateConfigColor(primaryShades[3]),
      secondary: validateConfigColor(themeColor?.secondary_color),
      secondaryShade1: validateConfigColor(secondaryShades[0]),
      secondaryShade2: validateConfigColor(secondaryShades[1]),
      secondaryShade3: validateConfigColor(secondaryShades[2]),
      secondaryShade4: validateConfigColor(secondaryShades[3]),
      background: validateConfigColor(themeColor?.background_color),
      base: validateConfigColor(themeColor?.base_color),
      baseShade1: validateConfigColor(themeColor?.base_shade1_color),
      baseShade2: validateConfigColor(themeColor?.base_shade2_color),
      baseShade3: validateConfigColor(themeColor?.base_shade3_color),
      baseShade4: validateConfigColor(themeColor?.base_shade4_color),
      alert: validateConfigColor(themeColor?.alert_color),
    },
  };

  return (
    <AuthContextProvider
      userId={userId}
      displayName={displayName || userId}
      apiKey={apiKey}
      apiRegion={apiRegion}
      apiEndpoint={apiEndpoint}
      authToken={authToken}
      fcmToken={fcmToken}
    >
      <ConfigProvider configs={configData}>
        <BehaviourProvider behaviour={behaviour}>
          <PaperProvider theme={globalTheme}>{children}</PaperProvider>
        </BehaviourProvider>
      </ConfigProvider>
    </AuthContextProvider>
  );
}

export default function AmityUiKitProvider(props: IAmityUIkitProvider) {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
}
