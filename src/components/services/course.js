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
export const addOrUpdateCourse = (apiUrl, apiAction, formData, token) => {
    return axios
        ({
            method: apiAction,
            url: apiUrl,
            data: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            } 
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("error addOrUpdateCourse:", error);      
        });
};

export const delete_course_image = (courseId, token) => {
    const url = `${API_URL}/course/${courseId}/delete-image`;
    console.log("delete_course_image: ", url);
    return axios 
    ({
        method: "delete",
        url: `${url}`,
        headers: {
            'Authorization': `Bearer ${token}`
        } 
    })
    .then(response => {
        console.log("deleteImage:", response)
        return response;
    })
    .catch(error => {
        console.log("error deleteImage:", error);
    });
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

};
