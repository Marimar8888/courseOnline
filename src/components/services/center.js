import axios from 'axios';
import { API_URL } from '../utils/constant';

export const studyCentersNamesFromAPI = (professorId, token) => {
    const url = `${API_URL}/centers/professor/${professorId}`;
    return axios
        ({
            method: "get",
            url: url,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("error studyCentersNamesFromAPI:", error);
        });

};

export const updateCreateCenter = ({ methodAPI, urlAPI,  token, state, studyCenterUserId }) => {
    const centerFormData = buildForm({ state, studyCenterUserId });
    return axios
        ({
            method: methodAPI,
            url: urlAPI,
            data: centerFormData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            state.setState({
                studyCenters_id: "",
                studyCenters_name: "",
                studyCenters_email: "",
                studyCenters_user_id: studyCenterUserId || "",
                studyCenters_cif: "",
                studyCenters_address: "",
                studyCenters_city: "",
                studyCenters_postal: "",
                studyCenters_number_card: "",
                studyCenters_exp_date: "",
                studyCenters_cvc: "",
                studyCenters_active: true,
                methodAPI: "post",
                urlAPI: `${API_URL}/studycenter`,
                isButtonEnabled: false,
            });
            return response;
        })
        .catch(error => {
            console.log("error handleSubmit", error);
        })
};

export const buildForm = ({ state, studyCenterUserId}) => {
    let centerFormData = new FormData();

    const fields = [
      "studyCenters_name",
      "studyCenters_email",
      "studyCenters_cif",
      "studyCenters_address",
      "studyCenters_city",
      "studyCenters_postal",
      "studyCenters_number_card",
      "studyCenters_exp_date",
      "studyCenters_cvc"
    ];
    centerFormData.append("studyCenters_user_id", studyCenterUserId);

    fields.forEach(field => {
      centerFormData.append(field, state[field]);
    });
    return centerFormData
};