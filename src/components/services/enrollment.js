import axios from 'axios';
import { API_URL } from '../utils/constant';

export const buildFormEnrollment = ({ studentId, courseDetails  }) => {
    const enrollmentFormData = new FormData();
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    enrollmentFormData.append('enrollments_student_id', studentId);
    if (Array.isArray(courseDetails)) {
        courseDetails.forEach(course => {
            const price = parseFloat(course.price);
            if (!isNaN(price)) {
                enrollmentFormData.append('enrollments_course_ids', course.id);
                enrollmentFormData.append(`enrollments_price_${course.id}`, price.toFixed(2));
            }
        });
    } else {
        console.error("courseIds no es un array válido:", courseIds);
    }
    enrollmentFormData.append('enrollments_start_date', formatDate(startDate));
    enrollmentFormData.append('enrollments_end_date', formatDate(endDate));
    enrollmentFormData.append('enrollments_price', formatDate(endDate));

    return enrollmentFormData;
};

export const addEnrollment = (studentId, courseDetails, token) => {
    const enrollmentFormData = buildFormEnrollment({ studentId, courseDetails });

    return axios.post(`${API_URL}/enrollment`, enrollmentFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.error("Error addEnrollment:", error.response ? error.response.data : error.message);
        throw error; 
    });
};

export const getEnrollmentsByStudentId = (StudentId, token) => {

    return axios.get(`${API_URL}/enrollments/${StudentId}`, {
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

export const getEnrollmentsByProfessorId = (professorId, token) => {
   
    return axios.get(`${API_URL}/enrollments/professor/${professorId}`, {
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
        if (error.response && error.response.status === 404) {
            return []; 
        } else {
            console.log("error getEnrollmentsByProfessorId:", error.response ? error.response.data : error.message);
            throw error;
        }
    });
};

