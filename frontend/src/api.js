import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

// Attach token to every request if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const register = (data) => api.post("/auth/register", data);

export const registerOrg = (data) => api.post("/organizations/register", data);

// Staff
export const getStaff = () => api.get("/staff");
export const createStaff = (data) => api.post("/staff", data);
export const updateStaffRole = (id, role) =>
  api.patch(`/staff/${id}/role`, { role });

// Youth
export const getYouth = () => api.get("/youth");
export const getYouthById = (id) => api.get(`/youth/${id}`);
export const createYouth = (data) => api.post("/youth", data);
export const deleteYouth = (id) => api.delete(`/youth/${id}`);

// Behaviors
export const getBehaviors = () => api.get("/behaviors");
export const createBehavior = (data) => api.post("/behaviors", data);
export const deleteBehavior = (id) => api.delete(`/behaviors/${id}`);

// Points
export const awardPoints = (data) => api.post("/points/award", data);
export const getPointHistory = (youthId) =>
  api.get(`/points/history/${youthId}`);

// Prizes
export const getPrizes = () => api.get("/prizes");
export const createPrize = (data) => api.post("/prizes", data);
export const deletePrize = (id) => api.delete(`/prizes/${id}`);

// Redemptions
export const createRedemption = (data) => api.post("/redemptions", data);
export const getPendingRedemptions = () => api.get("/redemptions/pending");
export const processRedemption = (id, status) =>
  api.patch(`/redemptions/${id}`, { status });

// QR
export const getQRCode = (youthId) => api.get(`/qr/${youthId}`);
export const scanQRCode = (qrCode) => api.get(`/qr/scan/${qrCode}`);

export default api;
