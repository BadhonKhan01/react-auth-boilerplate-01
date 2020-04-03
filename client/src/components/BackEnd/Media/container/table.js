import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Dropzone from 'react-dropzone';
import axios from 'axios';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { 
    getMedia, 
    deleteMedia, 
    multiMediaDelete, 
    tempDeleteMedia,
    tempMultiMediaDelete
} from './../../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import SearchItem from './SearchItem';
import MultiAction from './MultiAction';
import ModalView from './ModalView';
import Pagination from './pagination';
import FlashMessage from './../../../utils/FlashMessage';


const Table = (props) => {

    /*--------------------------------------
    |--- @Global State & variables
    --------------------------------------*/
    const [ type ] = useState(props.type);
    let getItems = props.data;
    const dispatch = useDispatch();
    const [currentPages] = useState(1);
    const [parPage] = useState(10);
    const [loading, setLoading] = useState(true);

    //*-------------------------------*/
    //---@Flash Message 
    //--------------------------------*/  
    const [ flashMessage, setFlashMessage ] = useState({});
    
    //*-------------------------------*/
    //   @Stap 1: Select Items
    //--------------------------------*/  
    const [ items, setItems ] = useState([]);
    useEffect( () => {
        let newMediaData = [];
        if(getItems){
            getItems.items.map( (item) => {
                return newMediaData.push({
                    id: item._id,
                    select: false,
                    urlname: item.urlname,
                    displayname: item.displayname,
                    alt: item.alt,
                    caption: item.caption,
                    description: item.description,
                    type: item.type,
                    size: item.size,
                    year: item.year,
                    month: item.month,
                    createdAt: item.createdAt
                })
            } )
            setItems(newMediaData);
        }
        setLoading(false);
    }, [getItems] )
    
    //*-------------------------------*/
    //   @Delete Item
    //--------------------------------*/  
    const deleteItem = (id, type) => {

        if(type){
            dispatch(deleteMedia(id)).then(response => {
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
            });
        }else{
            dispatch(tempDeleteMedia(id)).then(response => {
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
            });
        }
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

            if(status){
                dispatch(multiMediaDelete(selectedItem)).then(response => {
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
                dispatch(tempMultiMediaDelete(selectedItem)).then(response => {
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
            }

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
        if(getItems){
            //*----------------------------------------*/
            //   @Reset Item Data
            //*----------------------------------------*/
            props.resetItems(true);
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
    //---@Dropzone Image Droper
    //--------------------------------*/  
    const [loader, setLoader] = useState(false);
    const onDrop = (files) => {
        setLoader(true);
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('file', files[0]);
        let getExt = files[0].name.split('.').pop();

        if (files[0].size < 4194304) {
            if (getExt === 'png' || getExt === 'jpg' || getExt === 'jpeg') {
                axios.post('/api/upload/image', formData, config).then(response => {
                    if (response.data.success) {
                        setItems([]);
                        dispatch(getMedia(currentPages, parPage)).then(response => {
                            setItems(response.payload.items);
                            setLoader(false)
                        })
                    }
                })
            }
        } else {
            setLoader(false);
        }
    }

    //*-------------------------------*/
    //---@Image LazyLoad
    //--------------------------------*/  
    const [ lazyLoad, setLazyLoad ] = useState(false);
    const imgloaded = () => {
        setLazyLoad(true)
    }

    return (
        <React.Fragment>
            {/*--------------------------------------------
            |--- @Table Top Content
            --------------------------------------------*/}
            <div className="tableTop container-fluid pb-3 pl-0 pr-0">
                <div className="row align-items-center">
                    <div className="col-md-12 pb-4 d-flex align-items-center">
                        <h4 className="m-0 mr-3">{type}</h4>

                        {/*--------------------------------------------
                        |--- @Dropzone Section Area
                        --------------------------------------------*/}
                        <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="x_main_uploader_area">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p className="lead m-0">
                                            <button type="button" className="btn btn-secondary btn-sm">Upload</button>
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>

                    </div>

                    <div className="col-md-6 d-none d-xl-block">
                        <div className="d-flex align-self-center">

                            {/*--------------------------------------------
                            |--- @Multi Actions
                            --------------------------------------------*/}
                            <MultiAction 
                                type={ type }
                                getItems={ getItems }
                                selectedItem={ selectedItem }
                                loadAllItem={ (data) => loadAllItem(data) }
                                multi_itemsDelete={ (data) => multi_itemsDelete(data) }
                                resetData={ (data) => resetItems(data) }
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
                <div className="item_table_area">
                    
                    {/* -----------------------------
                    ||---@Use PreLoader
                    ------------------------------*/ }
                    {loading ?
                        <React.Fragment>
                            <div className="preloader_waper d-flex align-items-center justify-content-center">
                                <div className="preloader"></div>
                            </div>
                        </React.Fragment>
                    :null}

                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th className="d-none d-xl-block">
                                    <input type="checkbox" className="multiCheckBox" onChange={(e) => {
                                        let checked = e.target.checked;
                                        selectAllItem(checked);
                                    }} />
                                </th>
                                <th></th>
                                <th>Name</th>
                                <th>Type</th>
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

                            {/*--------------------------------------------
                            |--- @Loader
                            --------------------------------------------*/}
                            {loader ?
                                <tr>
                                    <td colSpan="7">
                                        <div className="uploadLoader">
                                            <div className="preloader"></div>
                                        </div>
                                    </td>
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
                                        {item ?
                                            <div className="d-inline-block position-relative media-list-image">
                                                <img
                                                    src={`${window.location.origin}/api/media/image?year=${item.year}&month=${item.month}&urlname=${item.urlname}`}
                                                    alt={item.alt}
                                                    className="img-thumbnail"
                                                    style={{ width: '80px'}}
                                                    onLoad={ imgloaded }
                                                />
                                                {/*--------------------------------------------
                                                |--- @Loader
                                                --------------------------------------------*/}
                                                {!lazyLoad ?
                                                    <div className="uploadLoader">
                                                        <div className="preloader"></div>
                                                    </div>
                                                :null}
                                            </div>
                                        :null}
                                    </td>
                                    <td>
                                        <div className="media-list-name">
                                            <p>{item.displayname}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media-list-type">
                                            <p>{item.type}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media-list-date">
                                            <Moment format="DD-MMM-YYYY">
                                                {item.createdAt}
                                            </Moment>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="media-list-action">
                                            {/* -----------------------------------
                                            ||---@View Data in Modal
                                            ----------------------------------- */}
                                                <ModalView buttonText="View" data={item}/>

                                            {/* -----------------------------------
                                            ||---@Item Edit Link
                                            ----------------------------------- */}
                                                <Link
                                                    to={`/media/edit/${item.id}`}
                                                    className="btn btn-link text-link p-0 pr-3 mr-3 border-right"
                                                >
                                                    Edit
                                                </Link>  

                                            {/* -----------------------------------
                                            ||---@Temp Delete
                                            ----------------------------------- */}
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link text-danger p-0" 
                                                    onClick={() => deleteItem(item.id)}
                                                >Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                
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