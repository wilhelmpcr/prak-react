import axios from "axios";

const API_URL = "https://gekihwepevbldonhadba.supabase.co/rest/v1/"
const API_KEY = "sb_publishable_K1uEfyUZ4jE3zrVhHFlofA_EW2RwYw5";

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