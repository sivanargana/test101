// src/utils/auth.js

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");
export const getOrganizationId = () => localStorage.getItem("orgId");

export const setAccessToken = (token: string) => localStorage.setItem("accessToken", token);
export const setRefreshToken = (token: string) => localStorage.setItem("refreshToken", token);
export const setOrganizationId = (orgId: string) => localStorage.setItem("orgId", orgId);

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};
