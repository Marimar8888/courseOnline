import axios from 'axios';

import { API_URL } from '../utils/constant'; 

/* -----------DASHBOARD courses-container.js -----------*/
export const getProfessorByIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/professor/userId/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Professor not found");
            return null;
        }
    })
    .catch(error => {
        console.log("Error getProfessorById:", error);
        return null;
    });
};


export const getProfessorIdByUserIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/professor/user_id/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Professor not found");
            return null;
        }
    })
    .catch(error => {
        console.log("Error getProfessorById:", error);
        return null;
    });
};

/* */
