import axios from 'axios';
import { API_URL } from '../utils/constant';

export const getCoursesByStudentId = (StudentId, token) => {

    return axios.get(`${API_URL}/courses/student_id/${StudentId}`, {
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

/* -----------DASHBOARD courses-container.js -----------*/
export const getCoursesByProfessorIdPagined = (token, professorId, typeId, currentPage, limit) => {
    const url = `${API_URL}/courses/professor/${professorId}/type/${typeId}?page=${currentPage}&limit=${limit}`;

    return axios
        .get(`${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data; 
        })
        .catch(error => {
            console.log("Error getCoursesByStudentIdPagined courses", error);
            throw error; 
        });
};

export const getCoursesByStudentIdPagined = (token, studentId, typeId, currentPage, limit) => {
    const url = `${API_URL}/courses/student/${studentId}/type/${typeId}?page=${currentPage}&limit=${limit}`;

    return axios
        .get(`${url}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data; 
        })
        .catch(error => {
            console.log("Error getCoursesByStudentIdPagined courses", error);
            throw error; 
        });
};

/*---------------Course-form.js------------------- */
export const addCourse = (formData, token) => {
    const url = `${API_URL}/course`;
    return axios
        ({
            method: "post",
            url: `${url}`,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("error addCourse:", error);      
        })
};

/*------------ Blog-Details-------------*/

export const getCourseByIdFromAPI = (id, token) => {
    const url = `${API_URL}/course/${id}`;
    return axios({
        method: "get",
        url: `${url}`,
        headers: {
             'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        console.log("getCourseById", response);
        return response.data;
    })
    .catch(error => {
        console.log("error getCourseById", error);
    })

}
