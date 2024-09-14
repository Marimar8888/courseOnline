import axios from 'axios';

import { API_URL } from '../utils/constant'; 

export const getUserIdFromAPI = (token) => {

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

export const getUserRolsFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/user/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            const rols = response.data.rols;
            const studentRole = rols.find(rol => rol.rols_id === 2);
            const professorRole = rols.find(rol => rol.rols_id === 3);
            
            return {
                rols,
                studentRole,
                professorRole
            };
        } else {
            console.log("Error fetching user roles");
            return {
                rols: [],
                studentRole: null,
                professorRole: null
            };
        }
    })
    .catch(error => {
        console.log("Error in getUserRols:", error);
        return {
            rols: [],
            studentRole: null,
            professorRole: null
        };
    });
};

// Obtener detalles del estudiante
export const getStudentByIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/student/userId/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) {
            return response.data;
        } else {
            console.log("Student not found");
            return null;
        }
    })
    .catch(error => {
        console.log("Error getStudentById:", error);
        return null;
    });
};

// Obtener detalles del profesor
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

