import { EditLocationAlt } from "@mui/icons-material";
import FlightIcon from "@mui/icons-material/Flight";
import Home from "@mui/icons-material/Home";
import MapIcon from "@mui/icons-material/Map";
import Settings from "@mui/icons-material/Settings";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useRoute } from "wouter";

const linkMap: Record<string, number> = {
    "": 0,
    map: 1,
    queue: 2,
    settings: 3,
};

export default function Nav() {
    const [_match, params] = useRoute("/:route");
    const [tab, setTab] = useState(() => {
        if (params?.route === undefined) {
            return 0;
        }
        return linkMap[params?.route];
    });

    const handleNav = (_event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Paper sx={{}}>
            <Tabs
                orientation="vertical"
                value={tab}
                onChange={handleNav}
                sx={{
                    borderRight: 1,
                    borderColor: "divider",
                    position: "sticky",
                    top: 0,
                    width: 56,
                }}
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<Home />}
                    href="/"
                    LinkComponent={Link}
                />
                {/* <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<FlightIcon />}
                    href="/telemetry"
                    LinkComponent={Link}
                /> */}

                <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<MapIcon />}
                    href="/map"
                    LinkComponent={Link}
                />
                {/* <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label="MPS Queue"
                    href="/mps-queue"
                    LinkComponent={Link}
                /> */}
                <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<EditLocationAlt />}
                    href="/queue"
                    LinkComponent={Link}
                />
                <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<Settings />}
                    href="/settings"
                    LinkComponent={Link}
                />
            </Tabs>
        </Paper>
    );
}
