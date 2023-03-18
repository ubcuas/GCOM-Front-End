import { css } from "@emotion/react";
import { Box, BoxProps } from "@mui/material";
import { ReactComponent as LogoFullSvg } from "./logo/logo_short.svg";
import { ReactComponent as LogoCroppedSvg } from "./logo/logo_cropped.svg";
import { useTheme } from "@mui/system";
import useThemeMode from "../utils/hooks/useThemeMode";

type LogoProps = BoxProps & {
    cropped?: boolean;
    inheritColor?: boolean; // breaks the style guidelines but looks more cohesive ☺
};

const Logo: React.FC<LogoProps> = ({ cropped, inheritColor, ...boxProps }) => {
    const theme = useTheme();
    const { isDarkMode } = useThemeMode();
    const LogoSvg = cropped ? LogoCroppedSvg : LogoFullSvg;

    return (
        <Box {...boxProps}>
            <LogoSvg
                width="100%"
                height="100%"
                css={css`
                    .text {
                        fill: ${isDarkMode ? theme.palette.common.white : theme.palette.common.black};
                    }

                    ${inheritColor && ".logo { fill: currentColor !important; }"}
                `}
            />
        </Box>
    );
};

export default Logo;
