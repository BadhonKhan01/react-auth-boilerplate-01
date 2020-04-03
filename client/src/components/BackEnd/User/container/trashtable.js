import React,{ useState, useEffect } from 'react';
import Moment from 'react-moment';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { 
    deleteUsers, 
    multiUserDelete,
    restoreUser,
    restoreMultiUserItem
} from './../../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import CheckRole from './CheckRole';
import CheckStatus from './CheckStatus';
import SearchItem from './SearchItem';
import TrashMultiAction from './trashMultiAction';
import Pagination from './pagination';
import FlashMessage from './../../../utils/FlashMessage';


const Table = (props) => {

    /*--------------------------------------
    |--- @Global State & variables
    --------------------------------------*/
    const [ type ] = useState(props.type);
    let getItems = props.data;
    const isLoginUser = props.isLoginUser;
    const dispatch = useDispatch();

    //*-------------------------------*/
    //---@Flash Message 
    //--------------------------------*/  
    const [ flashMessage, setFlashMessage ] = useState({});
    
    //*-------------------------------*/
    //   @Stap 1: Select Items
    //--------------------------------*/  
    const [ items, setItems ] = useState([]);
    useEffect( () => {
        let newUserData = [];
        if(getItems){
            getItems.items.map( (item) => {
                if(item._id !== isLoginUser && item.role !== 'superadmin' ){
                    return newUserData.push({
                        id: item._id,
                        select: false,
                        username: item.username,
                        age: item.age,
                        gender: item.gender,
                        phone: item.phone,
                        address: item.address,
                        profileimage: item.profileimage ? item.profileimage : null,
                        email: item.email,
                        role: item.role,
                        post: item.post,
                        status: item.status,
                        createdAt: item.createdAt
                    })
                }else{
                    return '';
                }
            } )
            setItems(newUserData);
        }
    }, [getItems, isLoginUser] )
    
    
    //*-------------------------------*/
    //   @Delete Item
    //--------------------------------*/  
    const deleteItem = (id) => {

        dispatch(deleteUsers(id)).then(response => {
            //*-------------------------------*/
            //   @FlashMessage 
            //*-------------------------------*/
            setFlashMessage({
                access: true,
                type: 'danger',
                message: 'Delete successfully'
            });
            //*----------------------------------------*/
            //   @Reset Item Data
            //*----------------------------------------*/
            props.resetItems(true);

            //*----------------------------------------*/
            //   @Permanent Delete Remove
            //*----------------------------------------*/
            // setPermanentDelete(false);
        });
    }

    /*-------------------------------------------------
    |--- @Multiple Item Delete State Control
    -------------------------------------------------*/
    const [ selectedItem, setSelectedItem ] = useState([]);
    const getSelectedId = (id) => {
        if (id !== false) {
            if (selectedItem.indexOf(id) > -1) {
                let newData = [];
                selectedItem.map(item => id !== item ? newData.push(item) : null)
                setSelectedItem(newData)
            } else {
                setSelectedItem(selectedItem => [...selectedItem, id])
            }
        } else {
            setSelectedItem([])
        }
    }
    

    //*-------------------------------*/
    //   @Select All Items
    //--------------------------------*/  
    const selectAllItem = (data) => {
        let input = document.getElementsByTagName('input');
        if (data) {
            for (let i = 0; i < input.length; i++) {
                input[i].checked = true;
            }

            //*-------------------------------*/
            //   @Transfer Selected Item
            //*-------------------------------*/
            items.map(item => getSelectedId(item.id))

        } else {
            for (let i = 0; i < input.length; i++) {
                input[i].checked = false;
            }
            getSelectedId(false);
        }
    }

    /*-------------------------------------------------
    |--- @Multiple Item Delete 
    -------------------------------------------------*/
    const multi_itemsDelete = (data, status) => {
        if(data && selectedItem.length > 0){
            dispatch(multiUserDelete(selectedItem)).then(response => {
                //*-------------------------------*/
                //   @FlashMessage 
                //*-------------------------------*/
                setFlashMessage({
                    access: true,
                    type: 'success',
                    message: `Delete ${type} Items successfully.`
                });

                //*----------------------------------------*/
                //   @Empty Selected Id
                //*----------------------------------------*/
                setSelectedItem([])

                //*----------------------------------------*/
                //   @Empty Items State For Reload Data
                //*----------------------------------------*/
                setItems([]);
                
                //*----------------------------------------*/
                //   @Global Checkbox Remove Selection
                //*----------------------------------------*/
                const boxes = document.getElementsByClassName('multiCheckBox');
                boxes[0].checked = false;

                //*----------------------------------------*/
                //   @Reset Item Data
                //*----------------------------------------*/
                props.resetItems(true);
            })
        }else{
            //*-------------------------------*/
            //   @FlashMessage 
            //*-------------------------------*/
            setFlashMessage({
                access: true,
                type: 'danger',
                message: `Sorry! ${type} Items not found.`
            });
        }
    }

    //*-------------------------------*/
    //---@Media Search Network
    //--------------------------------*/   
    const searchNetwork = (data) => {
        if(data){
            setItems(data);
        }
    }

    //*-------------------------------*/
    //---@Load All Items
    //--------------------------------*/   
    const loadAllItem = () => {
        let newUserData = [];
        if(getItems){
            getItems.items.map( (item, index) => {
                if(item._id !== isLoginUser && item.role !== 'superadmin' ){
                    return newUserData.push({
                        id: item._id,
                        select: false,
                        username: item.username,
                        age: item.age,
                        gender: item.gender,
                        phone: item.phone,
                        address: item.address,
                        profileimage: item.profileimage ? item.profileimage : null,
                        email: item.email,
                        role: item.role,
                        post: item.post,
                        status: item.status,
                        createdAt: item.createdAt
                    })
                }else{
                    return '';
                }
            } )

            //*----------------------------------------*/
            //   @Load Item
            //*----------------------------------------*/
            setItems(newUserData);
        }
    }

    //*----------------------------------------*/
    //   @Reset Item Data
    //*----------------------------------------*/
    const resetItems = (data) => {
        props.resetItems(data);
    }

    //*-------------------------------*/
    //   @Get Paginate Items
    //--------------------------------*/  
    const getItem = (data) => {
        setItems([])
        props.paginatePage(data);
    }

    //*-------------------------------*/
    //   @Restore Delete Item
    //--------------------------------*/  
    const getRestoreUser = (restoreId) => {
        dispatch(restoreUser(restoreId)).then(response => {
            //*-------------------------------*/
            //   @FlashMessage 
            //*-------------------------------*/
            setFlashMessage({
                access: true,
                type: 'success',
                message: `Restore Items successfully.`
            });

            //*----------------------------------------*/
            //   @Reset Item Data
            //*----------------------------------------*/
            props.resetItems(true);
        })
    }

    //*-------------------------------*/
    //   @Restore Delete Multi Item
    //--------------------------------*/  
    const multi_itemsRestore = (data) => {
        if(data && selectedItem.length > 0){
            dispatch(restoreMultiUserItem(selectedItem)).then(response => {
                //*-------------------------------*/
                //   @FlashMessage 
                //*-------------------------------*/
                setFlashMessage({
                    access: true,
                    type: 'success',
                    message: `Delete ${type} Items successfully.`
                });

                //*----------------------------------------*/
                //   @Empty Selected Id
                //*----------------------------------------*/
                setSelectedItem([])

                //*----------------------------------------*/
                //   @Empty Items State For Reload Data
                //*----------------------------------------*/
                setItems([]);
                
                //*----------------------------------------*/
                //   @Global Checkbox Remove Selection
                //*----------------------------------------*/
                const boxes = document.getElementsByClassName('multiCheckBox');
                boxes[0].checked = false;

                //*----------------------------------------*/
                //   @Reset Item Data
                //*----------------------------------------*/
                props.resetItems(true);

                //*----------------------------------------*/
                //   @Permanent Delete Remove
                //*----------------------------------------*/
                // setPermanentDelete(false);

                //*----------------------------------------*/
                //   @Permanent Delete Remove Multi Item
                //*----------------------------------------*/
                // setPermanentDeleteMultiItem(false)
            })
        }else{
            //*-------------------------------*/
            //   @FlashMessage 
            //*-------------------------------*/
            setFlashMessage({
                access: true,
                type: 'danger',
                message: `Sorry! ${type} Items not found.`
            });
        }
    }

    return (
        <React.Fragment>
            {/*--------------------------------------------
            |--- @Table Top Content
            --------------------------------------------*/}
            <div className="tableTop container-fluid pb-3 pl-0 pr-0">
                <div className="row align-items-center">
                    <div className="col-md-12 pb-4 d-flex align-items-center">
                        <h4 className="m-0 mr-3">{type} Trash</h4>
                    </div>

                    <div className="col-md-6 d-none d-xl-block">
                        <div className="d-flex align-self-center">

                            {/*--------------------------------------------
                            |--- @Multi Actions
                            --------------------------------------------*/}
                            <TrashMultiAction 
                                type={ type }
                                getItems={ getItems }
                                selectedItem={ selectedItem }
                                loadAllItem={ (data) => loadAllItem(data) }
                                multi_itemsDelete={ (data) => multi_itemsDelete(data) }
                                resetData={ (data) => resetItems(data) }
                                multi_itemsRestore={ (data) => multi_itemsRestore(data) }
                            />

                        </div>
                        
                    </div>

                    <div className="col-lg-12 col-xl-6 d-none d-md-block">
                        <div className="d-flex justify-content-end">
                            {/*--------------------------------------------
                            |--- @Search Media Data
                            --------------------------------------------*/}
                            <SearchItem 
                                type={type} 
                                searchNetwork={ (data) => searchNetwork(data) }
                            />

                        </div>

                    </div>
                </div>
            </div>

            {/*--------------------------------------------
            |--- @Table Content
            --------------------------------------------*/}
            <div className="table-responsive">

                {/*--------------------------------------------
                |--- @Flash Message Display Area
                --------------------------------------------*/}
                <React.Fragment>
                    <FlashMessage message={flashMessage} />
                </React.Fragment>

                <table className="table">
                    <thead>
                        <tr>
                            <th className="d-none d-xl-block">
                                <input type="checkbox" className="multiCheckBox" onChange={(e) => {
                                    let checked = e.target.checked;
                                    selectAllItem(checked);
                                }} />
                            </th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Post</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* -----------------------------
                        ||---@Items Not Found
                        ----------------------------- */}
                        {items.length === 0 ?
                            <tr>
                                <td style={{ textAlign: "center" }} colSpan="7">Sorry No Data Found</td>
                            </tr>
                        : null}

                        {/* -----------------------------
                        ||---@Display All Items
                        ----------------------------- */}
                        {items.map((item, index) => (
                            <tr key={index}>
                                <th className="d-none d-xl-block">
                                    <input type="checkbox" className="singleCheckBox" onChange={(e) => {
                                        let checked = e.target.checked;
                                        setItems( items.map(itemsData => {
                                            if (item.id === itemsData.id) {
                                                itemsData.select = checked;
                                                getSelectedId(itemsData.id);
                                            }
                                            return itemsData;
                                        }))

                                    }} />
                                </th>
                                <td>
                                    {item.profileimage ?
                                        <img
                                            src={`${window.location.origin}/api/media/image?year=${item.profileimage.year}&month=${item.profileimage.month}&urlname=${item.profileimage.urlname}`}
                                            alt="..."
                                            className="img-thumbnail"
                                            style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '100%' }}
                                        />
                                    :null}
                                    {item.username}
                                </td>
                                <td>
                                    {item.email}
                                </td>
                                <td>
                                    {/* ----------------------------------
                                    ||---@User Role Checking Components
                                    ---------------------------------- */}
                                    <CheckRole role={item.role} />
                                </td>
                                <td>
                                    {/* -----------------------------------
                                    ||---@User Posts
                                    ----------------------------------- */}
                                    {item.post}
                                </td>
                                <td>
                                    {/* -----------------------------------
                                    ||---@User Status Checking Components
                                    ----------------------------------- */}
                                    <CheckStatus status={item.status} />
                                </td>
                                <td>
                                    <div className="dateAndTime">
                                        <Moment format="DD-MMM-YYYY">
                                            {item.createdAt}
                                        </Moment>
                                    </div>
                                </td>
                                <td>
                                    <div className="table-action">
                                        <React.Fragment>
                                            {/* -----------------------------------
                                            ||---@Item Restore 
                                            ----------------------------------- */}
                                            <button 
                                                type="button" 
                                                className="btn btn-link text-success p-0 pr-3 mr-3 border-right" 
                                                onClick={() => getRestoreUser(item.id)}
                                            >
                                                Restore
                                            </button>
                                        </React.Fragment>

                                        {/* -----------------------------------
                                        ||---@Item Delete
                                        ----------------------------------- */}
                                        <button 
                                            type="button" 
                                            className="btn btn-link text-danger p-0" 
                                            onClick={() => deleteItem(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
                
            </div>

            {/* -----------------------------
            ||---@Pagination Section
            ----------------------------- */}
            <div className="pagination"> 
                <Pagination getItems={getItems} getItem={(element) => getItem(element)} currentPages={props.currentPages} />
            </div>


        </React.Fragment>
    );
};

export default Table;