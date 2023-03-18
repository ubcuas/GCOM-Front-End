import { SimplePaletteColorOptions } from "@mui/material";
/* eslint-disable @typescript-eslint/no-restricted-imports */
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
/* eslint-enable */

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

// light & dark colors taken from MUI Color Tool as the auto-generated colours were not as nice
//   https://m2.material.io/resources/color
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
            light: "#d05ce3",
            dark: "#6a0080",
        },
        [ThemeMode.Dark]: {
            main: purple[400],
            light: "#df78ef",
            dark: "#790e8b",
        },
    },
    [ThemeColor.DeepPurple]: {
        [ThemeMode.Light]: {
            main: deepPurple[600],
            light: "#9162e4",
            dark: "#280680",
        },
        [ThemeMode.Dark]: {
            main: deepPurple[500],
            light: "#9a67ea",
            dark: "#320b86",
        },
    },
    [ThemeColor.Indigo]: {
        [ThemeMode.Light]: {
            main: indigo[600],
            light: "#6f74dd",
            dark: "#00227b",
        },
        [ThemeMode.Dark]: {
            main: indigo[500],
            light: "#757de8",
            dark: "#002984",
        },
    },
    [ThemeColor.Blue]: {
        [ThemeMode.Light]: {
            main: blue[700],
            light: "#63a4ff",
            dark: "#004ba0",
        },
        [ThemeMode.Dark]: {
            main: blue[600],
            light: "#6ab7ff",
            dark: "#005cb2",
        },
    },
    [ThemeColor.LightBlue]: {
        [ThemeMode.Light]: {
            main: lightBlue[600],
            light: "#63ccff",
            dark: "#006db3",
        },
        [ThemeMode.Dark]: {
            main: lightBlue[500],
            light: "#67daff",
            dark: "#006db3",
        },
    },
    [ThemeColor.Cyan]: {
        [ThemeMode.Light]: {
            main: cyan[600],
            light: "#5ddef4",
            dark: "#007c91",
        },
        [ThemeMode.Dark]: {
            main: cyan[500],
            light: "#62efff",
            dark: "#008ba3",
        },
    },
    [ThemeColor.Teal]: {
        [ThemeMode.Light]: {
            main: teal[600],
            light: "#4ebaaa",
            dark: "#005b4f",
        },
        [ThemeMode.Dark]: {
            main: teal[500],
            light: "#52c7b8",
            dark: "#00675b",
        },
    },
    [ThemeColor.Green]: {
        [ThemeMode.Light]: {
            main: green[600],
            light: "#76d275",
            dark: "#00701a",
        },
        [ThemeMode.Dark]: {
            main: green[500],
            light: "#80e27e",
            dark: "#087f23",
        },
    },
    [ThemeColor.LightGreen]: {
        [ThemeMode.Light]: {
            main: lightGreen[600],
            light: "#aee571",
            dark: "#4b830d",
        },
        [ThemeMode.Dark]: {
            main: lightGreen[500],
            light: "#bef67a",
            dark: "#5a9216",
        },
    },
    [ThemeColor.Lime]: {
        [ThemeMode.Light]: {
            main: lime[600],
            light: "#f5fd67",
            dark: "#8c9900",
        },
        [ThemeMode.Dark]: {
            main: lime[500],
            light: "#ffff6e",
            dark: "#99aa00",
        },
    },
    [ThemeColor.Yellow]: {
        [ThemeMode.Light]: {
            main: yellow[700],
            light: "#fff263",
            dark: "#c49000",
        },
        [ThemeMode.Dark]: {
            main: yellow[500],
            light: "#ffff72",
            dark: "#c8b900",
        },
    },
    [ThemeColor.Amber]: {
        [ThemeMode.Light]: {
            main: amber[700],
            light: "#ffd149",
            dark: "#c67100",
        },
        [ThemeMode.Dark]: {
            main: amber[500],
            light: "#fff350",
            dark: "#c79100",
        },
    },
    [ThemeColor.Orange]: {
        [ThemeMode.Light]: {
            main: orange[700],
            light: "#ffad42",
            dark: "#bb4d00",
        },
        [ThemeMode.Dark]: {
            main: orange[500],
            light: "#ffc947",
            dark: "#c66900",
        },
    },
};
