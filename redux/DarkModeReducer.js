import { createSlice } from "@reduxjs/toolkit";
import {
  Provider as PaperProvider,
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from "react-native-paper";
import {
  InitialState,
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const combinedDefaultTheme = {
  ...MD3LightTheme,
  ...LightTheme,
  colors: {
    primary: "#37BD69",
    onPrimary: "#FFFFFF",
    primaryContainer: "#52F990",
    onPrimaryContainer: "#1F515B",
    secondary: "#00D6C9",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#AFEFEB",
    onSecondaryContainer: "#1F415B",
    tertiary: "#FA6140",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFBDA8",
    onTertiaryContainer: "#250E01",
    error: "#E93353",
    onError: "#FFFFFF",
    errorContainer: "#FFD3D3",
    onErrorContainer: "#4A0415",
    background: "#F7FDFB",
    onBackground: "#1F415B",
    surface: "#F7FDFB",
    onSurface: "#1F415B",
    surfaceVariant: "#DAE7DF",
    onSurfaceVariant: "#44544A",
    outline: "#839D8D",
    outlineVariant: "#C3CEC7",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 46)",
    inverseOnSurface: "rgb(240, 241, 236)",
    inversePrimary: "rgb(94, 223, 134)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 246, 237)",
      level2: "rgb(232, 242, 232)",
      level3: "rgb(224, 237, 226)",
      level4: "rgb(222, 236, 224)",
      level5: "rgb(217, 233, 220)",
    },
    surfaceDisabled: "rgba(25, 28, 25, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 25, 0.38)",
    backdrop: "rgba(43, 50, 43, 0.4)",
  },
};

const combinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    primary: "#00D689",
    onPrimary: "#1F515B",
    primaryContainer: "#37BD69",
    onPrimaryContainer: "#FFFFFF",
    secondary: "#89BFFF",
    onSecondary: "#1F415B",
    secondaryContainer: "#2B84ED",
    onSecondaryContainer: "#FFFFFF",
    tertiary: "#FF8D74",
    onTertiary: "#250E01",
    tertiaryContainer: "#FA6D40",
    onTertiaryContainer: "#FFDACE",
    error: "#FFA9A9",
    onError: "#4A0415",
    errorContainer: "#E93353",
    onErrorContainer: "#FFD3D3",
    background: "#1F415B",
    onBackground: "#F7FDFB",
    surface: "#1F415B",
    onSurface: "#F7FDFB",
    surfaceVariant: "#44544A",
    onSurfaceVariant: "#DAE7DF",
    outline: "#839D8D",
    outlineVariant: "#C3CEC7",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(226, 227, 222)",
    inverseOnSurface: "rgb(46, 49, 46)",
    inversePrimary: "rgb(0, 109, 53)",
    elevation: {
      level0: "transparent",
      level1: "rgb(28, 38, 30)",
      level2: "rgb(31, 44, 34)",
      level3: "rgb(33, 50, 37)",
      level4: "rgb(33, 51, 38)",
      level5: "rgb(35, 55, 40)",
    },
    surfaceDisabled: "rgba(226, 227, 222, 0.12)",
    onSurfaceDisabled: "rgba(226, 227, 222, 0.38)",
    backdrop: "rgba(43, 50, 43, 0.4)",
  },
};

const initialState = {
  darkMode: false,
  theme: {
    ...combinedDefaultTheme,
    fonts: configureFonts({
      config: {
        fontFamily: "InterMedium",
      },
    }),
  },
};

export const DarkModeReducer = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      state.theme = state.darkMode ? combinedDarkTheme : combinedDefaultTheme;
    },
  },
});

export const { setDarkMode } = DarkModeReducer.actions;
export default DarkModeReducer.reducer;
