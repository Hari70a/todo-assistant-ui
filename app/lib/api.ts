const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error("VITE_API_URL must be configured in the environment.");
}

export const API_URL = apiUrl;

export function getAccessToken() {
  if (typeof window === "undefined") return null;

  return sessionStorage.getItem("access_token");
}

export function setAccessToken(token: string) {
  sessionStorage.setItem("access_token", token);
}

export function clearAccessToken() {
  sessionStorage.removeItem("access_token");
}
