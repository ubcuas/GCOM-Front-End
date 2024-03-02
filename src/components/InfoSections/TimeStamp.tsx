import { Typography } from "@mui/material";

export default function TimeStamp({ time }: { time: number }) {
    return (
        <Typography
            sx={{
                textAlign: "center",
                color: (theme) => theme.palette.text.secondary,
            }}
            variant="body2"
        >
            TimeStamp:{"    "}
            {new Date(time).toLocaleString("en-CA")}
        </Typography>
    );
}
