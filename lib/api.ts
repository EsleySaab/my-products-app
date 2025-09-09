import axios from "axios"

const api = axios.create({
  baseURL: "https://api-teste-front-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
  },
})

export default api
