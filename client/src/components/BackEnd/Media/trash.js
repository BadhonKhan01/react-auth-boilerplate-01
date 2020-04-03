import React,{ useState, useEffect } from 'react';

// ==========================================
//      Get Data With Redux
// ==========================================
import { useDispatch, useSelector } from 'react-redux';
import { getMediaTrash } from './../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import TrashTable from './container/trashtable';



const MediaTrash = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const getMediaData = useSelector( state => state.media );
    const dispatch = useDispatch();
    const [currentPages, setCurrentPages] = useState(1);
    const [parPage] = useState(10);

    /*--------------------------------------
    |--- @Load Data
    --------------------------------------*/
    useEffect(() => {
        dispatch(getMediaTrash(currentPages, parPage));
    }, [dispatch, currentPages, parPage]);

    /*--------------------------------------
    |--- @Reset Item
    --------------------------------------*/
    const resetItems = (data) => {
        if(data){
            dispatch(getMediaTrash(currentPages, parPage));
        }
    }

    //*-------------------------------*/
    //---@Pagination Parpage State
    //--------------------------------*/  
    const paginatePage = (number) => {
        setCurrentPages(number);
    }

    return (
        <Layout {...props}>
            
            {/*--------------------------------------------
            |--- @Media Trash Table Area
            --------------------------------------------*/}
            <TrashTable
                type="Media"
                data={getMediaData.getAllMediaTrash}
                currentPages={currentPages}
                resetItems={ (element) => resetItems(element) }
                paginatePage={(number) => paginatePage(number)}
            />

        </Layout>
    );
};

export default MediaTrash;