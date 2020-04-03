import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Dropzone from 'react-dropzone';
import axios from 'axios';

// ===================================
//  Load Custom Style
// ===================================
import './scss/style.scss';

// ==========================================
//      Connect Redux
// ==========================================
import { useDispatch } from 'react-redux';
import { getMedia, loadMoreImage, deleteMedia } from './../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import SearchItem from './SearchItem';
import LoadImage from './LoadImage';
import FlashMessage from './../FlashMessage';



const Upload = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const [ type ] = useState('Media');
    const [displayModal, setDisplayModal] = useState(false);

    //*-------------------------------*/
    //---@Flash Message 
    //--------------------------------*/  
    const [ flashMessage, setFlashMessage ] = useState({});

    //*-------------------------------*/
    //   @Load Data
    //--------------------------------*/  
    const resetImageData = props.resetImageData;
    const profileimage = props.profileimage;
    
    useEffect(() => {
        if(profileimage){
            setImageInfo(profileimage)
        }
        if(resetImageData){
            setImageInfo(null)
        }

    }, [profileimage, resetImageData])

    /*--------------------------------------
    |--- @Display Tab Content Network
    --------------------------------------*/
    const [ actionTab, setActionTab ] = useState('media')
    const getActiveTab = (data) => {
        setActionTab(data);
    }

    //*-------------------------------*/
    //   @Load Media Library
    //--------------------------------*/ 
    const dispatch = useDispatch();
    const [currentPages] = useState(1);
    const [parPage] = useState(10);
    const [ ItemCount, setItemCount ] = useState();
    const [ mediaData, setMediaData ] = useState();

    const displayData = () => {
        setMediaData();
        setDisplayModal(true)
        dispatch(getMedia(currentPages, parPage)).then(response => {
            setItemCount(response.payload.getTotalItem)
            setItemCount(response.payload.countItems)
            setMediaData(response.payload.items);
        })
    }

    //*-------------------------------*/
    //   @Close Modal Function
    //--------------------------------*/ 
    const closeModal = () => {
        setDisplayModal(false)
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
                        setLoader(false);
                        setActionTab('media')

                        //*-------------------------------*/
                        //---@Flash Message State & Loading
                        //--------------------------------*/ 
                        setFlashMessage({
                            access: true,
                            type: 'success',
                            message: 'Upload successfully'
                        })

                        setMediaData();
                        dispatch(getMedia(currentPages, parPage)).then(response => {
                            setMediaData(response.payload.items);
                        })
                    }
                })
            }
        } else {
            setLoader(false);
        }
    }

    //*-------------------------------*/
    //   @Image Select For Display
    //--------------------------------*/ 
    const [ imageInfo, setImageInfo ] = useState();
    const [selectImageId, setSelectImageId] = useState();
    const selectImage = (data) => {
        setSelectImageId(data._id)
        setImageInfo(data)
    }

    //*-------------------------------*/
    //   @Get Image Dimensions
    //--------------------------------*/ 
    const [ imageDimensions, setImageDimensions ] = useState()
    const onImageLoad = ({target:img}) => {
        setImageDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight
        })
    }

    //*-------------------------------*/
    //   @Load More Image
    //--------------------------------*/ 
    const loadMore = () => {
        dispatch(loadMoreImage(parPage, mediaData.length, mediaData)).then(response => {
            setMediaData(response.payload)
        })
    }

    //*-------------------------------*/
    //   @Delete Item
    //--------------------------------*/  
    const deleteItem = (id) => {
        dispatch(deleteMedia(id)).then(response => {
            dispatch(getMedia(currentPages, parPage)).then(response => {
                setMediaData(response.payload.items);
                setImageInfo(null)
                setSelectImageId(null)
            })
        });
    }

    //*-------------------------------*/
    //---@User Search Network
    //--------------------------------*/   
    const searchNetwork = (data) => {
        if(data){
            setMediaData(data);
        }
    }

    //*-------------------------------*/
    //---@Select Image Id
    //--------------------------------*/   
    const submitImageData = (data) => {
        props.imageData(data)
        setDisplayModal(false)
        setSelectImageId(null)
        setImageInfo(data)
    }

    //*-------------------------------*/
    //---@Image LazyLoad
    //--------------------------------*/  
    // const [ lazyLoad, setLazyLoad ] = useState(false);
    // const imgloaded = () => {
    //     setLazyLoad(true)
    // }
    
    return (
        <React.Fragment>

            {/*--------------------------------------------
            |--- @Flash Message Display Area
            --------------------------------------------*/}
            <FlashMessage message={flashMessage} />

            {/*--------------------------------------------
            |--- @Upload Main Area
            --------------------------------------------*/}
            <div 
                className="profileImage shadow-sm overflow-hidden"
                onClick={() => displayData()}
                style={{
                    width: props.width,
                    height: props.height
                }}
            >
                {imageInfo ? 
                    <div 
                        className="displayImage"
                        style={{ backgroundImage:`url("${window.location.origin}/api/media/image?year=${imageInfo.year}&month=${imageInfo.month}&urlname=${imageInfo.urlname}")` }}
                    ></div>
                :null}
                <div className="image_upload d-flex justify-content-center align-items-center">Upload</div>
            </div>

            {displayModal ? 
                <React.Fragment>
                    <div 
                        className={displayModal ? "modal fade bd-example-modal-xl show d-block" : "modal fade bd-example-modal-xl"}
                        style={{ overflowY: 'scroll' }}
                    >
                        <div id="x-modal-dialog" className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">

                                <div className="modal-header border-0 pb-2">
                                    <h5 className="modal-title">Images</h5>
                                    <button type="button" className="close" onClick={ () => closeModal() }>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body p-0">

                                    <nav className="x_uploadModal">
                                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                            <button 
                                                className={ (actionTab === 'upload') ? "nav-item nav-link active" : "nav-item nav-link bg-transparent" } 
                                                onClick={ () => getActiveTab('upload') }>
                                                    Upload Files
                                            </button>
                                            <button 
                                                className={ (actionTab === 'media') ? "nav-item nav-link active" : "nav-item nav-link bg-transparent" } 
                                                onClick={ () => getActiveTab('media') }>
                                                    Media Library
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-content" id="nav-tabContent">

                                        {/*--------------------------------------------
                                            |--- @Media Upload Tab
                                        --------------------------------------------*/}
                                            <div className={ (actionTab === 'upload') ? "tab-pane fade show active" : "tab-pane fade" }>
                                                <div className="x_media_upload_modal_option">

                                                    {/*--------------------------------------------
                                                    |--- @Dropzone Section Area
                                                    --------------------------------------------*/}
                                                    <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)}>
                                                        {({ getRootProps, getInputProps }) => (
                                                            <section className="x_main_uploader_area">

                                                                {loader ?
                                                                    <div className="x_loader_block">
                                                                        <div className="x_loader" id="loader-1"></div>
                                                                    </div>
                                                                    : null}

                                                                <div {...getRootProps()}>
                                                                    
                                                                    <div className="jumbotron jumbotron-fluid text-center position-relative m-0" style={{ cursor: 'pointer' }}>

                                                                        {/*--------------------------------------------
                                                                        |--- @Loader
                                                                        --------------------------------------------*/}
                                                                        {loader ?
                                                                            <div className="uploadLoader">
                                                                                <div className="preloader"></div>
                                                                            </div>                                                          
                                                                        :null}

                                                                        <div className="container">
                                                                            <input {...getInputProps()} />
                                                                            
                                                                            <p className="lead m-0">Drop files here</p>
                                                                            <small>Or</small>

                                                                            <p className="lead mt-2 d-block">
                                                                                <button type="button" className="btn btn-outline-primary btn-sm">Select File</button>
                                                                            </p>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        )}
                                                    </Dropzone>

                                                </div>
                                            </div>

                                        {/*--------------------------------------------
                                            |--- @Media List Tab
                                        --------------------------------------------*/}
                                            <div className={ (actionTab === 'media') ? "tab-pane fade show active" : "tab-pane fade" }>

                                                <div className="container">
                                                    <div className="row">

                                                    {/*--------------------------------------------
                                                        |--- @Left Side
                                                    --------------------------------------------*/}
                                                        <div className="col-md-9 pt-3 pb-3">
                                                            <div className="row">

                                                                <div className="col-md-12 d-xl-flex justify-content-xl-end mb-3 d-none">
                                                                    {/*--------------------------------------------
                                                                    |--- @Search User Data
                                                                    --------------------------------------------*/}
                                                                    <SearchItem 
                                                                        type={type} 
                                                                        searchNetwork={ (data) => searchNetwork(data) }
                                                                    />
                                                                </div>
                                                                
                                                                {mediaData ? 
                                                                    mediaData.map( (item, index) => (
                                                                        <div key={index} className="col-md-6 col-lg-3 mt-2 mb-2">
                                                                            <div 
                                                                                onClick={ () => selectImage(item) } 
                                                                                className={ (selectImageId === item._id) ? 'cursor_pointer activeImage' : 'cursor_pointer' }
                                                                            >

                                                                                {/*--------------------------------------------
                                                                                |--- @Item Loader
                                                                                --------------------------------------------*/}
                                                                                <LoadImage
                                                                                    origin={window.location.origin}
                                                                                    imageInfo={item}
                                                                                />

                                                                            </div>
                                                                        </div>
                                                                    ) )
                                                                :null}
                                                                
                                                                {(ItemCount >= parPage) ?
                                                                    <div className="col-md-12">
                                                                        <div className="text-right">
                                                                            <button 
                                                                                type="button" 
                                                                                className="btn btn-link text-secondary"
                                                                                onClick={ () =>  loadMore() }
                                                                            >Load more...</button>
                                                                        </div>
                                                                    </div>
                                                                :null}


                                                            </div>

                                                        </div>

                                                    {/*--------------------------------------------
                                                        |--- @Right Side
                                                    --------------------------------------------*/}
                                                        <div className="col-md-3 border-left pt-3 pb-3 text-left">
                                                            
                                                            {imageInfo ? 
                                                                <div className="x_image_info_header">

                                                                    <img 
                                                                        onLoad={ onImageLoad }
                                                                        src={`${window.location.origin}/api/media/image?year=${imageInfo.year}&month=${imageInfo.month}&urlname=${imageInfo.urlname}`} 
                                                                        className="mr-3 img-fluid" 
                                                                        alt={imageInfo.urlname}
                                                                    />
                                                                    <div className="card-body p-0">
                                                                        <h5 className="card-title mt-3">{ imageInfo.displayname }</h5>

                                                                        <p className="m-0 text-muted">
                                                                            <Moment format="DD-MMM-YYYY">
                                                                                {imageInfo.createdAt}
                                                                            </Moment>
                                                                        </p>
                                                                        <p className="m-0 text-muted" style={{ overflow: 'hidden' }}> {imageInfo.type} </p>
                                                                        <p className="m-0 text-muted" style={{ overflow: 'hidden' }}> {imageInfo.size} bytes </p>

                                                                        {imageDimensions ?
                                                                            <p className="m-0 text-muted overflow-hidden">{imageDimensions.width} × {imageDimensions.height} pixels</p>
                                                                        :null}

                                                                        {/*-------------------------------
                                                                            |--- @Action Media 
                                                                        -------------------------------*/}
                                                                        <div className="mt-1 mb-1 d-flex align-items-center">

                                                                            {/*-------------------------------
                                                                                |--- @Edit Media
                                                                            -------------------------------*/}
                                                                            <Link to={`/media/edit/${imageInfo._id}`}>Edit</Link>

                                                                            {/*-------------------------------
                                                                                |--- @Delete Media
                                                                            -------------------------------*/}
                                                                            <button type="button" 
                                                                                className="btn btn-link p-0 pl-2 ml-2 text-danger border-left" 
                                                                                onClick={() => deleteItem(imageInfo._id)}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                        
                                                                        <hr/>

                                                                        <div className="d-flex flex-column mb-3">
                                                                            <strong className="mb-1">Alt:</strong>
                                                                            <p className="card-text m-0 text-muted">
                                                                                { imageInfo.alt }
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex flex-column mb-3">
                                                                            <strong className="mb-1">Caption:</strong>
                                                                            <p className="card-text m-0 text-muted">
                                                                                { imageInfo.caption }
                                                                            </p>
                                                                        </div>
                                                                        <div className="d-flex flex-column mb-3">
                                                                            <strong className="mb-1">Description:</strong>
                                                                            <p className="card-text m-0 text-muted">
                                                                                { imageInfo.description }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            :null}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button 
                                            type="button" 
                                            className="btn btn-primary"
                                            onClick={ () => submitImageData(imageInfo) }
                                        >Save changes</button>
                                    </div>
                            </div>
                        </div>
                    </div>            
                    <div className="modal-backdrop fade d-block" style={{ background: 'rgba(0, 0, 0, .7)', opacity: '1' }}></div>
                </React.Fragment>
            :null}

        </React.Fragment>
    );
};

export default Upload;