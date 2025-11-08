import apiClient from "./apiClient";

export const workspaceApi = {
  getAllSpace: () => apiClient.get("/workspaces"),
  getSpace: (id) => apiClient.get(`/workspaces/${id}`),
  getSpaceByUser: (id) => apiClient.get(`/workspaces/user/${id}`),
  createSpace: (data) => apiClient.post("/workspaces", data),
  updateSpace: (id, data) => apiClient.put(`/workspaces/${id}`, data),
  deleteSpace: (id) => apiClient.delete(`/workspaces/${id}`),
};
