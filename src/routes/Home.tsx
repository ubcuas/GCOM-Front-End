import { Box, Container, Typography } from "@mui/material";
import LogoShort from "@assets/logo_short.svg?react";

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
                }}
            >
                <LogoShort height={100} />
                <Typography
                    sx={{
                        ml: "110px",
                    }}
                    variant="h4"
                >
                    Ground Communication Software
                </Typography>
            </Box>
        </Container>
    );
}
