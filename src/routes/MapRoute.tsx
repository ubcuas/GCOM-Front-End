import { Box } from "@mui/material";
import MapView from "../components/Map/MapView";
import MapMenu from "../components/Map/MapMenu";
import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { getMPSQueue } from "../store/thunks/dataThunks";
import { manualUpdateMPSQueue } from "../store/slices/dataSlice";

export default function MapRoute() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        // dispatch(getMPSQueue);
    }, []);

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <MapView />
            <MapMenu />
        </Box>
    );
}
