import { Grid, Paper, Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function InfoCardWidget({
    text,
    data,
    aside,
    gridSpacing,
}: {
    text: string;
    data: string | number | JSX.Element;
    aside?: ReactNode;
    gridSpacing?: number;
}) {
    return (
        <Grid item xs={12} lg={gridSpacing ?? 12} alignItems="stretch">
            <Paper
                elevation={3}
                sx={{
                    padding: 1,
                    textAlign: "center",
                    width: 1,
                    height: 1,
                }}
            >
                <Stack
                    direction={aside ? "row" : "column"}
                    alignItems="center"
                    sx={{
                        width: 1,
                        height: 1,
                    }}
                >
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
                                color: (theme) => theme.palette.primary.main,
                            }}
                            variant="h5"
                        >
                            {data}
                        </Typography>
                    </Stack>
                    {aside}
                </Stack>
            </Paper>
        </Grid>
    );
}
