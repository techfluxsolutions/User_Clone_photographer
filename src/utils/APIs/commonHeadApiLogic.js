import axios from "axios";
import { decryptData } from "./../CRYPTO/cryptoFunction";

// Setup axios instances
// Support both variable names and trim any accidental spaces
const baseURL = (
  process.env.REACT_APP_PHOTOGRAPHER_USER_WEBSITE_BASE_API_URL ||
  process.env.REACT_APP_API_URL ||
  ""
).trim();

if (!baseURL) {
  console.warn("WARNING: REACT_APP_PHOTOGRAPHER_USER_WEBSITE_BASE_API_URL is not defined in environment variables.");
} else {
  console.log("Axios Base URL initialized:", baseURL);
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
});

const axiosInstanceNoAuth = axios.create({
  baseURL,
  timeout: 30000,
});
//

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data?.message === "Expired token") {
      console.log("Expired token error. Clearing storage and redirecting...");
      localStorage.clear();
      // Use window.location as navigate is relative to React components
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

/**
 * Get access token from localStorage and decrypt it
 */
export function getAccessToken() {
  const encrypted = localStorage.getItem("PhotographerUserToken");
  if (!encrypted) return null;
  try {
    return decryptData(encrypted);
  } catch (err) {
    console.error("Token decryption failed:", err);
    return null;
  }
}

/**
 * Set the Authorization header on axiosInstance defaults
 */
export function authorizeMe() {
  try {
    const token = getAccessToken();

    // Also check for plain JWT fallback if decryption fails but format looks correct
    let finalToken = token;
    if (!finalToken) {
      const stored = localStorage.getItem("PhotographerUserToken");
      if (stored && typeof stored === "string" && /^\S+\.\S+\.\S+$/.test(stored)) {
        finalToken = stored;
        console.warn("authorizeMe: falling back to plain token.");
      }
    }

    if (finalToken) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${finalToken}`;
      return finalToken;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      return null;
    }
  } catch (err) {
    console.error("authorizeMe error:", err);
    delete axiosInstance.defaults.headers.common["Authorization"];
    return null;
  }
}

// Request interceptor ensures header is updated before every request
axiosInstance.interceptors.request.use(async (config) => {
  authorizeMe();
  return config;
});

export { axiosInstance, axiosInstanceNoAuth };

