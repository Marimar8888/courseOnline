import axios from 'axios';

import { API_URL } from '../utils/constant';

/*------------------dashboard-container------------------ */

export const fechStudentDataFromAPI = (studentId, token) => {
    
    return axios.get(`${API_URL}/student/courses/${studentId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("error fechStudentData", error)
        })
};

/* ------------ DASHBOARD professor-edit-container.js------------------------------*/

export const ActiveStudents = (enrollments) => {
    const activeStudents = [];

    enrollments.forEach(enrollment => {
        if (!enrollment.enrollments_finalized) {
            if (!activeStudents.includes(enrollment.enrollments_student_id)) {
                activeStudents.push(enrollment.enrollments_student_id);
            }
        }
    });
    return activeStudents;
};

export const InactiveStudents = (enrollments) => {
    const InactiveStudents = [];

    enrollments.forEach(enrollment => {
        if (enrollment.enrollments_finalized) {
            if (!InactiveStudents.includes(enrollment.enrollments_student_id)) {
                InactiveStudents.push(enrollment.enrollments_student_id);
            }
        }
    });
    return InactiveStudents;
};

/*---------- student-container.js ---------------------*/

export const getStudentsByStatusAndByProfessorId = (professorId, token, typeId, currentPage, limit) => {
    const url = `${API_URL}/students/status/professor/${professorId}/type/${typeId}?page=${currentPage}&limit=${limit}`;
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
            console.log("Error getStudentsByStatusAndByProfessorId students", error);
            throw error;
        });
};

/* -----------DASHBOARD courses-container.js -----------*/
export const getStudentIdByUserIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/student/user_id/${userId}`, {
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


/*------------------cart-paying.js------------------------*/

export const getStudentByIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/student/userId/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            if (response.status === 200) {
                const newStudent = response.data;
                return newStudent;
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

export const addStudent = (userId, studentData, token) => {
    const studentFormData = buildFormStudent(userId, studentData);

    return axios.post(`${API_URL}/student`, studentFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => {

            return response.data;
        })
        .catch(error => {
            console.log("error addStudent", error);
        })

};

/*---------Student-edit-container.js---------- */
export const updateStudent = (studentData, initialState, token) => {
    const studentId = studentData.students_id
    const studentFormData = buildForm(studentData, initialState);
    return axios
        ({
            method: "patch",
            url: `${API_URL}/student/${studentId}`,
            data: studentFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("error update Student", error);
            throw error;
        })
};

/*------- BuildForm -----------*/

export const buildFormStudent = (userId, studentData) => {
    let studentFormData = new FormData();
    studentFormData.append("students_user_id", userId);
    studentFormData.append("students_first_name", studentData.firstName);
    studentFormData.append("students_last_name", studentData.lastName);
    studentFormData.append("students_dni", studentData.dni);
    studentFormData.append("students_address", studentData.address);
    studentFormData.append("students_city", studentData.city);
    studentFormData.append("students_postal", studentData.postal);
    studentFormData.append("students_email", studentData.email);
    studentFormData.append("students_number_card", studentData.numberCard.replace(/\s+/g, ''));
    studentFormData.append("students_exp_date", studentData.expDate);
    studentFormData.append("students_cvc", studentData.cvc);

    console.log("Form Data Student:", studentFormData.get("students_number_card"));

    return studentFormData;
}


export const buildForm = (studentData, initialState) => {
    let studentFormData = new FormData();

    const fields = [
        "students_first_name",
        "students_last_name",
        "students_email",
        "students_dni",
        "students_address",
        "students_city",
        "students_postal",
        "students_number_card",
        "students_exp_date",
        "students_cvc",
        "students_user_id"
    ];
    fields.forEach(field => {
        if (studentData[field] !== initialState[field]) {
            studentFormData.append(field, studentData[field]);
        }
    });
    return studentFormData;
};
