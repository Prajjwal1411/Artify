import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get("http://localhost:8000/getCategories");
        console.log(response.data)
        return response.data.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        return ;
    }
};