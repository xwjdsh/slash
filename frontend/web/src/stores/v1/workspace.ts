import { create } from "zustand";
import { workspaceServiceClient } from "@/grpcweb";
import { WorkspaceProfile, WorkspaceSetting } from "@/types/proto/api/v2/workspace_service";

interface WorkspaceState {
  profile: WorkspaceProfile;
  setting: WorkspaceSetting;

  // Workspace related actions.
  fetchWorkspaceProfile: () => Promise<WorkspaceProfile>;
  fetchWorkspaceSetting: () => Promise<WorkspaceSetting>;
}

const useWorkspaceStore = create<WorkspaceState>()((set) => ({
  profile: WorkspaceProfile.fromPartial({}),
  setting: WorkspaceSetting.fromPartial({}),
  fetchWorkspaceProfile: async () => {
    const workspaceProfile = (await workspaceServiceClient.getWorkspaceProfile({})).profile as WorkspaceProfile;
    set({ profile: workspaceProfile });
    return workspaceProfile;
  },
  fetchWorkspaceSetting: async () => {
    const workspaceSetting = (await workspaceServiceClient.getWorkspaceSetting({})).setting as WorkspaceSetting;
    set({ setting: workspaceSetting });
    return workspaceSetting;
  },
}));

export default useWorkspaceStore;
