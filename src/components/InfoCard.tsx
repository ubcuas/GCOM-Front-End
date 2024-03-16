import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Children } from "react";

type InfoCardProps = {
    title: string;
    waypointSubmit?: () => void;
    children?: React.ReactNode;
};

export default function InfoCard({ title, waypointSubmit, children }: InfoCardProps) {
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
                    justifyContent: waypointSubmit ? "space-between" : "flex-start",
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
                {waypointSubmit && (
                    <Button sx={{ fontSize: 16, fontWeight: "bold", px: 4 }} variant="text" onClick={waypointSubmit}>
                        post
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
