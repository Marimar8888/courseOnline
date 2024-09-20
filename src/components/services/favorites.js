import axios from 'axios';
import { API_URL } from '../utils/constant';

export const getFavoritesByUserId = (UserId, token) => {

    return axios.get(`${API_URL}/favorites/${UserId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if(response.status === 200){
            return response.data;
        }
    })
    .catch(error => {
        console.error("Error getEnrollmentsByStudentId:", error.response ? error.response.data : error.message);
        throw error; 
    });
};

export const getCoursesFavoritesByUserId = (UserId, token) => {
    return axios.get(`${API_URL}/courses/favorites/${UserId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        if(response.status === 200){
            return response.data;
        }
    })
    .catch(error => {
        console.error("Error getEnrollmentsByStudentId:", error.response ? error.response.data : error.message);
        throw error; 
    });
};
