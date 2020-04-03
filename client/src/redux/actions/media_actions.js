import axios from 'axios';
import { MEDIA_SERVER } from '../../components/utils/misc';
import {
    GET_ALL_MEDIA,
    LOAD_MORE_IMAGE,
    DELETE_MEDIA,
    TEMP_DELETE_MEDIA,
    TEMP_MULTI_MEDIA_DELETE,
    MULTI_MEDIA_DELETE,
    SEARCH_MEDIA,
    SINGLE_MEDIA,
    UPDATE_MEDIA,
    RESTORE_MEDIA,
    RESTORE_MULTI_MEDIA_ITEM,
    GET_ALL_MEDIA_TRASH
} from './types';

// =========================================
//  @Get All Upload Media Image
// =========================================
export const getMedia = (currentPages, parPage) => {
    const request = axios.get(`${MEDIA_SERVER}/getmedia?currentpages=${currentPages}&parpage=${parPage}`).then( response => {
        return response.data
    } )
    
    return {
        type: GET_ALL_MEDIA,
        payload: request
    }
}

// =========================================
//  @Get All Trash Media Data
// =========================================
export const getMediaTrash = (currentPages, parPage) => {
    const request = axios.get(`${MEDIA_SERVER}/getmedia_trash?currentpages=${currentPages}&parpage=${parPage}`).then( response => {
        return response.data
    } )
    
    return {
        type: GET_ALL_MEDIA_TRASH,
        payload: request
    }
}


// =========================================
//  @Load More Image
// =========================================
export const loadMoreImage = (limit, start, list = '') => {
    const request = axios.get(`${MEDIA_SERVER}/loadMoreImage?limit=${limit}&skip=${start}`).then( response => {
        if(list){
            return [...list,...response.data]
        } else {
            return response.data
        }
    } )
    
    return {
        type: LOAD_MORE_IMAGE,
        payload: request
    }
}

// =========================================
//  @Temp Delete Media Image
// =========================================
export const tempDeleteMedia = (id) => {
    const request = axios.delete(`${MEDIA_SERVER}/tempdelete?id=${id}`).then( response => {
        return response.data
    } )
    
    return {
        type: TEMP_DELETE_MEDIA,
        payload: request
    }
}

// =========================================
//  @Delete Media Image
// =========================================
export const deleteMedia = (id) => {
    const request = axios.delete(`${MEDIA_SERVER}/delete?id=${id}`).then( response => {
        return response.data
    } )
    
    return {
        type: DELETE_MEDIA,
        payload: request
    }
}

// =========================================
//  @Multiple Media Delete
// =========================================
export const tempMultiMediaDelete = (data) => {
    const request = axios.delete(`${MEDIA_SERVER}/temp_delete_media?ids=${data}`).then( response => {
        return response.data
    } )
    
    return {
        type: TEMP_MULTI_MEDIA_DELETE,
        payload: request
    }
}

// =========================================
//  @Multiple Media Delete
// =========================================
export const multiMediaDelete = (data) => {
    const request = axios.delete(`${MEDIA_SERVER}/delete_media?ids=${data}`).then( response => {
        return response.data
    } )
    
    return {
        type: MULTI_MEDIA_DELETE,
        payload: request
    }
}

// =========================================
//  @Search Media
// =========================================
export const searchMedia = (dataToSubmit) => {
    const request = axios.get(`${MEDIA_SERVER}/search?mediasearch=${dataToSubmit}`).then( response => {
        return response.data;
    } )

    return {
        type: SEARCH_MEDIA,
        payload: request
    }
}

// =========================================
//  @Get Single Media
// =========================================
export const getSingleMedia = (editId) =>  {
    const request = axios.get(`${MEDIA_SERVER}/edit?id=${editId}`).then( response => {
        return response.data
    } )
    return {
        type: SINGLE_MEDIA,
        payload: request
    }
}

// =========================================
//  @Update Single Media
// =========================================
export function updateMedia( dataToSubmit ){
    const request = axios.post(`${MEDIA_SERVER}/update`, dataToSubmit)
                    .then(response => response.data);
    return{
        type: UPDATE_MEDIA,
        payload: request
    }                    
}

// =========================================
//  @Restore Media
// =========================================
export const restoreMedia = ( restoreId ) => {
    const request = axios.get(`${MEDIA_SERVER}/restore?restoreId=${restoreId}`)
                    .then(response => response.data);
    return{
        type: RESTORE_MEDIA,
        payload: request
    }                    
}

// =========================================
//  @Restore Media
// =========================================
export const restoreMultiMediaItem = ( restoreId ) => {
    const request = axios.get(`${MEDIA_SERVER}/restore_multiItem?restoreIds=${restoreId}`)
                    .then(response => response.data);
    return{
        type: RESTORE_MULTI_MEDIA_ITEM,
        payload: request
    }                    
}
