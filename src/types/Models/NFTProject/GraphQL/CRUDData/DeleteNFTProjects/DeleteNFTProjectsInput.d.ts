export interface DeleteNFTProjectsInput {
    address?: string;
    nftProjects?: DeleteNFTProject[];
}

export interface DeleteNFTProject {
    nftProjectId?: string;
}
