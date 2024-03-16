import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Children } from "react";

type InfoCardProps = {
    title: string;
    rightButtonHandler?: () => void;
    rightButtonText?: string;
    children?: React.ReactNode;
};

export default function InfoCard({ title, rightButtonHandler, rightButtonText, children }: InfoCardProps) {
    const childCount = Children.count(children);

    return (
        <Paper
            sx={{
                height: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: rightButtonHandler ? "space-between" : "flex-start",
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
                {rightButtonHandler && (
                    <Button
                        sx={{ fontSize: 16, fontWeight: "bold", px: 4 }}
                        variant="text"
                        onClick={rightButtonHandler}
                    >
                        {rightButtonText ?? ""}
                    </Button>
                )}
            </Box>

            <Divider />
            {Children.map(children, (child, index) => (
                <>
                    <Box
                        sx={{
                            p: 2,
                        }}
                        key={index}
                    >
                        {child}
                    </Box>
                    {index != childCount - 1 && <Divider />}
                </>
            ))}
        </Paper>
    );
}
