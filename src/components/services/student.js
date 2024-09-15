import axios from 'axios';

import { API_URL } from '../utils/constant'; 

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
