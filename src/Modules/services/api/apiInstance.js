import axios from "axios";
import { BASE_URL } from "./apiConfig.js";

// public instance
const apiInstace = axios.create({
    baseURL: BASE_URL,
});

const privteApiInstace = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: localStorage.getItem("token") },
});

export { apiInstace, privteApiInstace };
