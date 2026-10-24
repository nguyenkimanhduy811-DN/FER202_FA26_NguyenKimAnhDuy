
import axios from "axios";

// NC2 - Axios instance dung chung
const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 8000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// Chuan hoa thong bao loi tieng Viet
export function getErrorMessage(err) {
  if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
    return "Kết nối quá chậm (timeout)";
  }

  if (err.response) {
    const { status } = err.response;

    if (status === 404) return "Không tìm thấy";
    if (status >= 500) return "Máy chủ lỗi";

    return `Yêu cầu không hợp lệ (${status})`;
  }

  if (err.request) {
    return "Không kết nối được server";
  }

  return err.message || "Đã xảy ra lỗi không xác định";
}

// Request interceptor: log, do thoi gian va gan token
axiosClient.interceptors.request.use(
  (config) => {
    config.metadata = { start: performance.now() };

    const token =
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = (config.method || "get").toUpperCase();

    console.log(
      `➡️ ${method} ${config.url}`,
      config.params ?? "",
      config.data ?? ""
    );

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: do thoi gian va xu ly loi
axiosClient.interceptors.response.use(
  (response) => {
    const start = response.config.metadata?.start;

    response.duration =
      typeof start === "number"
        ? Math.round(performance.now() - start)
        : null;

    console.log(
      `✅ ${response.status} ${response.config.url} (${response.duration}ms)`
    );

    return response;
  },
  (error) => {
    const start = error.config?.metadata?.start;

    if (typeof start === "number") {
      error.duration = Math.round(performance.now() - start);
    }

    // Request bi huy khong duoc coi la loi thong thuong
    if (axios.isCancel(error)) {
      console.log("🚫 Canceled", error.config?.url);
      return Promise.reject(error);
    }

    error.userMessage = getErrorMessage(error);

    console.warn(
      `❌ ${error.config?.url || "Request"}: ${error.userMessage}`,
      error.duration != null ? `(${error.duration}ms)` : ""
    );

    return Promise.reject(error);
  }
);

export default axiosClient;
