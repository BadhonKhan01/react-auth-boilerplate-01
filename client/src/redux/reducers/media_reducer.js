import {
    GET_ALL_MEDIA,
    LOAD_MORE_IMAGE,
    DELETE_MEDIA,
    TEMP_DELETE_MEDIA,
    MULTI_MEDIA_DELETE,
    TEMP_MULTI_MEDIA_DELETE,
    SEARCH_MEDIA,
    SINGLE_MEDIA,
    UPDATE_MEDIA,
    RESTORE_MEDIA,
    RESTORE_MULTI_MEDIA_ITEM,
    GET_ALL_MEDIA_TRASH
} from './../actions/types';

export default function (state = {}, action) {
    switch (action.type) {

        /*-------------------------------------------
        |--- @User Authentication Check Case
        -------------------------------------------*/
        case GET_ALL_MEDIA:
            return {
                ...state,
                getAllMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Load More Media Image
        -------------------------------------------*/
        case LOAD_MORE_IMAGE:
            return {
                ...state,
                loadMoreImage: action.payload
            }

        /*-------------------------------------------
        |--- @Delete Media Image
        -------------------------------------------*/
        case DELETE_MEDIA:
            return {
                ...state,
                deleteMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Temp Delete Media Image
        -------------------------------------------*/
        case TEMP_DELETE_MEDIA:
            return {
                ...state,
                tempDeleteMedia: action.payload
            }
            
        /*-------------------------------------------
        |--- @Delete Media Image
        -------------------------------------------*/
        case MULTI_MEDIA_DELETE:
            return {
                ...state,
                multiMediaDelete: action.payload
            }
            
        /*-------------------------------------------
        |--- @Temp Delete Media Image
        -------------------------------------------*/
        case TEMP_MULTI_MEDIA_DELETE:
            return {
                ...state,
                tempMultiMediaDelete: action.payload
            }

        /*-------------------------------------------
        |--- @Search Media Image
        -------------------------------------------*/
        case SEARCH_MEDIA:
            return {
                ...state,
                searchMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Edit Media Image
        -------------------------------------------*/
        case SINGLE_MEDIA:
            return {
                ...state,
                singleMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Edit Media Image
        -------------------------------------------*/
        case UPDATE_MEDIA:
            return {
                ...state,
                updateSingleMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Edit Media Image
        -------------------------------------------*/
        case RESTORE_MEDIA:
            return {
                ...state,
                restoreMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Edit Media Image
        -------------------------------------------*/
        case RESTORE_MULTI_MEDIA_ITEM:
            return {
                ...state,
                restoreMultiMedia: action.payload
            }

        /*-------------------------------------------
        |--- @Get All Trash Media Data
        -------------------------------------------*/
        case GET_ALL_MEDIA_TRASH:
            return {
                ...state,
                getAllMediaTrash: action.payload
            }

        /*-------------------------------------------
        |--- @default Case
        -------------------------------------------*/
        default:
            return state;
    }
}