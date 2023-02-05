import { SimplePaletteColorOptions } from "@mui/material";
import {
    amber,
    blue,
    cyan,
    deepPurple,
    green,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    teal,
    yellow,
} from "@mui/material/colors";

export enum ThemeMode {
    Light = "light",
    Dark = "dark",
}

export enum ThemeColor {
    Pink = "pink",
    Purple = "purple",
    DeepPurple = "deep purple",
    Indigo = "indigo",
    Blue = "blue",
    LightBlue = "light blue",
    Cyan = "cyan",
    Teal = "teal",
    Green = "green",
    LightGreen = "light green",
    Lime = "lime",
    Yellow = "yellow",
    Amber = "amber",
    Orange = "orange",
}

// export const ThemeColorCode: { [key in ThemeColor]: { [key in ThemeMode]: string } } = {
//     [ThemeColor.Pink]: {
//         [ThemeMode.Light]: pink[400],
//         [ThemeMode.Dark]: pink[300],
//     },
//     [ThemeColor.Purple]: {
//         [ThemeMode.Light]: purple[500],
//         [ThemeMode.Dark]: purple[300],
//     },
// };

// colors taken from MUI Color Tool as the auto-generated colours were not as nice
//   https://m2.material.io/resources/color/#!/?view.left=0&view.right=0
export const ThemeColorFamily: { [key in ThemeColor]: { [key in ThemeMode]: SimplePaletteColorOptions } } = {
    [ThemeColor.Pink]: {
        [ThemeMode.Light]: {
            main: pink[400],
            light: "#ff77a9",
            dark: "#b4004e",
        },
        [ThemeMode.Dark]: {
            main: pink[300],
            light: "#ff94c2",
            dark: "#ba2d65",
        },
    },
    [ThemeColor.Purple]: {
        [ThemeMode.Light]: {
            main: purple[500],
        },
        [ThemeMode.Dark]: {
            main: purple[400],
        },
    },
    [ThemeColor.DeepPurple]: {
        [ThemeMode.Light]: {
            main: deepPurple[600],
        },
        [ThemeMode.Dark]: {
            main: deepPurple[500],
        },
    },
    [ThemeColor.Indigo]: {
        [ThemeMode.Light]: {
            main: indigo[600],
        },
        [ThemeMode.Dark]: {
            main: indigo[500],
        },
    },
    [ThemeColor.Blue]: {
        [ThemeMode.Light]: {
            main: blue[700],
        },
        [ThemeMode.Dark]: {
            main: blue[600],
        },
    },
    [ThemeColor.LightBlue]: {
        [ThemeMode.Light]: {
            main: lightBlue[600],
        },
        [ThemeMode.Dark]: {
            main: lightBlue[500],
        },
    },
    [ThemeColor.Cyan]: {
        [ThemeMode.Light]: {
            main: cyan[600],
        },
        [ThemeMode.Dark]: {
            main: cyan[500],
        },
    },
    [ThemeColor.Teal]: {
        [ThemeMode.Light]: {
            main: teal[600],
        },
        [ThemeMode.Dark]: {
            main: teal[500],
        },
    },
    [ThemeColor.Green]: {
        [ThemeMode.Light]: {
            main: green[600],
        },
        [ThemeMode.Dark]: {
            main: green[500],
        },
    },
    [ThemeColor.LightGreen]: {
        [ThemeMode.Light]: {
            main: lightGreen[600],
        },
        [ThemeMode.Dark]: {
            main: lightGreen[500],
        },
    },
    [ThemeColor.Lime]: {
        [ThemeMode.Light]: {
            main: lime[600],
        },
        [ThemeMode.Dark]: {
            main: lime[500],
        },
    },
    [ThemeColor.Yellow]: {
        [ThemeMode.Light]: {
            main: yellow[700],
        },
        [ThemeMode.Dark]: {
            main: yellow[500],
        },
    },
    [ThemeColor.Amber]: {
        [ThemeMode.Light]: {
            main: amber[700],
        },
        [ThemeMode.Dark]: {
            main: amber[500],
        },
    },
    [ThemeColor.Orange]: {
        [ThemeMode.Light]: {
            main: orange[700],
        },
        [ThemeMode.Dark]: {
            main: orange[500],
        },
    },
};
