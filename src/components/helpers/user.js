import axios from 'axios';

import { API_URL } from '../utils/constant'; 

export const getUserIdFromAPI = (token) => {
    // const token = localStorage.getItem("token");

    return axios.get(`${API_URL}/get_user_id`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if (response.status === 200) {
            return response.data.users_id; // Retorna el ID del usuario
        } else {
            console.log("No Authorization");
            return null;
        }
    })
    .catch(error => {
        if (error.response) {
            console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
            console.log(error.response.data);
        } else {
            console.log("Network or other error:", error.message);
        }
        return null;
    });
};


