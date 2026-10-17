export const API_URL = "http://localhost:8000";

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
