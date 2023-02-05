# GCOM Frontend

## Getting Started
### General Setup
A [Mapbox access token](https://account.mapbox.com/access-tokens/) is required for the map. Create an `.env.local` file and use the name `VITE_MAPBOX_ACCESS_TOKEN`.

### Dev Setup

### Running

## Redux Store

## TO-DO
### Priority
- [x] Migration to Vite
- [ ] Documentation
- [x] Dockerize
- [ ] Dockerize dev with hot reload

### Features
- [x] Waypoint marker popups
- [x] Move obstacle positions into store

### Bugs
- [ ] Map zoom being 10+, changing to globe doesn't render a globe? - submit bug report to package

### UI/Design
- [ ] Logo (.svg possible?)
- [ ] Actually nicer navigation component
- [x] Fix drawers
- [x] Redo drag and drop for Geomet layers in framer-motion (can remove useHover, react-beautiful-dnd, react-merge-refs)
- [ ] Tooltip on hover when text overflows
- [ ] Transition on opacity icon and slider when layer visibility is toggled

### Code clarity/cleanup
- [x] WmsTile component
- [ ] useNextLoadedTile hook?
- [ ] PlaceMarkerIcon component (switch flex display to Stack?)
- [ ] GeometLayerToggle component (maybe switch animations to framer-motion?)

### Future features
- [ ] User options & peristance + settings page
- [ ] Search function for Geomet layers
- [ ] Place marker size adjustments
- [ ] Route path size adjustments
- [ ] More map themes (requires refactoring for current handling of satellite style)
- [ ] Map resizing on drawer open
