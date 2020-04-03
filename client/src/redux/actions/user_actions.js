import axios from 'axios';
import { USER_SERVER } from '../../components/utils/misc';
import {
    AUTH_USER,
    REGISTRATION_USER,
    LOGIN_USER,
    LOGOUT_USER,
    CHECKEMAIL_USER,
    GET_ALL_USERS,
    SINGLE_USERS,
    UPDATE_USERS,
    DELETE_USERS,
    TEMP_DELETE_USERS,
    TEMP_MULTI_USERS_DELETE,
    MULTI_USERS_DELETE,
    SEARCH_USERS,
    CHANGE_ROLE_USERS,
    RESETPASSWORD_USERS,
    RESTORE_USERS,
    RESTORE_MULTI_USER_ITEM,
    GET_ALL_USER_TRASH
} from './types';

// =========================================
//  @User Authentication Check Function
// =========================================
export const auth = () => {
    const request = axios.get(`${USER_SERVER}/auth`).then( response => {
        return response.data
    } )
    return {
        type: AUTH_USER,
        payload: request
    }
}

// =========================================
//  @Get Registration Users
// =========================================
export const registration = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/registration`, dataToSubmit).then( response => {
        return response.data
    } )

    return {
        type: REGISTRATION_USER,
        payload: request
    }
}

// =========================================
//  @User Login
// =========================================
export const loginUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then( response => {
        return response.data
    } )
    return {
        type: LOGIN_USER,
        payload: request
    }
}

// =========================================
//  @User Logout
// =========================================
export const logoutUser = () => {
    const request = axios.get(`${USER_SERVER}/logout`).then( response => {
        return response.data
    } )

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

// =========================================
//  @User Email Check For Forgot Password
// =========================================
export const checkEmail = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/checkEmail`, dataToSubmit).then( response => {
        return response.data
    } )

    return {
        type: CHECKEMAIL_USER,
        payload: request
    }
}

// =========================================
//  @User Reset Password
// =========================================
export const resetpassword = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}/resetpassword`, dataToSubmit)
                    .then(response => response.data);
    return{
        type: RESETPASSWORD_USERS,
        payload: request
    } 
}

// =========================================
//  @Get All Users
// =========================================
export const getAllUsers = (currentPages, parPage) => {
    const request = axios.get(`${USER_SERVER}/getallusers?currentpages=${currentPages}&parpage=${parPage}`).then( response => {
        return response.data
    } )
    
    return {
        type: GET_ALL_USERS,
        payload: request
    }
}

// =========================================
//  @Get All Trash User Data
// =========================================
export const getAllUserTrash = (currentPages, parPage) => {
    const request = axios.get(`${USER_SERVER}/getuser_trash?currentpages=${currentPages}&parpage=${parPage}`).then( response => {
        return response.data
    } )
    
    return {
        type: GET_ALL_USER_TRASH,
        payload: request
    }
}

// =========================================
//  @Get Single Users
// =========================================
export const getSingleUser = (editId) =>  {
    const request = axios.get(`${USER_SERVER}/edit?id=${editId}`).then( response => {
        return response.data
    } )
    return {
        type: SINGLE_USERS,
        payload: request
    }
}

// =========================================
//  @Update Single Users
// =========================================
export const updateUser = ( dataToSubmit ) => {
    const request = axios.post(`${USER_SERVER}/update`, dataToSubmit)
                    .then(response => response.data);
    return{
        type: UPDATE_USERS,
        payload: request
    }                    
}

// =========================================
//  @Temp Delete Single Users
// =========================================
export const tempDeleteUsers = (id) => {
    const request = axios.delete(`${USER_SERVER}/tempdelete?id=${id}`).then( response => {
        return response.data
    } )
    
    return {
        type: TEMP_DELETE_USERS,
        payload: request
    }
}

// =========================================
//  @Delete Single Users
// =========================================
export const deleteUsers = (id) => {
    const request = axios.delete(`${USER_SERVER}/delete?id=${id}`).then( response => {
        return response.data
    } )
    
    return {
        type: DELETE_USERS,
        payload: request
    }
}

// =========================================
//  @Multiple User Delete
// =========================================
export const multiUserDelete = (data) => {
    const request = axios.delete(`${USER_SERVER}/delete_users?ids=${data}`).then( response => {
        return response.data
    } )
    
    return {
        type: MULTI_USERS_DELETE,
        payload: request
    }
}

// =========================================
//  @Temp Multiple User Delete
// =========================================
export const tempMultiUserDelete = (data) => {
    const request = axios.delete(`${USER_SERVER}/temp_delete_multi_user?ids=${data}`).then( response => {
        return response.data
    } )
    
    return {
        type: TEMP_MULTI_USERS_DELETE,
        payload: request
    }
}

// =========================================
//  @Search Users
// =========================================
export const searchUsers = (dataToSubmit) => {
    const request = axios.get(`${USER_SERVER}/search?usersearch=${dataToSubmit}`).then( response => {
        return response.data;
    } )

    return {
        type: SEARCH_USERS,
        payload: request
    }
}

// =========================================
//  @Selected Item Change Role
// =========================================
export const changeRole = ( role, dataToSubmit ) => {
    const request = axios.get(`${USER_SERVER}/changerole?role=${role}&ids=${dataToSubmit}`).then( response => {
        return response.data
    });
    return{
        type: CHANGE_ROLE_USERS,
        payload: request
    }                    
}

// =========================================
//  @Restore Users
// =========================================
export const restoreUser = ( restoreId ) => {
    const request = axios.get(`${USER_SERVER}/restore?restoreId=${restoreId}`)
                    .then(response => response.data);
    return{
        type: RESTORE_USERS,
        payload: request
    }                    
}

// =========================================
//  @Multi Restore Users
// =========================================
export const restoreMultiUserItem = ( restoreId ) => {
    const request = axios.get(`${USER_SERVER}/restore_multiItem?restoreIds=${restoreId}`)
                    .then(response => response.data);
    return{
        type: RESTORE_MULTI_USER_ITEM,
        payload: request
    }                    
}