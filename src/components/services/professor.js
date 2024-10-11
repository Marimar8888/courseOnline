import axios from 'axios';

import { API_URL } from '../utils/constant';

/* -----------DASHBOARD courses-container.js -----------*/
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
            console.log("Error getProfessorByIdFromAPI:", error);
            return null;
        });
};


export const getProfessorIdByUserIdFromAPI = (userId, token) => {
    return axios.get(`${API_URL}/professor/user_id/${userId}`, {
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
            console.log("Error getProfessorIdByUserIdFromAPI:", error);
            return null;
        });
};

/*---------Course-form------------*/

export const getProfessorByProfessorIdFromAPI = (professorId, token) => {
    return axios.get(`${API_URL}/professor/${professorId}`, {
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
            console.log("Error getProfessorByProfessorIdFromAPI:", error);
            return null;
        });
};

/*-------------professor-edit-container.js-------- */
export const updateProfessor = (professorData, initialState, token) => {
    const professorId = professorData.professors_id
    const professorFormData = buildForm(professorData, initialState);
    return axios
        ({
            method: "patch",
            url: `${API_URL}/professor/${professorId}`,
            data: professorFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response;
        })
        .catch(error => {
            console.log("error updateProfessor", error);
            throw error;
        })
};

/*--------------Profesor-create-container.js--------*/
export const addProfessor = (state, professorData, token) => {
    const professorFormData = buildFormProfessor(professorData);
    return axios
        ({
            method: "post",
            url: `${API_URL}/professor`,
            data: professorFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            state.setState({
                professors_first_name: "",
                professors_last_name: "",
                professors_email: "",
                professors_user_id: "",
                professors_dni: "",
                professors_address: "",
                professors_city: "",
                professors_postal: "",
                professors_number_card: "",
                professors_exp_date: "",
                professors_cvc: "",
                isButtonEnabled: false,
            });
            return response;

        })
        .catch(error => {
            console.log("error handleSubmit", error);
        })
};

/*-----------BuildForm ----------- */

export const buildForm = (professorData, initialState) => {
    let professorFormData = new FormData();

    const fields = [
        "professors_first_name",
        "professors_last_name",
        "professors_email",
        "professors_dni",
        "professors_address",
        "professors_city",
        "professors_postal",
        "professors_number_card",
        "professors_exp_date",
        "professors_cvc"
    ];

    fields.forEach(field => {
        if (professorData[field] !== initialState[field]) {
            professorFormData.append(field, professorData[field]);
        }
    });

    return professorFormData;
};


export const buildFormProfessor = (professorData) => {
    let professorFormData = new FormData();

    const fields = [
        "professors_first_name",
        "professors_last_name",
        "professors_email",
        "professors_dni",
        "professors_address",
        "professors_city",
        "professors_postal",
        "professors_number_card",
        "professors_exp_date",
        "professors_cvc"
    ];

    professorFormData.append("professors_user_id", professorData.professors_user_id);

    fields.forEach(field => {
        professorFormData.append(field, professorData[field]);
    });
    console.log([...professorFormData]);
    return professorFormData;
};

