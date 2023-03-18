import { Stack, Typography, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import AircraftStatusSection from "./mapData/AircraftStatusSection";
import RouteTable from "./mapData/RouteTable";
import WaypointTable from "./mapData/WaypointTable";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    const theme = useTheme();

    return (
        <Typography variant="h5" margin={theme.spacing(2, 2, 1, 2)}>
            {children}
        </Typography>
    );
};

const Section: React.FC<PropsWithChildren> = ({ children }) => {
    const theme = useTheme();

    return (
        <Typography variant="body2" margin={theme.spacing(0, 2)}>
            {children}
        </Typography>
    );
};

const MapData: React.FC = () => {
    const theme = useTheme();

    return (
        <Stack
            direction="column"
            sx={{ height: "100%", width: "100%", borderLeft: `1px solid ${theme.palette.divider}`, overflowY: "auto" }}
        >
            <Header>Aircraft Status</Header>
            <Section>
                <AircraftStatusSection />
            </Section>

            <Header>Routes</Header>
            <RouteTable />

            <Header>Waypoints</Header>
            <WaypointTable />
        </Stack>
    );
};

export default MapData;
