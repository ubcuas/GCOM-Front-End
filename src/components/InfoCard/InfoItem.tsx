import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function InfoItem({
    text,
    data,
    fullWidth,
    triplet,
    aside,
}: {
    text: string;
    data: string | number;
    fullWidth?: boolean;
    triplet?: boolean;
    aside?: ReactNode;
}) {
    return (
        <Grid item xs={12} md={!fullWidth && (triplet ? 4 : 6)}>
            <Paper
                elevation={4}
                sx={{
                    padding: 2,
                    textAlign: "center",
                }}
            >
                <Box
                    sx={{
                        width: 1,
                    }}
                >
                    <Stack direction={aside ? "row" : "column"} alignContent="center">
                        <Stack
                            justifyContent="center"
                            sx={{
                                flexGrow: 1,
                                flexBasis: 0,
                            }}
                        >
                            <Typography variant="h6">{text}</Typography>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    my: 2,
                                    color: (theme) => theme.palette.primary.main,
                                }}
                                variant="h5"
                            >
                                {data}
                            </Typography>
                        </Stack>
                        {aside}
                    </Stack>
                </Box>
            </Paper>
        </Grid>
    );
}
