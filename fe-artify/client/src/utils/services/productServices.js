import axios from "axios";

export const saveProduct = async (formData) => {
    try {
        const response = await axios.post("http://localhost:8000/saveProducts", formData);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscriptions:", error); 
    }
};
export const getProducts = async () => {
    try {
        const response = await axios.post("http://localhost:8000/getProducts");
        return response
    } catch (error) {
        console.error("Error fetching data:", error);
        
    }
};