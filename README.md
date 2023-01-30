# GCOM Frontend

## Getting Started
Mapbox access token

## Redux Store


## TO-DO
### Priority
- [ ] Migration to Vite
- [ ] Documentation
- [x] Dockerize
- [ ] Dockerize dev with hot reload

### Features
- [ ] Waypoint marker popups
- [ ] Move obstacle positions into store

### Bugs
- [ ] Map zoom being 10+, changing to globe doesn't render a globe? - submit bug report to package

### UI/Design
- [ ] Logo (.svg possible?)
- [ ] Navigation component
- [x] Fix drawers
- [x] Redo drag and drop for Geomet layers in framer-motion (can remove useHover, react-beautiful-dnd, react-merge-refs)
- [ ] Tooltip on hover when text overflows
- [ ] Transition on opacity icon and slider when layer visibility is toggled

### Code clarity/cleanup
- [ ] WmsTile component
- [ ] RouteLayer component
- [ ] useNextLoadedTile hook
- [ ] PlaceMarkerIcon component (switch flex display to Stack?)
- [ ] GeometLayerToggle component (maybe switch animations to framer-motion?)

### Future features
- [ ] User options & peristance
- [ ] Search function for Geomet layers
- [ ] Place marker size adjustments
- [ ] Route path size adjustments
- [ ] More map themes (requires refactoring for current handling of satellite style)
- [ ] Map resizing on drawer open
