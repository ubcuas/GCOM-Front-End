# GCOM Front-End 2024

## TODO / PLANNING
Notes for my sanity (and software people at comp's sanity)
### Front-End Tasklist
### DONE:
- [x] Clean up arming section (make arming a toggle button, add confirmation dialogue to arming button) -> complete but not much point rn since arming endpoint doesn't even work.
- [x] /arm doesn't work, so drone is currently manually armed through MissionPlanner, FE needs a setting to allow /takeoff to be invoked while bypassing client-side arming status.
- [x] add text field settings to store center map position on FE page load. (defaults to ALMA Airport), using localStorage for setting persistency.

### WIP:
- [ ] allow map to preview waypoints. Currently there are 3 different sources of information for waypoints,

  1. <ins>MPS QUEUE:</ins> contains waypoints currently written into the MPS (does this live inside the MPS flask server or the actual drone itself? I'm not sure) (we should probably have an ability to preview waypoints from here. the endpoint is /drone/queue)
  2. <ins>GCOM /waypoints endpoint:</ins> honestly not sure what this is used for at this point.
  3. <ins>FE clientside queue:</ins> A redux store array of pending waypoints waiting to be posted to MPS. We should probably add functionality to __preview / edit__ these waypoints directly on the map.
  Out of all 3 sources we should probably have the ability to preview two of these, perhaps on separate map instances?

- [ ] Support waypoint types (`LOITER_UNLIM`, `DO_VTOL_TRANSITION`, potentially more please confirm with MPS). Since we are in the late stage of the game, Aden suggests doing this through the remarks field of the current waypoint object to be able to take arbitrary JSON data, and then having MPS people take care of the remarks object properly to create the right waypoints.
- [ ] OFFLINE MAPPING - PLEASE TAKE A LOOK AT https://github.com/orgs/ubcuas/projects/6?pane=issue&itemId=42266000 FOR FULL INSTRUCTIONS ON HOW TO SETUP OFFLINE MAPPING WITH FRONT END, SKIP TO STEP 4 BECAUSE I'LL DO ALL OF THE TILE DATA PREPPING.

## Description

GCOM UI to interact with GCOM Back-End and MissionPlanner Scripts. Built with Vite, React + Redux, MUI, and Typescript. Communication is achieved through axios http and ~~socket.io v4 websockets.

CSS is done through inline styling with MUI components. More info can be found [below](#useful-links).

_Project Link: https://github.com/orgs/ubcuas/projects/6/views/5_

## Development Setup
Node.js v20 is required for development, download at https://nodejs.org/en/download/current or use `nvm` if you're cool and swag with it.
### Steps:
1. `git clone` this reponsitory
```
git clone https://github.com/ubcuas/GCOM-Front-End.git
```
2. Navigate to project directory and run `npm i` to install required libraries.
```
cd GCOM-Front-End
npm i
```
3. `npm run dev` to start the app in development mode.
```
npm run dev
```
## Useful Links
- MUI Component Reference - https://mui.com/material-ui/getting-started/
- Socket.io Reference - https://socket.io/docs/v4/
- GCOM Back-End Repository - https://github.com/ubcuas/GCOM-2023
- React Docs - https://react.dev/reference/react
