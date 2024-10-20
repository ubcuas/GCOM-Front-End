import { Box, Paper, SxProps, Typography } from "@mui/material";
import { ReactNode } from "react";

export default function Widget({
    text,
    data,
    aside,
    sx,
}: {
    text: string;
    data: string | number | JSX.Element;
    aside?: ReactNode;
    sx?: SxProps;
}) {
    return (
        <Paper
            elevation={3}
            sx={{
                ...sx,
                textAlign: "center",
                padding: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <Box
                sx={
                    aside
                        ? {
                              display: "flex",
                              gap: 4,
                              justifyContent: "center",
                              alignItems: "center",
                          }
                        : undefined
                }
            >
                <Box>
                    <Typography variant="h6">{text}</Typography>
                    <Typography
                        sx={{
                            color: (theme) => theme.palette.primary.main,
                        }}
                        variant="h5"
                    >
                        {data}
                    </Typography>
                </Box>
                <Box>{aside}</Box>
            </Box>
        </Paper>
    );
}
