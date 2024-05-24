import { Box, Container, Typography, keyframes } from "@mui/material";
import LogoShort from "@assets/logo_short.svg?react";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
`;

const fadeUp15 = keyframes`
    0% {
        transform: translateY(15px);
    }

    100% {
        transform: translateY(0);
    }
`;

const fadeUp30 = keyframes`
    0% {
        transform: translateY(30px);
    }

    9% {
        transform: translateY(30px);
    }

    100% {
        transform: translateY(0);
    }
`;

export default function Home() {
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    height: "100%",
                    animation: `${fadeIn} 1s ease-in-out`,
                    animationIterationCount: 1,
                    position: "relative",
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "#2DA0DC",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "40%",
                        left: "0",
                        transform: "translate(0, 0)",
                        zIndex: 0,
                        filter: "blur(75px)",
                        opacity: 0.4,
                    }}
                />
                <LogoShort
                    style={{
                        zIndex: 2,
                        position: "relative",
                    }}
                    height={100}
                />
                <Box
                    sx={{
                        ml: "110px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                        zIndex: 1,
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "200",
                            animation: `${fadeUp15} 1s ease-in-out`,
                            animationIterationCount: 1,
                        }}
                        variant="h4"
                    >
                        Ground Communication Software
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "200",
                            animation: `${fadeUp30} 1250ms ease-in-out`,
                            animationIterationCount: 1,
                        }}
                        variant="h6"
                    >
                        Please ensure all settings are configured properly before usage.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
