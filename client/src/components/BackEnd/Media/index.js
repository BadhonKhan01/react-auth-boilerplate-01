import React,{ useState, useEffect } from 'react';

// ==========================================
//      Get Data With Redux
// ==========================================
import { useDispatch, useSelector } from 'react-redux';
import { getMedia } from './../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import Table from './container/table';



const Media = (props) => {

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
        dispatch(getMedia(currentPages, parPage));
    }, [dispatch, currentPages, parPage]);

    /*--------------------------------------
    |--- @Reset Item
    --------------------------------------*/
    const resetItems = (data) => {
        if(data){
            dispatch(getMedia(currentPages, parPage));
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
            |--- @Media Table Area
            --------------------------------------------*/}
            <Table
                type="Media"
                data={getMediaData.getAllMedia}
                currentPages={currentPages}
                resetItems={ (element) => resetItems(element) }
                paginatePage={(number) => paginatePage(number)}
            />

        </Layout>
    );
};

export default Media;