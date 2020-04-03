import React,{ useState, useEffect } from 'react';


// ==========================================
//      Get Data With Redux
// ==========================================
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from './../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import Table from './container/table';



const User = (props) => {

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
        dispatch(getAllUsers(currentPages, parPage));
    }, [dispatch, currentPages, parPage]);

    /*--------------------------------------
    |--- @Reset Item
    --------------------------------------*/
    const resetItems = (data) => {
        if(data){
            dispatch(getAllUsers(currentPages, parPage));
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
            <Table
                type="User"
                data={allUsers.getAllUsers}
                resetItems={ (element) => resetItems(element) }
                isLoginUser={ props.user.userData.id }
                currentPages={currentPages}
                paginatePage={(number) => paginatePage(number)}
            />

        </Layout>
    );
};

export default User;