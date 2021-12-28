import axios from "axios";

const ENV = "http://127.0.0.1:8080"

export const getTodos = async () => await axios.get(`${ENV}/getTodos`)
