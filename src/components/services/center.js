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