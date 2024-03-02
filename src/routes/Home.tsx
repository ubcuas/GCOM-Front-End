import { Box, Container, Typography, keyframes } from "@mui/material";
import LogoShort from "@assets/logo_short.svg?react";

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const fadeUp15 = keyframes`
    from {
        transform: translateY(15px);
    }

    to {
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
                }}
            >
                <LogoShort height={100} />
                <Box
                    sx={{
                        ml: "110px",
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
                        variant="h5"
                    >
                        Season 2023 - 24
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
