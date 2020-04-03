import React,{ useState, useEffect } from 'react';


// ==========================================
//      Get Data With Redux
// ==========================================
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserTrash } from './../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import TrashTable from './container/trashtable';



const UserTrash = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const allUsers = useSelector( state => state.user );
    const dispatch = useDispatch();
    const [currentPages, setCurrentPages] = useState(1);
    const [parPage] = useState(10);

    /*--------------------------------------
    |--- @Load Data
    --------------------------------------*/
    useEffect(() => {
        dispatch(getAllUserTrash(currentPages, parPage));
    }, [dispatch, currentPages, parPage]);

    /*--------------------------------------
    |--- @Reset Item
    --------------------------------------*/
    const resetItems = (data) => {
        if(data){
            dispatch(getAllUserTrash(currentPages, parPage));
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
            |--- @Users Table Area
            --------------------------------------------*/}
            <TrashTable
                type="User"
                data={allUsers.getAllUserTrash}
                resetItems={ (element) => resetItems(element) }
                isLoginUser={ props.user.userData.id }
                currentPages={currentPages}
                paginatePage={(number) => paginatePage(number)}
            />

        </Layout>
    );
};

export default UserTrash;