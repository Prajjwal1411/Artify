import axios from "axios";

export const getProducts = async () => {
    try {
        const response = await axios.post("http://localhost:8000/getProducts");
        return response
    } catch (error) {
        console.error("Error fetching data:", error);
        return ;
    }
};