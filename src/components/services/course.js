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
            console.log("Error fetching courses", error);
            throw error; 
        });
};
