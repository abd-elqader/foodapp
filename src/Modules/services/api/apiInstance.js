import axios from "axios";

const apiInstace = axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1/",
    headers: { Authorization: localStorage.getItem("token") },
});

const pricateApiInstace = axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1/",
    headers: { Authorization: localStorage.getItem("token") },
});

export { apiInstace, pricateApiInstace };
