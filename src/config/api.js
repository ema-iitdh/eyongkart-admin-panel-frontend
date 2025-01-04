// export const url = "https://eyongkart.com/api";
// export const url = 'https://e2bd-49-47-140-31.ngrok-free.app';
// export const url = "https://e-commerce-ten-rust.vercel.app";
// export const url = "https://qfqhhctz-5000.inc1.devtunnels.ms/";

export const API_CONFIG = {
    // BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:5000',
    BASE_URL: "https://eyongkart.com/api",
    // BASE_URL: "https://localhost:3000",
    TIMEOUT: 10000,
    CREDENTIALS: "include",
    WITH_CREDENTIALS: true,
    HEADERS: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "ngrok-skip-browser-warning": true,
    },
  };
  
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: "Network Error. Please check your connection.",
    SERVER_ERROR: "Server Error. Please try again later.",
    UNAUTHORIZED: "Session expired. Please login again.",
  };
  