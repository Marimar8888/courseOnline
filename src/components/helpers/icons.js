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
    faUser,
    faCartShopping,
    faStar as faStarSolid 
} from '@fortawesome/free-solid-svg-icons';

import { 
    faStar as faStarRegular 
} from '@fortawesome/free-regular-svg-icons'; 

const Icons = () => {

    return library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle, faPhone, 
        faEnvelope, faMapMarkedAlt, faLock, faDoorOpen, faUser, faCartShopping, faStarSolid, faStarRegular);
}

export default Icons;