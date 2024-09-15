import axios from 'axios';
import { API_URL } from '../utils/constant';

export const buildFormEnrollment = ({ studentId, courseIds  }) => {
    const enrollmentFormData = new FormData();

    const startDate = new Date();

    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);

    const formatDate = (date) => {
        return date.toISOString().slice(0, 19).replace('T', ' ');
    };

    enrollmentFormData.append('enrollments_student_id', studentId);
    if (Array.isArray(courseIds)) {
        courseIds.forEach(courseId => {
            enrollmentFormData.append('enrollments_course_ids', courseId);
        });
    } else {
        console.error("courseIds no es un array válido:", courseIds);
    }
    enrollmentFormData.append('enrollments_start_date', formatDate(startDate));
    enrollmentFormData.append('enrollments_end_date', formatDate(endDate));

    return enrollmentFormData;
};

export const addEnrollment = (studentId, courseIds, token) => {
    console.log("addEnrollment called with studentId:", studentId, "courseIds:", courseIds);

    const enrollmentFormData = buildFormEnrollment({ studentId, courseIds });

    return axios.post(`${API_URL}/enrollment`, enrollmentFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => {
        console.log("Enrollment added successfully:", response.data);
        return response.data;
    })
    .catch(error => {
        console.error("Error addEnrollment:", error.response ? error.response.data : error.message);
        throw error; 
    
    });
};