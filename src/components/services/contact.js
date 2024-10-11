import axios from 'axios';
import { API_URL } from '../utils/constant';

export const addContact = (formData, setFormData, setMessage) => {
    const formDataContact = buildFormContact(formData);
    return axios({
        method: "post",
        url: `${API_URL}/contact`,
        data: formDataContact
    })
        .then(response => {
            setFormData({
                name: '',
                subject: '',
                description: '',
                email: '',
                acceptConditions: false,
            });
            return response;
        })
        .catch(error => {
            console.log("Error al enviar el formulario:", error);
            setMessage('Hubo un error al enviar el formulario.');
        });
};

/*--------BuildForm---------- */

export const buildFormContact = (formData) => {
    let contactFormData = new FormData();
    contactFormData.append("contacts_name", formData.name);
    contactFormData.append("contacts_email", formData.email);
    contactFormData.append("contacts_subject", formData.subject);
    contactFormData.append("contacts_message", formData.description);
    contactFormData.append("contacts_check", formData.acceptConditions ? 'true' : 'false');
  
    return contactFormData;
};