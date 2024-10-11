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
            if (response.status === 200) {
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
export const addOrUpdateCourse = (apiUrl, apiAction, token, state, previousState) => {
    const courseFormData = buildForm(state, previousState);
    return axios
        ({
            method: apiAction,
            url: apiUrl,
            data: courseFormData,
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

/*------------ Course-Details-------------*/

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
            return response.data;
        })
        .catch(error => {
            console.log("error getCourseById", error);
        })

};

export const deleteCourse = (id, token) => {
    const url = `${API_URL}/course/${id}`;
    return axios({
        method: "delete",
        url: `${url}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("error deleteCourse", error);
        })
};

/*------------ store-container.js ----------*/

export const getAllCoursesWithPage = (state, hasUnmounted) => {
    return axios.get(`${API_URL}/courses?page=${state.currentPage}&limit=${state.limit}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            if (!hasUnmounted) {
                console.log("getAllCourses error", error);
                state.setState({ isLoading: false });
            }
        });
};

/*------------- Builform -----------------*/

export const buildForm = (currentState, previousState) => {
    let formData = new FormData();

    if (currentState.title !== previousState.title) {
        formData.append("courses_title", currentState.title);
    }
    if (currentState.active !== previousState.active) {
        formData.append("courses_active", currentState.active === true ? 'true' : 'false');
    }
    if (currentState.content !== previousState.content) {
        formData.append("courses_content", currentState.content);
    }
    if (currentState.price !== previousState.price) {
        formData.append("courses_price", currentState.price);
    }
    if (currentState.discounted_price !== previousState.discounted_price) {
        formData.append("courses_discounted_price", currentState.discounted_price);
    }
    if (currentState.professor_id !== previousState.professor_id) {
        formData.append("courses_professor_id", currentState.professor_id);
    }
    if (currentState.studycenter_id !== previousState.studycenter_id) {
        formData.append("courses_studycenter_id", currentState.studycenter_id);
    }
    if (currentState.category_id !== previousState.category_id) {
        formData.append("courses_category_id", currentState.category_id);
    }
    if (currentState.image !== previousState.image && currentState.image instanceof File) {
        formData.append("file", currentState.image);
    }

    return formData;
}