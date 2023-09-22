import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchData = async (query: string) => {
  try {
    const response = await api.get(query);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const postNewData = async (endpoint: string, requestBody: object) => {
  try {
    const response = await api.post(endpoint, requestBody);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error setting up the request:", error.message);
      throw new Error("Error setting up the request");
    }
  }
};

export const removeData = async () => {
  try {
    await api.delete("/");
  } catch (error) {
    console.error("Error deleting data from database:", error);
    throw error;
  }
};
