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

export const deleteFavorite = (courseId, userId, token) => {
    return  axios.delete(`${API_URL}/favorite/${userId}/${courseId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log("error handleFavoriteClick", error);
        throw error; 
    })

};

export const createFavorite = (courseId, userId, token) => {
   
    return axios
        .post(
            `${API_URL}/favorite`,
            {
                favorites_user_id: userId,
                favorites_course_id: courseId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        .then(response => {
           return response;
        })
        .catch(error => {
            console.log("error handleFavoriteClick", error);
        })
};
