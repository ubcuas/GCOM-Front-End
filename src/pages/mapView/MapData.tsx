import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectCurrentTask, updateCurrentTask } from "../../store/slices/dataSlice";
import AircraftStatusSection from "./mapData/AircraftStatusSection";
import RouteTable from "./mapData/RouteTable";
import WaypointTable from "./mapData/WaypointTable";

const MapData: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentTask = useAppSelector(selectCurrentTask);

    return (
        <Stack
            direction="column"
            sx={{ height: "100%", width: "100%", borderLeft: 1, borderColor: "divider", overflowY: "auto" }}
        >
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    bgcolor: "background.default",
                    zIndex: 999,
                }}
            >
                <Tabs value={currentTask} onChange={(_event, value) => dispatch(updateCurrentTask(value))}>
                    <Tab value={1} label="Task 1" />
                    <Tab value={2} label="Task 2" />
                </Tabs>
            </Box>

            <Header>Aircraft Status</Header>
            <Section>
                <AircraftStatusSection />
            </Section>

            {currentTask === 1 ? (
                <>
                    <Header>Restricted Area</Header>
                    <Section>...</Section>
                </>
            ) : undefined}

            <Header>Routes</Header>
            <RouteTable />

            <Header>Waypoints</Header>
            <WaypointTable />
        </Stack>
    );
};

const Header: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography variant="h5" sx={{ my: 2, mr: 2, ml: 1 }}>
            {children}
        </Typography>
    );
};

const Section: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Typography variant="body2" sx={{ mx: 2 }}>
            {children}
        </Typography>
    );
};

export default MapData;
