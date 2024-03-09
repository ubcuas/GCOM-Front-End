import { Box, Divider, Paper, Typography } from "@mui/material";
import { Children } from "react";

export default function InfoCard({ title, children }: { title: string; children?: React.ReactNode }) {
    const childCount = Children.count(children);

    return (
        <Paper
            sx={{
                height: "100%",
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
