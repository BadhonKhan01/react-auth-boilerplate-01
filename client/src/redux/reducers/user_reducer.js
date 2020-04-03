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
    MULTI_USERS_DELETE,
    TEMP_MULTI_USERS_DELETE,
    SEARCH_USERS,
    CHANGE_ROLE_USERS,
    RESETPASSWORD_USERS,
    RESTORE_USERS,
    RESTORE_MULTI_USER_ITEM,
    GET_ALL_USER_TRASH
} from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {

        /*-------------------------------------------
        |--- @User Authentication Check Case
        -------------------------------------------*/
        case AUTH_USER:
            return {
                ...state,
                userData: action.payload
            }

        /*-------------------------------------------
        |--- @Get Registration Users
        -------------------------------------------*/
        case REGISTRATION_USER:
            return {
                ...state,
                registration: action.payload
            }
            
        /*-------------------------------------------
        |--- @User Login Case
        -------------------------------------------*/
        case LOGIN_USER:
            return {
                ...state,
                login: action.payload
            }

        /*-------------------------------------------
        |--- @Reset Password
        -------------------------------------------*/
        case RESETPASSWORD_USERS:
            return {
                ...state,
                resetpassword: action.payload
            }
            
        /*-------------------------------------------
        |--- @User Logout Case
        -------------------------------------------*/
        case LOGOUT_USER:
            return {
                ...state,
                logout: action.payload
            }

        /*-------------------------------------------
        |--- @User Email Check For Forgot Password
        -------------------------------------------*/
        case CHECKEMAIL_USER:
            return {
                ...state,
                success: action.payload
            }

        /*-------------------------------------------
        |--- @Get All Users
        -------------------------------------------*/
        case GET_ALL_USERS:
            return {
                ...state,
                getAllUsers: action.payload
            }

        /*-------------------------------------------
        |--- @Get Single Users
        -------------------------------------------*/
        case SINGLE_USERS:
            return {
                ...state,
                editUser: action.payload
            }

        /*-------------------------------------------
        |--- @Update Single Users
        -------------------------------------------*/
        case UPDATE_USERS:
            return {
                ...state,
                updateUser: action.payload
            }

        /*-------------------------------------------
        |--- @Delete Single Users
        -------------------------------------------*/
        case DELETE_USERS:
            return {
                ...state,
                deleteUser: action.payload
            }

        /*-------------------------------------------
        |--- @Temp Delete Single Users
        -------------------------------------------*/
        case TEMP_DELETE_USERS:
            return {
                ...state,
                tempDeleteUser: action.payload
            }

        /*-------------------------------------------
        |--- @Multiple User Delete
        -------------------------------------------*/
        case MULTI_USERS_DELETE:
            return {
                ...state,
                multiUsersDelete: action.payload
            }

        /*-------------------------------------------
        |--- @Temp Multiple User Delete
        -------------------------------------------*/
        case TEMP_MULTI_USERS_DELETE:
            return {
                ...state,
                tempMultiUsersDelete: action.payload
            }

        /*-------------------------------------------
        |--- @Update Single Users
        -------------------------------------------*/
        case SEARCH_USERS:
            return {
                ...state,
                searchUser: action.payload
            }

        /*-------------------------------------------
        |--- @Selected Item Change Role
        -------------------------------------------*/
        case CHANGE_ROLE_USERS:
            return {
                ...state,
                changeRole: action.payload
            }

        /*-------------------------------------------
        |--- @Restore Users
        -------------------------------------------*/
        case RESTORE_USERS:
            return {
                ...state,
                restoreUser: action.payload
            }

        /*-------------------------------------------
        |--- @Restore Users
        -------------------------------------------*/
        case RESTORE_MULTI_USER_ITEM:
            return {
                ...state,
                restoreMultiUser: action.payload
            }

        /*-------------------------------------------
        |--- @Get All Trash Users Data
        -------------------------------------------*/
        case GET_ALL_USER_TRASH:
            return {
                ...state,
                getAllUserTrash: action.payload
            }

        /*-------------------------------------------
        |--- @default Case
        -------------------------------------------*/
        default:
            return state;
    }
}