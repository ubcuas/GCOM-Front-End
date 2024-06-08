import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Children } from "react";

type InfoCardProps = {
    title?: string;
    // rightButtonHandler?: () => void;
    // rightButtonText?: string;
    rightNode?: React.ReactNode;
    children?: React.ReactNode;
};

export default function InfoCard({ title, rightNode, children }: InfoCardProps) {
    const childCount = Children.count(children);

    return (
        <Paper
            sx={{
                height: "100%",
                width: "100%",
            }}
            elevation={1}
        >
            <Stack
                sx={{
                    height: "100%",
                }}
            >
                {title && (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: rightNode ? "space-between" : "flex-start",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    p: 2,
                                }}
                                variant="h4"
                            >
                                {title}
                            </Typography>
                            {rightNode}
                        </Box>
                        <Divider />
                    </>
                )}
                {Children.map(children, (child, index) => (
                    <>
                        <Box
                            sx={{
                                p: 2,
                                height: childCount == 1 ? "100%" : "auto",
                            }}
                            key={index}
                        >
                            {child}
                        </Box>
                        {index != childCount - 1 && <Divider />}
                    </>
                ))}
            </Stack>
        </Paper>
    );
}
