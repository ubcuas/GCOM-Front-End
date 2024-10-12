import { Box } from "@mui/material";
import WaypointStatusCard from "../components/WaypointStatusCard";

export default function Queue() {
    return (
        <Box
            sx={{
                p: 8,
                width: "100%",
            }}
        >
            <WaypointStatusCard />
        </Box>
    );
}
