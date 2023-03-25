# GCOM Frontend

## Getting Started
### General Setup
A [Mapbox access token](https://account.mapbox.com/access-tokens/) is required for the map. Create an `.env.local` file and use the name `VITE_MAPBOX_ACCESS_TOKEN`.

### Dev Setup

### Running

## Redux Store
 - just dimmed? still label?
 - color-wise, main waypoints have the colour and not in use are neutral?
 - only show current waypoints in the table? setting to change that?

## TO-DO
### Priority
- [ ] 2023 AEAC Waypoints, script to fetch and parse from the map?
- [x] Migration to Vite
- [ ] Documentation
- [x] Dockerize
- [ ] Dockerize dev with hot reload

### Features
- [x] Waypoint marker popups
- [x] Move obstacle positions into store

### Bugs
- [x] ~~Map zoom being 10+, changing to globe doesn't render a globe? - submit bug report to package~~ No longer an issue
- [ ] Minor bug on mercator location chaning when trying to zoom immediately after switching from globe

### UI/Design
- [x] Logo (.svg possible?)
- [x] Actually nicer navigation component
- [x] Fix drawers
- [x] Redo drag and drop for Geomet layers in framer-motion (can remove useHover, react-beautiful-dnd, react-merge-refs)
- [ ] Tooltip on hover when text overflows
- [ ] Transition on opacity icon and slider when layer visibility is toggled

### Code clarity/cleanup
- [x] WmsTile component
- [ ] useNextLoadedTile hook?
- [ ] PlaceMarker/PlaceMarkerIcon components (+ switch flex display to Stack?)
- [x] GeometLayerToggle component (maybe switch animations to framer-motion?)
- [ ] Component for `<b>Text:</b> data<br />`?
- [ ] Deep merge on `sx` objects? (in CollapsibleTable, etc.) Or objects in general?
- [ ] Figure out better way to handle nav height
- [ ] Figure out if there are `theme.spacing` calls where unneeded?

### Future features
- [ ] User options & peristance + settings page
- [ ] Search function for Geomet layers
- [ ] Place marker size adjustments
- [ ] Route path size adjustments
- [ ] More map themes (requires refactoring for current handling of satellite style)
- [x] ~~Map resizing on drawer open~~ Not particularly needed anymore
