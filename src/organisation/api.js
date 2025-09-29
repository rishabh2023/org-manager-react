import { http } from "../lib/axios";

export const OrgAPI = {
  list: async () => (await http.get("/organizations")).data,
  get: async (id) => (await http.get(`/organizations/${id}`)).data,
  create: async (payload) => (await http.post("/organizations", payload)).data,
  update: async (id, payload) =>
    (await http.put(`/organizations/${id}`, payload)).data,
  remove: async (id) => (await http.delete(`/organizations/${id}`)).data,
};
