import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrash, 
    faSignOutAlt, 
    faEdit, 
    faSpinner, 
    faPlusCircle, 
    faPhone,
    faEnvelope,
    faMapMarkedAlt,
    faLock,
    faDoorOpen,
    faUser
} from '@fortawesome/free-solid-svg-icons';

const Icons = () => {

    return library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faPhone, 
        faEnvelope, faMapMarkedAlt, faLock, faDoorOpen, faUser);

}

export default Icons;