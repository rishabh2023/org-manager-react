import { http } from "../lib/axios";

export const OrgAPI = {
  list: async (params = {}) =>
    (await http.get("/organizations", { params })).data,
  get: async (id) => (await http.get(`/organizations/${id}`)).data,
  create: async (payload) => (await http.post("/organizations", payload)).data,
  update: async (id, payload) =>
    (await http.put(`/organizations/${id}`, payload)).data,
  remove: async (id) => (await http.delete(`/organizations/${id}`)).data,
};
