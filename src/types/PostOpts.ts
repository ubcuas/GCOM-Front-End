export enum ApplicationType {
    MISSIONPLANNER,
    BACKEND,
}

export type PostOpts = {
    selectedApplication: ApplicationType;
};
