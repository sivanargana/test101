import axios from 'axios';
import {
  getAccessToken, getOrganizationId
} from "../utils/auth";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

type Status = {
  name: string;
  code: string;
  is_active: boolean;
};

type SubService = {
  parent_id: number | null;
  name: string;
  code: string;
  effective_date: string;
  dispatch_duration: string;
  price: string;
  service_tax: string;
  standard_doc: string;
  case_report: string;
  service_status: [];
};

type Service = {
  name: string;
  code: string;
  price: number;
  dispatch_duration: number;
  effective_date: string;
  status_order: [];
  admin_status: number,
  approval_approve_status: number,
  approval_rejected_status: number,
};

type Category = {
  service: string;
  sub_service: string;
  name: string;
  effective_date: string;

}

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    const orgId = getOrganizationId(); // You need to implement this
    const urlPath = config.url || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // console.log('Token missing')
    }
    if (orgId && urlPath !== '/auth/users/me/') {
      config.headers['X-Organization'] = orgId;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to fetch users
export const fetchServices = async (): Promise<[]> => {
  const response = await api.get('/accounts/services/', {
    params: { is_parent: true },
  });
  console.log(response)
  return response.data.data;
};

export const submitService = async (subService: Service): Promise<[]> => {
  const response = await api.post('/accounts/services/', subService );
  return response.data;
};

export const fetchServiceStatus = async (): Promise<[]> => {
  const response = await api.get('/accounts/status/');
  return response.data.data;
};

export const ServiceStatus = async (user: Status): Promise<[]> => {
  const response = await api.post('/accounts/status/', user);
  return response.data;
};


export const ServiceStatusById = async (serviceId: number): Promise<[]> => {
  const response = await api.get(`/accounts/services/${serviceId}/statuses/`);
  return response.data;
};

export const ServiceCategory = async (category: Category): Promise<[]> => {
  const response = await api.post('/accounts/categories/', category);
  return response.data;
};

export const fetchCategories = async (): Promise<[]> => {
  const response = await api.get('/accounts/categories/');
  return response.data.data;
};

export const fetchSubServices = async (): Promise<[]> => {
  const response = await api.get('/accounts/subservices/');
  return response.data.data;
};

export const submitSubService = async (subService: SubService): Promise<[]> => {
  const response = await api.post('/accounts/subservices/', subService );
  return response.data;
};

export const fetchSubServicesByServiceId = async (serviceId:any): Promise<[]> => {
  const response = await api.get(`/accounts/subservices/?service_id=${serviceId}`);
  return response.data.data;
};

export const fetchUser = async (): Promise<[]> => {
  const response = await api.get('/auth/users/me/');
  return response.data;
};

export const fetchOrganizations = async (): Promise<[]> => {
  const response = await api.get('/users/me/');
  return response.data;
};