import { Box, Paper, Typography } from "@mui/material";

export default function MapMenu() {
    return (
        <Box
            sx={{
                position: "absolute",
                right: 0,
                top: 0,
                m: 8,
                height: "calc(100% - 128px)", // 128px account for top and bottom margin.
            }}
        >
            <Paper
                sx={{
                    height: "100%",
                    p: 4,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: "bold",
                    }}
                >
                    Waypoints
                </Typography>
            </Paper>
        </Box>
    );
}
