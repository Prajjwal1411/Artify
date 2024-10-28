import axios from "axios";

export const login = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8000/login", formData);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return ;
    }
};
