import axios from "axios";

const API_BASE = "http://192.168.1.4:8000"; // Update with your backend URL

export const storeClipboardText = async (text) => {
    try {
        console.log("TEXT ->>>>>>>>>>",text)
        const response = await axios.post(`${API_BASE}/store/`, {text });
        console.log(response)
        return response.data.token;
    } catch (error) {
        console.error("Error storing clipboard:", error);
        return null;
    }
};

export const retrieveClipboardText = async (token) => {
    try {
        const response = await axios.get(`${API_BASE}/retrieve/${token}`);
        console.log("RESPONSE ->>>>>>>>>>",response.data)
        return response.data.text;
    } catch (error) {
        console.error("Error retrieving clipboard:", error);
        return null;
    }
};
