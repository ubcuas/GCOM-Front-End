import { Box, Typography } from "@mui/material";
import LogoCropped from "@assets/logo_cropped.svg?react";

export default function Home() {
    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h4" fontWeight="bold">
                    UBCUAS Ground Communication Software
                </Typography>
                <LogoCropped height={50} width={50} />
            </Box>
        </>
    );
}
