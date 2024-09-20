import axios from 'axios';

import { API_URL } from '../utils/constant';

/*------------------dashboard-container------------------ */

const fechStudentData = (studentId) => {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/courses/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        console.log("fechStudentData dashboard-container", response.data);
        return response.data

      })
      .catch(error => {
        console.log("error fechStudentData", error)
      })
  };

 /*  export const getStudentId =(userId)=> {
    const token = localStorage.getItem("token");
    return axios
      .get(
        `${API_URL}/student/user_id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        const studentId = response.data.students_id;
        fechStudentData(studentId);

      })
      .catch(error => {
        console.log("error getStudentId", error)
      })
  }; */

  
/* ------------ DASHBOARD professor-edit-container.js------------------------------*/

export const ActiveStudents =(enrollments) => {
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

export const InactiveStudents =(enrollments) => {
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
                console.log("student.js getStudentByIdFromAPI", newStudent);
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
