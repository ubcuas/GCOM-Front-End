import { Box } from "@mui/material";
import DroneStatusCard from "../DroneStatusCard";

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
            <DroneStatusCard />
        </Box>
    );
}
