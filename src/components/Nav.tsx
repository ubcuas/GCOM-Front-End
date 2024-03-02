import { Paper, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import FlightIcon from "@mui/icons-material/Flight";
import Home from "@mui/icons-material/Home";
import { Link } from "wouter";

export default function Nav() {
    const [tab, setTab] = useState(0);

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
                <Tab
                    sx={{
                        minWidth: 0,
                    }}
                    label={<FlightIcon />}
                    href="/telemetry"
                    LinkComponent={Link}
                />
            </Tabs>
        </Paper>
    );
}
