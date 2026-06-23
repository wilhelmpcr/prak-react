import axios from "axios";

const API_URL = "https://gekihwepevbldonhadba.supabase.co"
const API_KEY = "sb_publishable_NmUeyrfVp_oUqBZFp-w3YQ_BDzlBfLZ";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
};

export const notesAPI = {
    async fetchNotes() {
        const response = await axios.get(
            `${API_URL}note`,
            { headers }
        );

        return response.data;
    },

    async createNote(data) {
        const response = await axios.post(
            `${API_URL}note`,
            data,
            { headers }
        );

        return response.data;
    },
};