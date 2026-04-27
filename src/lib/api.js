import axios from 'axios';

// API base URL - swap this when deploying to Render
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getAuthToken = () =>
  localStorage.getItem('authToken') || localStorage.getItem('token');

// Interceptor: Attach token to every request
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Handle 401 (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/user/login';
    }
    return Promise.reject(error);
  }
);

// AUTH ENDPOINTS
export const authAPI = {
  sendOTP: (email) => api.post('/auth/user/send-otp', { email }),
  verifyOTP: (email, otp, name, phone) => {
    const payload = { email, otp };
    if (name?.trim()) payload.name = name.trim();
    if (phone?.trim()) payload.phone = phone.trim();
    return api.post('/auth/user/verify-otp', payload);
  },
  completeProfile: (email, name, phone) =>
    api.post('/auth/user/complete-profile', { email, name, phone }),
  adminLogin: (email, otp) =>
    api.post('/auth/admin/verify-otp', { email, otp }),
};

// USER DASHBOARD ENDPOINTS
export const userDashboardAPI = {
  getDashboard: () => api.get('/secureuser/user/dashboard'),
  getSubmissions: (params) =>
    api.get('/secureuser/user/submissions', { params }),
  getSubmissionTimeline: (type, id) =>
    api.get(`/secureuser/user/submissions/${type}/${id}/timeline`),
};

// USER ADMIN ENDPOINTS
export const adminDashboardAPI = {
  getDashboard: () => api.get('/secureadmin/admin/dashboard'),
  getSubmissions: (params) =>
    api.get('/secureadmin/admin/submissions', { params }),
  getUsers: (params) => api.get('/secureadmin/admin/users', { params }),
  updateSubmissionStatus: (type, id, status, notes = '') =>
    api.patch(`/secureadmin/admin/submissions/${type}/${id}/status`, {
      status,
      notes,
    }),
};

// SERVICE ENDPOINTS (EVisa, HRD, Mea, PCC, StickerVisa, Translation)
export const serviceAPI = {
  // User side: create submission
  createSubmission: (serviceType, formData) =>
    api.post(`/secureuser/${serviceType}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Admin side: get all submissions for a service
  getServiceSubmissions: (serviceType, params) =>
    api.get(`/secureadmin/${serviceType}`, { params }),

  // Admin side: get single submission
  getServiceSubmission: (serviceType, id) =>
    api.get(`/secureadmin/${serviceType}/${id}`),

  // Admin side: update status
  updateServiceStatus: (serviceType, id, status, notes) =>
    api.patch(`/secureadmin/${serviceType}/${id}/status`, {
      status,
      notes,
    }),

  // Admin side: delete submission
  deleteSubmission: (serviceType, id) =>
    api.delete(`/secureadmin/${serviceType}/${id}`),
};

// CONTACT FORM ENDPOINT
export const contactAPI = {
  sendMessage: (formData) => api.post('/contact', formData),
};

export default api;
