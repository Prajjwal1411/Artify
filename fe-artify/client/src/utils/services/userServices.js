import axios from "axios";

export const getUser = async (sellerID) => {
    try {
        const response = await axios.get('http://localhost:8000/getUser', {
            params: { userId: sellerID },
          });
        return response
    } catch (error) {
        console.error("Error fetching data:", error);
        return ;
    }
};