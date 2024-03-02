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
                        }}
                        variant="h4"
                    >
                        Ground Communication Software
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "200",
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
