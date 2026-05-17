import axios from "axios";
import { toast } from "react-hot-toast";
import config from "@/config";

// Axios instance pre-configured for internal API calls.
// Base URL is /api so you can write apiClient.post("/lead") instead of fetch("/api/lead").
// Interceptors handle:
//   - 401 → redirect to login page
//   - other errors → show a toast with the error message
const apiClient = axios.create({
  baseURL: "/api",
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.error ??
      error?.message ??
      "Something went wrong";

    if (status === 401) {
      // Not signed in — send to login page
      window.location.href = config.auth.loginUrl;
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
